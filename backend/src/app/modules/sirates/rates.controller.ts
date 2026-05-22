import { NextFunction, Request, Response } from 'express';
import SightseeingRate from './rates.model';
import Sightseeing from '../sightseeing/sightseeing.model';
import Supplier from '../supplier/supplier.model';
import {
  createSightseeingRateSchema,
  updateSightseeingRateSchema,
  sightseeingRateQuerySchema,
} from './rates.validation';

import { appError } from '../../errors/appError';

// POST /v1/api/sightseeing-rates
export const createSightseeingRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createSightseeingRateSchema.parse(req.body);

    // Verify sightseeing exists
    const sightseeing = await Sightseeing.findById(validatedData.sightseeingId);
    if (!sightseeing) return next(new appError('Sightseeing not found', 404));

    // Verify supplier exists
    const supplier = await Supplier.findById(validatedData.supplier);
    if (!supplier) return next(new appError('Supplier not found', 404));

    const rate = new SightseeingRate(validatedData);
    await rate.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Sightseeing rate created successfully',
      data: rate,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/sightseeing-rates
export const getAllSightseeingRates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      sightseeingId,
      city,
      supplier,
      currency,
      bookingType,
      isActive,
      page,
      limit,
    } = sightseeingRateQuerySchema.parse(req.query);

    const filter: any = {};
    filter.isActive = isActive !== undefined ? isActive : true;

    if (sightseeingId) filter.sightseeingId = sightseeingId;
    if (city) filter.city = new RegExp(city, 'i');
    if (supplier) filter.supplier = supplier;
    if (currency) filter.currency = currency;
    if (bookingType) filter.bookingType = bookingType;

    const skip = (page - 1) * limit;

    const [rates, total] = await Promise.all([
      SightseeingRate.find(filter)
        .populate('sightseeingId', 'sightseeingName city country')
        .populate('supplier', 'companyName city country currency')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      SightseeingRate.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing rates retrieved successfully',
      data: rates,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/sightseeing-rates/:id
export const getSightseeingRateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rate = await SightseeingRate.findById(req.params.id)
      .populate('sightseeingId', 'sightseeingName city country')
      .populate('supplier', 'companyName city country currency');

    if (!rate) return next(new appError('Sightseeing rate not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing rate retrieved successfully',
      data: rate,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/sightseeing-rates/:id
export const updateSightseeingRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rate = await SightseeingRate.findById(req.params.id);
    if (!rate) return next(new appError('Sightseeing rate not found', 404));

    const validatedData = updateSightseeingRateSchema.parse(req.body);

    // If supplier is being updated, verify it exists
    if (validatedData.supplier) {
      const supplier = await Supplier.findById(validatedData.supplier);
      if (!supplier) return next(new appError('Supplier not found', 404));
    }

    const updated = await SightseeingRate.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    )
      .populate('sightseeingId', 'sightseeingName city country')
      .populate('supplier', 'companyName city country currency');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing rate updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/sightseeing-rates/:id  — soft delete
export const deleteSightseeingRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rate = await SightseeingRate.findById(req.params.id);
    if (!rate) return next(new appError('Sightseeing rate not found', 404));

    await SightseeingRate.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeing rate deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/sightseeing-rates/cities
export const getSightseeingCities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cities = await Sightseeing.distinct('city', { isActive: true });
    res.json({
      success: true,
      statusCode: 200,
      message: 'Cities retrieved successfully',
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/sightseeing-rates/by-city?city=
export const getSightseeingsByCity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { city } = req.query;
    if (!city) return next(new appError('City is required', 400));

    const sightseeings = await Sightseeing.find(
      { city: new RegExp(city as string, 'i'), isActive: true },
      'sightseeingName _id sightseeingId',
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sightseeings retrieved successfully',
      data: sightseeings,
    });
  } catch (error) {
    next(error);
  }
};
