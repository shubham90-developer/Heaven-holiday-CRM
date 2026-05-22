import { NextFunction, Request, Response } from 'express';
import Transport from './transport.model';
import {
  createTransportSchema,
  updateTransportSchema,
  transportQuerySchema,
} from './transport.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/transports
export const createTransport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createTransportSchema.parse(req.body);

    const transport = new Transport(validatedData);
    await transport.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Transport created successfully',
      data: transport,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/transports
export const getAllTransports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { carType, ac, isActive, page, limit } = transportQuerySchema.parse(
      req.query,
    );

    const filter: any = {};
    filter.isActive = isActive !== undefined ? isActive : true;

    if (carType) filter.carType = new RegExp(carType, 'i');
    if (ac) filter.ac = ac;

    const skip = (page - 1) * limit;

    const [transports, total] = await Promise.all([
      Transport.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Transport.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transports retrieved successfully',
      data: transports,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/transports/:id
export const getTransportById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return next(new appError('Transport not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport retrieved successfully',
      data: transport,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/transports/:id
export const updateTransport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return next(new appError('Transport not found', 404));

    const validatedData = updateTransportSchema.parse(req.body);

    const updated = await Transport.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/transports/:id  — soft delete
export const deleteTransport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) return next(new appError('Transport not found', 404));

    await Transport.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Transport deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
