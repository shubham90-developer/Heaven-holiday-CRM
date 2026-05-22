import { NextFunction, Request, Response } from 'express';
import Sightseeing from './sightseeing.model';
import {
  createSightseeingSchema,
  updateSightseeingSchema,
  sightseeingQuerySchema,
} from './sightseeing.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/sightseeings
export const createSightseeing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // If image was uploaded via multer, attach the file path
    const body = {
      ...req.body,
      ...(req.file && { image: req.file.path }),
    };

    const validatedData = createSightseeingSchema.parse(body);
    const sightseeing = new Sightseeing(validatedData);
    await sightseeing.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Sightseeing created successfully',
      data: sightseeing,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSightseeings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      sightseeingName,
      city,
      country,
      category,
      difficultyLevel,
      season,
      popularity,
      sightseeingId,
      isActive,
      search,
      page,
      limit,
    } = sightseeingQuerySchema.parse(req.query);

    const filter: any = {};

    // default: show only active sightseeings unless explicitly requested
    filter.isActive = isActive !== undefined ? isActive : true;

    if (sightseeingId) filter.sightseeingId = sightseeingId;
    if (difficultyLevel) filter.difficultyLevel = difficultyLevel;
    if (season) filter.season = season;
    if (popularity) filter.popularity = popularity;
    if (city) filter.city = new RegExp(city, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (sightseeingName)
      filter.sightseeingName = new RegExp(sightseeingName, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [sightseeings, total] = await Promise.all([
      Sightseeing.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Sightseeing.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeings retrieved successfully',
      data: sightseeings,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/sightseeings/:id
export const getSightseeingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sightseeing = await Sightseeing.findById(req.params.id);
    if (!sightseeing) return next(new appError('Sightseeing not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing retrieved successfully',
      data: sightseeing,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/sightseeings/:id
export const updateSightseeing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sightseeing = await Sightseeing.findById(req.params.id);
    if (!sightseeing) return next(new appError('Sightseeing not found', 404));

    // If a new image was uploaded, attach the new file path
    const body = {
      ...req.body,
      ...(req.file && { image: req.file.path }),
    };

    const validatedData = updateSightseeingSchema.parse(body);
    const updated = await Sightseeing.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/sightseeings/:id  — soft delete
export const deleteSightseeing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sightseeing = await Sightseeing.findById(req.params.id);
    if (!sightseeing) return next(new appError('Sightseeing not found', 404));

    await Sightseeing.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
