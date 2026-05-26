import { NextFunction, Request, Response } from 'express';
import TermsConditions from './t&c.model';
import { updateTermsConditionsSchema } from './t&c.validation';
import { appError } from '../../errors/appError';

// ─── Helper ───────────────────────────────────────────────────────────────────
const getDoc = () => TermsConditions.findOne({ isActive: true });

// ─── Default values ───────────────────────────────────────────────────────────
const DEFAULT_TC = {
  tcDomesticHolidays: '',
  tcInternationalHolidays: '',
  cancellationPolicyDomesticHolidays: '',
};

// GET /v1/api/terms-conditions
// Auto-creates with empty values if none exists
export const getTermsConditions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let doc = await getDoc();

    if (!doc) {
      doc = new TermsConditions(DEFAULT_TC);
      await doc.save();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Terms and conditions retrieved successfully',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/terms-conditions
export const updateTermsConditions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let doc = await getDoc();

    // Auto-create if not exists before updating
    if (!doc) {
      doc = new TermsConditions(DEFAULT_TC);
      await doc.save();
    }

    const validatedData = updateTermsConditionsSchema.parse(req.body);

    const updated = await TermsConditions.findByIdAndUpdate(
      doc._id,
      { $set: validatedData },
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Terms and conditions updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
