import { z } from 'zod';

const bankDetailSchema = z.object({
  accountName: z.string().min(1, 'Account name is required').trim(),
  accountNo: z.string().min(1, 'Account number is required').trim(),
  ifscSortCode: z.string().min(1, 'IFSC / Sort code is required').trim(),
  accountType: z.string().min(1, 'Account type is required').trim(),
  bankName: z.string().min(1, 'Bank name is required').trim(),
  branch: z.string().min(1, 'Branch is required').trim(),
});

const ownerDetailSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').trim(),
  designation: z.string().min(1, 'Designation is required').trim(),
  contactNo: z.string().min(1, 'Contact number is required').trim(),
  role: z.string().min(1, 'Role is required').trim(),
  mobileNumber: z.string().min(1, 'Mobile number is required').trim(),
  gstinNumber: z.string().min(1, 'GSTIN number is required').trim(),
  emailId: z.string().email('Invalid email').trim(),
});

const generalInformationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').trim(),
  email: z.string().email('Invalid email').trim(),
  companyDisplayName: z
    .string()
    .min(1, 'Company display name is required')
    .trim(),
  website: z.string().optional(),
  contactPerson: z.string().min(1, 'Contact person is required').trim(),
  registeredAddress: z.string().min(1, 'Registered address is required').trim(),
  mobileNumber: z.string().min(1, 'Mobile number is required').trim(),
  aboutCompany: z.string().optional(),
  landlineNumber: z.string().optional(),
  companyLogo: z.string().optional(),
});

const moreInformationSchema = z.object({
  senderEmailId: z.string().email('Invalid email').optional().or(z.literal('')),
  natureOfBusiness: z.string().optional(),
});

export const createCompanyProfileSchema = z.object({
  generalInformation: generalInformationSchema,
  ownerDetail: ownerDetailSchema,
  bankDetails: z.array(bankDetailSchema).default([]),
  moreInformation: moreInformationSchema.optional(),
});

export const updateCompanyProfileSchema = z.object({
  generalInformation: generalInformationSchema.partial().optional(),
  ownerDetail: ownerDetailSchema.partial().optional(),
  bankDetails: z.array(bankDetailSchema).optional(),
  moreInformation: moreInformationSchema.optional(),
});

// Bank detail CRUD schemas
export const addBankDetailSchema = bankDetailSchema;
export const updateBankDetailSchema = bankDetailSchema.partial();

export type CreateCompanyProfileInput = z.infer<
  typeof createCompanyProfileSchema
>;
export type UpdateCompanyProfileInput = z.infer<
  typeof updateCompanyProfileSchema
>;
export type AddBankDetailInput = z.infer<typeof addBankDetailSchema>;
export type UpdateBankDetailInput = z.infer<typeof updateBankDetailSchema>;
