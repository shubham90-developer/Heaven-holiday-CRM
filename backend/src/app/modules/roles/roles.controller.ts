import { NextFunction, Request, Response } from 'express';
import Role from './roles.model';
import { createRoleSchema, updateRoleSchema } from './roles.validation';
import { appError } from '../../errors/appError';

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createRoleSchema.parse(req.body);

    const role = new Role(validatedData);
    await role.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Role created successfully',
      data: role,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });

    if (roles.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No roles found',
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Roles retrieved successfully',
      data: roles,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      next(new appError('Role not found', 404));
      return;
    }

    const validatedData = updateRoleSchema.parse(req.body);

    if (Object.keys(validatedData).length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: 'No changes to update',
        data: role,
      });
      return;
    }

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Role updated successfully',
      data: updatedRole,
    });
    return;
  } catch (error) {
    next(error);
  }
};
