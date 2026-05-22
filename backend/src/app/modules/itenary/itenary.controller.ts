import { NextFunction, Request, Response } from 'express';
import Itinerary from './itenary.model';
import {
  createItinerarySchema,
  updateItinerarySchema,
  itineraryQuerySchema,
} from './itenary.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/itineraries
export const createItinerary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createItinerarySchema.parse(req.body);
    const itinerary = new Itinerary(validatedData);
    await itinerary.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Itinerary created successfully',
      data: itinerary,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/itineraries
// Supports: ?startCity=&destinationCity=&title=&itineraryId=&isActive=&search=&page=&limit=
export const getAllItineraries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      startCity,
      destinationCity,
      title,
      itineraryId,
      isActive,
      search,
      page,
      limit,
    } = itineraryQuerySchema.parse(req.query);

    const filter: any = {};

    // default: active only unless explicitly overridden
    filter.isActive = isActive !== undefined ? isActive : true;

    if (itineraryId) filter.itineraryId = itineraryId;
    if (startCity) filter.startCity = new RegExp(startCity, 'i');
    if (destinationCity)
      filter.destinationCity = new RegExp(destinationCity, 'i');
    if (title) filter.title = new RegExp(title, 'i');
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [itineraries, total] = await Promise.all([
      Itinerary.find(filter)
        .select('-description') // omit heavy HTML field from list view
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Itinerary.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Itineraries retrieved successfully',
      data: itineraries,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/itineraries/:id
export const getItineraryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(new appError('Itinerary not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Itinerary retrieved successfully',
      data: itinerary,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/itineraries/:id
export const updateItinerary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(new appError('Itinerary not found', 404));

    const validatedData = updateItinerarySchema.parse(req.body);
    const updated = await Itinerary.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Itinerary updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/itineraries/:id  — soft delete
export const deleteItinerary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return next(new appError('Itinerary not found', 404));

    await Itinerary.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Itinerary deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
