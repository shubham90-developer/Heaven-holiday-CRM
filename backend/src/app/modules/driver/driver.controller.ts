import { NextFunction, Request, Response } from 'express';
import Driver from './driver.model';
import Transport from '../transport/transport.model';
import {
  createDriverSchema,
  updateDriverSchema,
  driverQuerySchema,
} from './driver.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/drivers
export const createDriver = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createDriverSchema.parse(req.body);

    // Verify transport (primaryVehicle) exists
    const transport = await Transport.findById(validatedData.primaryVehicle);
    if (!transport) return next(new appError('Transport not found', 404));

    const driver = new Driver(validatedData);
    await driver.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Driver created successfully',
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/drivers
export const getAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { city, country, primaryVehicle, isActive, page, limit } =
      driverQuerySchema.parse(req.query);

    const filter: any = {};
    filter.isActive = isActive !== undefined ? isActive : true;

    if (city) filter.city = new RegExp(city, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (primaryVehicle) filter.primaryVehicle = primaryVehicle;

    const skip = (page - 1) * limit;

    const [drivers, total] = await Promise.all([
      Driver.find(filter)
        .populate(
          'primaryVehicle',
          'transportId carType carName seatingCapacity ac vehicleNumber',
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Driver.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Drivers retrieved successfully',
      data: drivers,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/drivers/:id
export const getDriverById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driver = await Driver.findById(req.params.id).populate(
      'primaryVehicle',
      'transportId carType carName seatingCapacity ac vehicleNumber',
    );

    if (!driver) return next(new appError('Driver not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Driver retrieved successfully',
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/drivers/:id
export const updateDriver = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return next(new appError('Driver not found', 404));

    const validatedData = updateDriverSchema.parse(req.body);

    // If primaryVehicle is being updated, verify it exists
    if (validatedData.primaryVehicle) {
      const transport = await Transport.findById(validatedData.primaryVehicle);
      if (!transport) return next(new appError('Transport not found', 404));
    }

    const updated = await Driver.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    ).populate(
      'primaryVehicle',
      'transportId carType carName seatingCapacity ac vehicleNumber',
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Driver updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/drivers/:id  — soft delete
export const deleteDriver = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return next(new appError('Driver not found', 404));

    await Driver.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Driver deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
