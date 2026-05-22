import { NextFunction, Request, Response } from 'express';
import Visa from './visa.model';
import {
  createVisaSchema,
  updateVisaSchema,
  visaQuerySchema,
} from './visa.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/visas
export const createVisa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createVisaSchema.parse(req.body);
    const visa = new Visa(validatedData);
    await visa.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Visa created successfully',
      data: visa,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/visas
// Supports: ?visaName=&travelersNationality=&countriesCovered=&visaType=
//           &visaCategory=&entryType=&supplier=&visaId=&isActive=&search=&page=&limit=
export const getAllVisas = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      visaName,
      travelersNationality,
      countriesCovered,
      visaType,
      visaCategory,
      entryType,
      supplier,
      visaId,
      isActive,
      search,
      page,
      limit,
    } = visaQuerySchema.parse(req.query);

    const filter: any = {};

    // default: active only unless explicitly overridden
    filter.isActive = isActive !== undefined ? isActive : true;

    if (visaId) filter.visaId = visaId;
    if (visaType) filter.visaType = visaType;
    if (visaCategory) filter.visaCategory = visaCategory;
    if (entryType) filter.entryType = entryType;
    if (supplier) filter.supplier = supplier; // ObjectId string — exact match
    if (visaName) filter.visaName = new RegExp(visaName, 'i');
    if (travelersNationality)
      filter.travelersNationality = new RegExp(travelersNationality, 'i');
    if (countriesCovered)
      filter.countriesCovered = { $in: [new RegExp(countriesCovered, 'i')] };
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [visas, total] = await Promise.all([
      Visa.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Visa.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Visas retrieved successfully',
      data: visas,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/visas/:id
export const getVisaById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const visa = await Visa.findById(req.params.id).populate(
      'supplier',
      'companyName firstName lastName email phone',
    );
    if (!visa) return next(new appError('Visa not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Visa retrieved successfully',
      data: visa,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/visas/:id
export const updateVisa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return next(new appError('Visa not found', 404));

    const validatedData = updateVisaSchema.parse(req.body);
    const updated = await Visa.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Visa updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/visas/:id  — soft delete
export const deleteVisa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return next(new appError('Visa not found', 404));

    await Visa.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Visa deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
