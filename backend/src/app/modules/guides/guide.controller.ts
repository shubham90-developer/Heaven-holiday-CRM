import { NextFunction, Request, Response } from 'express';
import Guide from './guide.model';
import {
  createGuideSchema,
  updateGuideSchema,
  guideQuerySchema,
} from './guide.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/guides
export const createGuide = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createGuideSchema.parse(req.body);

    const guide = new Guide(validatedData);
    await guide.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Guide created successfully',
      data: guide,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/guides
export const getAllGuides = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { destination, isActive, page, limit } = guideQuerySchema.parse(
      req.query,
    );

    const filter: any = {};
    filter.isActive = isActive !== undefined ? isActive : true;

    if (destination) filter.destination = new RegExp(destination, 'i');

    const skip = (page - 1) * limit;

    const [guides, total] = await Promise.all([
      Guide.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Guide.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Guides retrieved successfully',
      data: guides,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/guides/:id
export const getGuideById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return next(new appError('Guide not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Guide retrieved successfully',
      data: guide,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/guides/:id
export const updateGuide = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return next(new appError('Guide not found', 404));

    const validatedData = updateGuideSchema.parse(req.body);

    const updated = await Guide.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Guide updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/guides/:id  — soft delete
export const deleteGuide = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return next(new appError('Guide not found', 404));

    await Guide.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Guide deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
