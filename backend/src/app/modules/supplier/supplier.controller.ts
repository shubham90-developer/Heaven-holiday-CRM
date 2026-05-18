import { NextFunction, Request, Response } from 'express';
import Supplier from './supplier.model';
import {
  createSupplierSchema,
  updateSupplierSchema,
  addContactSchema,
  addBankDetailSchema,
} from './supplier.validation';
import { appError } from '../../errors/appError';

// ── POST /v1/api/suppliers ────────────────────────────────────────────────────

export const createSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createSupplierSchema.parse(req.body);

    const existing = await Supplier.findOne({
      phone: validatedData.phone,
      archived: false,
    });
    if (existing) {
      next(
        new appError('A supplier with this phone number already exists', 409),
      );
      return;
    }

    const supplier = new Supplier(validatedData);
    await supplier.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Supplier created successfully',
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /v1/api/suppliers ─────────────────────────────────────────────────────

export const getAllSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      status,
      category,
      services,
      city,
      country,
      rm,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter: any = { archived: false };

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (services) filter.services = { $regex: services, $options: 'i' };
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (country) filter.country = { $regex: country, $options: 'i' };
    if (rm) filter.rm = rm;

    // Global search across company name, contact name, phone, email
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [suppliers, total] = await Promise.all([
      Supplier.find(filter)
        .populate('rm', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Supplier.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Suppliers retrieved successfully',
      data: suppliers,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    next(error);
  }
};

// ── GET /v1/api/suppliers/:id ─────────────────────────────────────────────────

export const getSupplierById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      'rm',
      'firstName lastName',
    );

    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Supplier retrieved successfully',
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

// ── PATCH /v1/api/suppliers/:id ───────────────────────────────────────────────

export const updateSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    const validatedData = updateSupplierSchema.parse(req.body);

    const updated = await Supplier.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    ).populate('rm', 'firstName lastName');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Supplier updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /v1/api/suppliers/:id  (soft delete) ───────────────────────────────

export const deleteSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    await Supplier.findByIdAndUpdate(req.params.id, {
      archived: true,
      status: 'inactive',
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Supplier deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// ── POST /v1/api/suppliers/:id/contacts ───────────────────────────────────────

export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    const validatedContact = addContactSchema.parse(req.body);
    supplier.contacts.push(validatedContact as any);
    await supplier.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Contact added successfully',
      data: supplier.contacts,
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /v1/api/suppliers/:id/contacts/:contactId ─────────────────────────

export const removeContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    supplier.contacts = supplier.contacts.filter(
      (c: any) => c._id.toString() !== req.params.contactId,
    );
    await supplier.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Contact removed successfully',
      data: supplier.contacts,
    });
  } catch (error) {
    next(error);
  }
};

// ── POST /v1/api/suppliers/:id/bank-details ───────────────────────────────────

export const addBankDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    const validatedBank = addBankDetailSchema.parse(req.body);

    // If new entry is primary, unset all existing primary flags
    if (validatedBank.isPrimary) {
      supplier.bankDetails.forEach((b: any) => (b.isPrimary = false));
    }

    supplier.bankDetails.push(validatedBank as any);
    await supplier.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Bank detail added successfully',
      data: supplier.bankDetails,
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /v1/api/suppliers/:id/bank-details/:bankId ────────────────────────

export const removeBankDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      next(new appError('Supplier not found', 404));
      return;
    }

    supplier.bankDetails = supplier.bankDetails.filter(
      (b: any) => b._id.toString() !== req.params.bankId,
    );
    await supplier.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Bank detail removed successfully',
      data: supplier.bankDetails,
    });
  } catch (error) {
    next(error);
  }
};
