import { NextFunction, Request, Response } from 'express';
import Restaurant from './resto.model';
import {
  createRestaurantSchema,
  updateRestaurantSchema,
  restaurantQuerySchema,
} from './resto.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/restaurants
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createRestaurantSchema.parse(req.body);
    const restaurant = new Restaurant(validatedData);
    await restaurant.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Restaurant created successfully',
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/restaurants
// Supports: ?city=&restaurantArea=&supplierName=&restaurantId=&isPreferred=&isVeg=&isNonVeg=&isAI=&isActive=&search=&page=&limit=
export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      city,
      restaurantArea,
      supplierName,
      restaurantId,
      isPreferred,
      isVeg,
      isNonVeg,
      isAI,
      isActive,
      search,
      page,
      limit,
    } = restaurantQuerySchema.parse(req.query);

    const filter: any = {};

    filter.isActive = isActive !== undefined ? isActive : true;

    if (restaurantId) filter.restaurantId = restaurantId;
    if (city) filter.city = new RegExp(city, 'i');
    if (restaurantArea) filter.restaurantArea = new RegExp(restaurantArea, 'i');
    if (supplierName) filter.supplierName = new RegExp(supplierName, 'i');
    if (isPreferred !== undefined) filter.isPreferred = isPreferred;
    if (isVeg !== undefined) filter.isVeg = isVeg;
    if (isNonVeg !== undefined) filter.isNonVeg = isNonVeg;
    if (isAI !== undefined) filter.isAI = isAI;
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [restaurants, total] = await Promise.all([
      Restaurant.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Restaurant.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Restaurants retrieved successfully',
      data: restaurants,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/restaurants/:id
export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return next(new appError('Restaurant not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Restaurant retrieved successfully',
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/restaurants/:id
export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return next(new appError('Restaurant not found', 404));

    const validatedData = updateRestaurantSchema.parse(req.body);
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Restaurant updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/restaurants/:id  — soft delete
export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return next(new appError('Restaurant not found', 404));

    await Restaurant.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Restaurant deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
