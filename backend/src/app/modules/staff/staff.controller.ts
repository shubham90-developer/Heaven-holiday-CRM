// staff.controller.ts
import { NextFunction, Request, Response } from 'express';
import Staff from './staff.model';
import {
  createStaffSchema,
  updateStaffSchema,
  updateStaffFlagSchema,
} from './staff.validation';
import { appError } from '../../errors/appError';

export const createStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createStaffSchema.parse(req.body);

    const existingStaff = await Staff.findOne({ email: validatedData.email });
    if (existingStaff) {
      next(new appError('Staff with this email already exists', 409));
      return;
    }

    const staff = new Staff(validatedData);
    await staff.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Staff created successfully',
      data: staff,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { archived } = req.query;

    const filter =
      archived === 'true' ? { archived: true } : { archived: false };

    const staffList = await Staff.find(filter)
      .populate('roleId', 'title')
      .populate('departmentId', 'name')
      .populate('reportTo', 'firstName lastName')
      .sort({ createdAt: -1 });

    if (staffList.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No staff found',
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Staff retrieved successfully',
      data: staffList,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getStaffById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('roleId', 'title')
      .populate('departmentId', 'name')
      .populate('reportTo', 'firstName lastName');

    if (!staff) {
      next(new appError('Staff not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Staff retrieved successfully',
      data: staff,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateStaffById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      next(new appError('Staff not found', 404));
      return;
    }

    const validatedData = updateStaffSchema.parse(req.body);

    if (Object.keys(validatedData).length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No changes to update',
        data: staff,
      });
      return;
    }

    if (validatedData.email) {
      const existingStaff = await Staff.findOne({
        email: validatedData.email,
        _id: { $ne: req.params.id },
      });
      if (existingStaff) {
        next(new appError('Email already in use by another staff', 409));
        return;
      }
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    )
      .populate('roleId', 'title')
      .populate('departmentId', 'name')
      .populate('reportTo', 'firstName lastName');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Staff updated successfully',
      data: updatedStaff,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateStaffFlags = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      next(new appError('Staff not found', 404));
      return;
    }

    const validatedData = updateStaffFlagSchema.parse(req.body);

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Staff flags updated successfully',
      data: updatedStaff,
    });
    return;
  } catch (error) {
    next(error);
  }
};
