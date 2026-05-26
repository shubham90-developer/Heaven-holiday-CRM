// query.controller.ts
import { NextFunction, Request, Response } from 'express';
import { Query } from './query.model';
import { CreateQuerySchema, UpdateQuerySchema } from './query.validation';
import { appError } from '../../errors/appError';

// ── helpers ──────────────────────────────────────────────────────────────────

const INFO_FIELD_MAP: Record<string, string> = {
  Package: 'packageInfo',
  Flight: 'flightInfo',
  Transfer: 'transferInfo',
  Visa: 'visaInfo',
  Hotel: 'hotelInfo',
  Sightseeing: 'sightseeingInfo',
  Miscellaneous: 'miscellaneousInfo',
};

// ── CREATE ───────────────────────────────────────────────────────────────────

export const createQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = CreateQuerySchema.parse(req.body);
    const query = await Query.create(validatedData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Query created successfully',
      data: query,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET ALL (with filters + pagination) ──────────────────────────────────────

export const getAllQueries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      leadId,
      requirementType,
      status,
      createdBy,
      fromDate,
      toDate,
      page = '1',
      limit = '10',
    } = req.query as Record<string, string>;

    const filter: Record<string, any> = {};

    if (leadId) filter.lead = leadId;
    if (requirementType) filter.requirementType = requirementType;
    if (status) filter.status = status;
    if (createdBy) filter.createdBy = createdBy;

    if (fromDate || toDate) {
      filter.travelDate = {};
      if (fromDate) filter.travelDate.$gte = new Date(fromDate);
      if (toDate) filter.travelDate.$lte = new Date(toDate);
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [queries, total] = await Promise.all([
      Query.find(filter)
        .populate('lead', 'customerName phone email type')
        .populate('createdBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Query.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Queries fetched successfully',
      data: queries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET ALL QUERIES FOR A SPECIFIC LEAD ──────────────────────────────────────

export const getQueriesByLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { leadId } = req.params;

    const queries = await Query.find({ lead: leadId })
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Lead queries fetched successfully',
      data: queries,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET BY ID ────────────────────────────────────────────────────────────────

export const getQueryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await Query.findById(req.params.id)
      .populate('lead', 'customerName phone email type')
      .populate('createdBy', 'firstName lastName');

    if (!query) {
      next(new appError('Query not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query fetched successfully',
      data: query,
    });
  } catch (error) {
    next(error);
  }
};

// ── UPDATE ───────────────────────────────────────────────────────────────────

export const updateQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existing = await Query.findById(req.params.id);
    if (!existing) {
      next(new appError('Query not found', 404));
      return;
    }

    const validatedData = UpdateQuerySchema.parse(req.body);

    // if requirementType is changing, clear the old info sub-doc
    if (
      validatedData.requirementType &&
      validatedData.requirementType !== existing.requirementType
    ) {
      const oldInfoField = INFO_FIELD_MAP[existing.requirementType];
      (validatedData as any)[oldInfoField] = null;
    }

    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData },
      { new: true, runValidators: true },
    )
      .populate('lead', 'customerName phone email')
      .populate('createdBy', 'firstName lastName');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ── UPDATE STATUS ONLY ───────────────────────────────────────────────────────

export const updateQueryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status } = req.body;

    const validStatuses = ['new', 'inProcess', 'confirmed', 'rejected', 'lost'];
    if (!status || !validStatuses.includes(status)) {
      next(
        new appError(`status must be one of: ${validStatuses.join(', ')}`, 400),
      );
      return;
    }

    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true },
    );

    if (!query) {
      next(new appError('Query not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query status updated successfully',
      data: { _id: query._id, status: query.status },
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE ───────────────────────────────────────────────────────────────────

export const deleteQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      next(new appError('Query not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
