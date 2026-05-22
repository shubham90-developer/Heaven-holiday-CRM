import { NextFunction, Request, Response } from 'express';
import TransportRoute from './t-rates.model';
import {
  createTransportRouteSchema,
  updateTransportRouteSchema,
  transportRouteQuerySchema,
} from './t-rates.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/transport-routes
export const createTransportRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createTransportRouteSchema.parse(req.body);

    const route = new TransportRoute(validatedData);
    await route.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Transport route created successfully',
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/transport-routes
export const getAllTransportRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      category,
      startCity,
      destinationCity,
      isWebsite,
      isActive,
      page,
      limit,
    } = transportRouteQuerySchema.parse(req.query);

    const filter: any = {};
    filter.isActive = isActive !== undefined ? isActive : true;

    if (category) filter.category = category;
    if (startCity) filter.startCity = new RegExp(startCity, 'i');
    if (destinationCity)
      filter.destinationCity = new RegExp(destinationCity, 'i');
    if (isWebsite !== undefined) filter.isWebsite = isWebsite;

    const skip = (page - 1) * limit;

    const [routes, total] = await Promise.all([
      TransportRoute.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      TransportRoute.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport routes retrieved successfully',
      data: routes,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/transport-routes/:id
export const getTransportRouteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const route = await TransportRoute.findById(req.params.id);
    if (!route) return next(new appError('Transport route not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport route retrieved successfully',
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/transport-routes/:id
export const updateTransportRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const route = await TransportRoute.findById(req.params.id);
    if (!route) return next(new appError('Transport route not found', 404));

    const validatedData = updateTransportRouteSchema.parse(req.body);

    const updated = await TransportRoute.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport route updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/transport-routes/:id  — soft delete
export const deleteTransportRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const route = await TransportRoute.findById(req.params.id);
    if (!route) return next(new appError('Transport route not found', 404));

    await TransportRoute.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport route deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
