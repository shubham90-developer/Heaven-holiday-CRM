import { NextFunction, Request, Response } from 'express';
import CompanyProfile from './company-model';
import {
  createCompanyProfileSchema,
  updateCompanyProfileSchema,
  addBankDetailSchema,
  updateBankDetailSchema,
} from './company.validation';
import { appError } from '../../errors/appError';

// ─── Helper: get the single company profile doc ───────────────────────────────
const getProfile = () => CompanyProfile.findOne({ isActive: true });

// ─── Dummy default profile ────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
  generalInformation: {
    companyName: 'Your Company Name',
    email: 'company@example.com',
    companyDisplayName: 'Your Company Display Name',
    website: 'https://www.example.com',
    contactPerson: 'Contact Person Name',
    registeredAddress: 'Your Registered Address',
    mobileNumber: '0000000000',
    aboutCompany: 'About your company',
    landlineNumber: '0000000000',
    companyLogo: '',
  },
  ownerDetail: {
    fullName: 'Owner Full Name',
    designation: 'Director',
    contactNo: '0000000000',
    role: 'Owner',
    mobileNumber: '0000000000',
    gstinNumber: 'GSTIN000000000',
    emailId: 'owner@example.com',
  },
  bankDetails: [],
  moreInformation: {
    senderEmailId: 'sender@example.com',
    natureOfBusiness: 'B2C B2B',
  },
};

export const getCompanyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let profile = await getProfile();

    // Auto-create with dummy values if none exists
    if (!profile) {
      profile = new CompanyProfile(DEFAULT_PROFILE);
      await profile.save();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Company profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/company-profile
// Updates generalInformation, ownerDetail, moreInformation
export const updateCompanyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await getProfile();
    if (!profile) return next(new appError('Company profile not found', 404));

    const validatedData = updateCompanyProfileSchema.parse(req.body);

    // Merge nested objects instead of replacing them
    const updatePayload: any = {};
    if (validatedData.generalInformation) {
      Object.entries(validatedData.generalInformation).forEach(([k, v]) => {
        updatePayload[`generalInformation.${k}`] = v;
      });
    }
    if (validatedData.ownerDetail) {
      Object.entries(validatedData.ownerDetail).forEach(([k, v]) => {
        updatePayload[`ownerDetail.${k}`] = v;
      });
    }
    if (validatedData.moreInformation) {
      Object.entries(validatedData.moreInformation).forEach(([k, v]) => {
        updatePayload[`moreInformation.${k}`] = v;
      });
    }

    const updated = await CompanyProfile.findByIdAndUpdate(
      profile._id,
      { $set: updatePayload },
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Company profile updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Bank Details ─────────────────────────────────────────────────────────────

// POST /v1/api/company-profile/bank-details
export const addBankDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await getProfile();
    if (!profile) return next(new appError('Company profile not found', 404));

    const validatedData = addBankDetailSchema.parse(req.body);

    profile.bankDetails.push(validatedData as any);
    await profile.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Bank detail added successfully',
      data: profile.bankDetails,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/company-profile/bank-details/:bankId
export const updateBankDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await getProfile();
    if (!profile) return next(new appError('Company profile not found', 404));

    const bank = profile.bankDetails.find(
      (b: any) => b._id.toString() === req.params.bankId,
    );
    if (!bank) return next(new appError('Bank detail not found', 404));

    const validatedData = updateBankDetailSchema.parse(req.body);
    Object.assign(bank, validatedData);
    await profile.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Bank detail updated successfully',
      data: profile.bankDetails,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/company-profile/bank-details/:bankId
export const deleteBankDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await getProfile();
    if (!profile) return next(new appError('Company profile not found', 404));

    const bankIndex = profile.bankDetails.findIndex(
      (b: any) => b._id.toString() === req.params.bankId,
    );
    if (bankIndex === -1)
      return next(new appError('Bank detail not found', 404));

    profile.bankDetails.splice(bankIndex, 1);
    await profile.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Bank detail deleted successfully',
      data: profile.bankDetails,
    });
  } catch (error) {
    next(error);
  }
};
