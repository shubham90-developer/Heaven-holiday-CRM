import { NextFunction, Request, Response } from 'express';
import LeadSource from './lead.model';
import {
  createLeadSourceSchema,
  updateLeadSourceSchema,
  leadSourceQuerySchema,
} from './lead.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/lead-sources
export const createLeadSource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createLeadSourceSchema.parse(req.body);

    const leadSource = new LeadSource(validatedData);
    await leadSource.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Lead source created successfully',
      data: leadSource,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/lead-sources
export const getAllLeadSources = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, page, limit } = leadSourceQuerySchema.parse(req.query);

    const filter: any = {};
    if (status !== undefined) filter.status = status;

    const skip = (page - 1) * limit;

    const [leadSources, total] = await Promise.all([
      LeadSource.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      LeadSource.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead sources retrieved successfully',
      data: leadSources,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/lead-sources/:id
export const getLeadSourceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leadSource = await LeadSource.findById(req.params.id);
    if (!leadSource) return next(new appError('Lead source not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead source retrieved successfully',
      data: leadSource,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/lead-sources/:id
export const updateLeadSource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leadSource = await LeadSource.findById(req.params.id);
    if (!leadSource) return next(new appError('Lead source not found', 404));

    const validatedData = updateLeadSourceSchema.parse(req.body);

    const updated = await LeadSource.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead source updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/lead-sources/:id  — soft delete
export const deleteLeadSource = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leadSource = await LeadSource.findById(req.params.id);
    if (!leadSource) return next(new appError('Lead source not found', 404));

    await LeadSource.findByIdAndUpdate(req.params.id, { status: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead source deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
