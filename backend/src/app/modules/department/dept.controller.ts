// department.controller.ts
import { NextFunction, Request, Response } from 'express';
import Department from './dept.model';
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from './dept.validation';
import { appError } from '../../errors/appError';

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createDepartmentSchema.parse(req.body);

    const existingDepartment = await Department.findOne({
      name: validatedData.name,
    });
    if (existingDepartment) {
      next(new appError('Department with this name already exists', 409));
      return;
    }

    const department = new Department(validatedData);
    await department.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Department created successfully',
      data: department,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    if (departments.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No departments found',
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Departments retrieved successfully',
      data: departments,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      next(new appError('Department not found', 404));
      return;
    }

    const validatedData = updateDepartmentSchema.parse(req.body);

    if (Object.keys(validatedData).length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No changes to update',
        data: department,
      });
      return;
    }

    if (validatedData.name) {
      const existingDepartment = await Department.findOne({
        name: validatedData.name,
        _id: { $ne: req.params.id },
      });
      if (existingDepartment) {
        next(new appError('Department with this name already exists', 409));
        return;
      }
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Department updated successfully',
      data: updatedDepartment,
    });
    return;
  } catch (error) {
    next(error);
  }
};
