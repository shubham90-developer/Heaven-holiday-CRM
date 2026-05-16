import { NextFunction, Request, Response } from 'express';
import Query from './query.model';
import { createQuerySchema, updateQuerySchema } from './query.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/queries
export const createQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createQuerySchema.parse(req.body);
    const query = new Query(validatedData);
    await query.save();

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

// GET /v1/api/queries  (all queries with filters)
export const getAllQueries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      stage,
      temperature,
      assignedSales,
      assignedOps,
      page = 1,
      limit = 20,
    } = req.query;

    const filter: any = { archived: false };
    if (stage) filter.stage = stage;
    if (temperature) filter.temperature = temperature;
    if (assignedSales) filter.assignedSales = assignedSales;
    if (assignedOps) filter.assignedOps = assignedOps;

    const skip = (Number(page) - 1) * Number(limit);

    const [queries, total] = await Promise.all([
      Query.find(filter)
        .populate('leadId', 'customerName phone email type')
        .populate('assignedSales', 'firstName lastName')
        .populate('assignedOps', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Query.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Queries retrieved successfully',
      data: queries,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/queries/lead/:leadId  (all queries of a lead)
export const getQueriesByLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queries = await Query.find({ leadId: req.params.leadId })
      .populate('assignedSales', 'firstName lastName')
      .populate('assignedOps', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Queries retrieved successfully',
      data: queries,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/queries/:id
export const getQueryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await Query.findById(req.params.id)
      .populate('leadId', 'customerName phone email type source')
      .populate('assignedSales', 'firstName lastName')
      .populate('assignedOps', 'firstName lastName');

    if (!query) {
      next(new appError('Query not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query retrieved successfully',
      data: query,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/queries/:id
export const updateQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      next(new appError('Query not found', 404));
      return;
    }

    const validatedData = updateQuerySchema.parse(req.body);
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      validatedData,
      {
        new: true,
      },
    )
      .populate('leadId', 'customerName phone email type')
      .populate('assignedSales', 'firstName lastName')
      .populate('assignedOps', 'firstName lastName');

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

// GET /v1/api/queries/counts
export const getQueryCounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [inProgress, confirmed, rejected, unAssigned] = await Promise.all([
      Query.countDocuments({
        stage: { $in: ['queryCreated', 'proposalPending', 'proposalSent'] },
        archived: false,
      }),
      Query.countDocuments({ stage: 'confirmed', archived: false }),
      Query.countDocuments({ stage: 'rejected', archived: false }),
      Query.countDocuments({ assignedSales: null, archived: false }),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Query counts retrieved',
      data: { inProgress, confirmed, rejected, unAssigned },
    });
  } catch (error) {
    next(error);
  }
};
