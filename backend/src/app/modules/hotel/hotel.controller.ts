import { NextFunction, Request, Response } from 'express';
import Hotel from './hotel.model';
import {
  createHotelSchema,
  updateHotelSchema,
  hotelQuerySchema,
} from './hotel.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/hotels
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createHotelSchema.parse(req.body);
    const hotel = new Hotel(validatedData);
    await hotel.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Hotel created successfully',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/hotels
// Supports: ?hotelName=&cityName=&country=&starRating=&propertyType=
//           &supplier=&hotelId=&isActive=&search=&page=&limit=
export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      hotelName,
      cityName,
      country,
      starRating,
      propertyType,
      supplier,
      hotelId,
      isActive,
      search,
      page,
      limit,
    } = hotelQuerySchema.parse(req.query);

    const filter: any = {};

    // default: show only active hotels unless explicitly requested
    filter.isActive = isActive !== undefined ? isActive : true;

    if (hotelId) filter.hotelId = hotelId;
    if (starRating) filter.starRating = starRating;
    if (propertyType) filter.propertyType = propertyType;
    if (supplier) filter.supplier = new RegExp(supplier, 'i');
    if (cityName) filter.cityName = new RegExp(cityName, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (hotelName) filter.hotelName = new RegExp(hotelName, 'i');
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [hotels, total] = await Promise.all([
      Hotel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Hotel.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Hotels retrieved successfully',
      data: hotels,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/hotels/:id
export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate(
      'createdBy',
      'firstName lastName',
    );
    if (!hotel) return next(new appError('Hotel not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Hotel retrieved successfully',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/hotels/:id
// Handles everything: basic info, room types, amenities, images — just send what changed
export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return next(new appError('Hotel not found', 404));

    const validatedData = updateHotelSchema.parse(req.body);
    const updated = await Hotel.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Hotel updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/hotels/:id  — soft delete
export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return next(new appError('Hotel not found', 404));

    await Hotel.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Hotel deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
