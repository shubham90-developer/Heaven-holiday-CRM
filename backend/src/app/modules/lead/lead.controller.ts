import { NextFunction, Request, Response } from 'express';
import Lead from './lead.model';
import {
  createLeadSchema,
  updateLeadSchema,
  bulkAssignSchema,
  bulkArchiveSchema,
} from './lead.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/leads
export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);
    const lead = new Lead(validatedData);
    await lead.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/leads
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
      page = 1,
      limit = 20,
    } = req.query;

    const filter: any = { archived: false };
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (temperature) filter.temperature = temperature;
    if (owner) filter.owner = owner;

    const skip = (Number(page) - 1) * Number(limit);

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('owner', 'firstName lastName')
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
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/leads/counts
export const getLeadCounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [inProcess, callback, unassigned, archived] = await Promise.all([
      Lead.countDocuments({ status: 'inProcess', archived: false }),
      Lead.countDocuments({ status: 'callback', archived: false }),
      Lead.countDocuments({ status: 'unassigned', archived: false }),
      Lead.countDocuments({ archived: true }),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead counts retrieved',
      data: { inProcess, callback, unassigned, archived },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/leads/:id
export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      'owner',
      'firstName lastName',
    );

    if (!lead) {
      next(new appError('Lead not found', 404));
      return;
    }

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

// PATCH /v1/api/leads/:id
export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      next(new appError('Lead not found', 404));
      return;
    }

    const validatedData = updateLeadSchema.parse(req.body);
    const updated = await Lead.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
    }).populate('owner', 'firstName lastName');

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

// PATCH /v1/api/leads/bulk-assign
export const bulkAssignLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { leadIds, owner } = bulkAssignSchema.parse(req.body);

    await Lead.updateMany(
      { _id: { $in: leadIds } },
      { owner, status: 'inProcess' },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `${leadIds.length} leads assigned successfully`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/leads/bulk-archive
export const bulkArchiveLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { leadIds } = bulkArchiveSchema.parse(req.body);

    await Lead.updateMany(
      { _id: { $in: leadIds } },
      { archived: true, status: 'archived' },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `${leadIds.length} leads archived successfully`,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
