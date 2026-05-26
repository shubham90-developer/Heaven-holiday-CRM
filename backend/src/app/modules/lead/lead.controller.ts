import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Lead } from './lead.model';
import {
  createLeadSchema,
  updateLeadSchema,
  bulkAssignSchema,
  bulkArchiveSchema,
} from './lead.validation';
import { appError } from '../../errors/appError';

const OWNER_POPULATE = { path: 'owner', select: 'firstName lastName' };
const LEAD_SOURCE_POPULATE = { path: 'leadSource', select: 'name' };

const buildCustomerName = (
  salutation?: string,
  firstName?: string,
  lastName?: string,
): string => [salutation, firstName, lastName].filter(Boolean).join(' ');

const isValidObjectId = (id: string) => mongoose.isValidObjectId(id);

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    // Auto-derive customerName from parts if not explicitly provided
    if (!validatedData.customerName) {
      (validatedData as any).customerName = buildCustomerName(
        validatedData.salutation,
        validatedData.firstName,
        (validatedData as any).lastName,
      );
    }

    const lead = new Lead(validatedData);
    await lead.save();

    const populated = await lead.populate([
      OWNER_POPULATE,
      LEAD_SOURCE_POPULATE,
    ]);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Lead created successfully',
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /v1/api/leads ─────────────────────────────────────────────────────────

export const getAllLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      status,
      type,
      temperature,
      owner,
      leadSource,
      agentType,
      search,
      page = '1',
      limit = '20',
    } = req.query;

    const filter: Record<string, any> = {
      archived: req.query.archived === 'true',
    };

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (temperature) filter.temperature = temperature;

    // ObjectId filters — validate before querying
    if (owner) {
      if (!isValidObjectId(owner as string))
        return next(new appError('Invalid owner id', 400));
      filter.owner = new mongoose.Types.ObjectId(owner as string);
    }
    if (leadSource) {
      if (!isValidObjectId(leadSource as string))
        return next(new appError('Invalid leadSource id', 400));
      filter.leadSource = new mongoose.Types.ObjectId(leadSource as string);
    }

    // B2B-only filter
    if (agentType) filter.agentType = agentType;

    // Free-text search across name / company / phone
    if (search) {
      const regex = new RegExp(search as string, 'i');
      filter.$or = [
        { customerName: regex },
        { companyName: regex },
        { phone: regex },
        { email: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate(OWNER_POPULATE)
        .populate(LEAD_SOURCE_POPULATE)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Lead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Leads retrieved successfully',
      data: leads,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /v1/api/leads/counts ──────────────────────────────────────────────────

export const getLeadCounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [inProcess, callback, unassigned, archived, b2c, b2b] =
      await Promise.all([
        Lead.countDocuments({ status: 'inProcess', archived: false }),
        Lead.countDocuments({ status: 'callback', archived: false }),
        Lead.countDocuments({ status: 'unassigned', archived: false }),
        Lead.countDocuments({ archived: true }),
        Lead.countDocuments({ type: 'B2C', archived: false }),
        Lead.countDocuments({ type: 'B2B', archived: false }),
      ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead counts retrieved',
      data: { inProcess, callback, unassigned, archived, b2c, b2b },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /v1/api/leads/:id ─────────────────────────────────────────────────────

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!isValidObjectId(req.params.id))
      return next(new appError('Invalid lead id', 400));

    const lead = await Lead.findById(req.params.id)
      .populate(OWNER_POPULATE)
      .populate(LEAD_SOURCE_POPULATE);

    if (!lead) return next(new appError('Lead not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead retrieved successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// ── PATCH /v1/api/leads/:id ───────────────────────────────────────────────────

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!isValidObjectId(req.params.id))
      return next(new appError('Invalid lead id', 400));

    const lead = await Lead.findById(req.params.id);
    if (!lead) return next(new appError('Lead not found', 404));

    const validatedData = updateLeadSchema.parse(req.body);

    // Re-derive customerName if any name part is being updated
    const { salutation, firstName, lastName } = validatedData as any;
    if (salutation || firstName || lastName) {
      (validatedData as any).customerName = buildCustomerName(
        salutation ?? lead.salutation,
        firstName ?? lead.firstName,
        lastName ?? lead.lastName,
      );
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData }, // $set prevents wiping untouched fields
      { new: true, runValidators: true },
    )
      .populate(OWNER_POPULATE)
      .populate(LEAD_SOURCE_POPULATE);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ── PATCH /v1/api/leads/bulk-assign ──────────────────────────────────────────

export const bulkAssignLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { leadIds, owner } = bulkAssignSchema.parse(req.body);

    const result = await Lead.updateMany(
      { _id: { $in: leadIds }, archived: false }, // never reassign archived leads
      { $set: { owner, status: 'inProcess' } },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.modifiedCount} leads assigned successfully`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    next(error);
  }
};

// ── PATCH /v1/api/leads/bulk-archive ─────────────────────────────────────────

export const bulkArchiveLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { leadIds } = bulkArchiveSchema.parse(req.body);

    const result = await Lead.updateMany(
      { _id: { $in: leadIds }, archived: false }, // idempotent — skip already archived
      { $set: { archived: true, status: 'archived' } },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.modifiedCount} leads archived successfully`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    next(error);
  }
};
