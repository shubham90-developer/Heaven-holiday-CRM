import { NextFunction, Request, Response } from 'express';
import Area from './area.model';
import {
  createAreaSchema,
  updateAreaSchema,
  areaQuerySchema,
} from './area.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/areas
export const createArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createAreaSchema.parse(req.body);
    const area = new Area(validatedData);
    await area.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Area created successfully',
      data: area,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/areas
// Supports: ?city=&area=&areaId=&isActive=&search=&page=&limit=
export const getAllAreas = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { city, area, areaId, isActive, search, page, limit } =
      areaQuerySchema.parse(req.query);

    const filter: any = {};

    // default: active only unless explicitly overridden
    filter.isActive = isActive !== undefined ? isActive : true;

    if (areaId) filter.areaId = areaId;
    if (city) filter.city = new RegExp(city, 'i');
    if (area) filter.area = new RegExp(area, 'i');
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [areas, total] = await Promise.all([
      Area.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Area.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Areas retrieved successfully',
      data: areas,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/areas/:id
export const getAreaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return next(new appError('Area not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Area retrieved successfully',
      data: area,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/areas/:id
export const updateArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return next(new appError('Area not found', 404));

    const validatedData = updateAreaSchema.parse(req.body);
    const updated = await Area.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Area updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/areas/:id  — soft delete
export const deleteArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return next(new appError('Area not found', 404));

    await Area.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Area deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
