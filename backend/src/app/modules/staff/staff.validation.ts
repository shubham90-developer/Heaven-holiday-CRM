// staff.validation.ts
import { z } from 'zod';

const permissionChildSchema = z.object({
  key: z.string(),
  label: z.string(),
  isAllowed: z.boolean().default(false),
});

const permissionSectionSchema = z.object({
  key: z.string(),
  title: z.string(),
  isAllowed: z.boolean().default(false),
  children: z.array(permissionChildSchema).default([]),
});

export const createStaffSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  email: z.string().email('Invalid email').trim(),
  password: z.string().min(8, 'Minimum 8 characters required'),
  countryCode: z.string().default('+91'),
  mobile: z.string().min(10, 'Invalid mobile number').trim(),
  roleId: z.string().min(1, 'Role is required'),
  departmentId: z.string().min(1, 'Department is required'),
  reportTo: z.string().optional(),
  senderIdSelf: z.boolean().default(false),
  senderEmail: z.string().email().optional(),
  secureLogin: z.boolean().default(false),
  apiBooking: z.boolean().default(false),
  masking: z.boolean().default(false),
  finance: z.boolean().default(false),
  archived: z.boolean().default(false),
  status: z.enum(['active', 'inactive']).default('active'),
  permissions: z.array(permissionSectionSchema).default([]),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  address: z.string().trim().optional(),
  photograph: z.string().optional(),
  signatureType: z.enum(['default', 'custom']).default('default'),
  signature: z.string().optional(),
});

export const updateStaffSchema = createStaffSchema.partial();

export const updateStaffFlagSchema = z.object({
  secureLogin: z.boolean().optional(),
  apiBooking: z.boolean().optional(),
  masking: z.boolean().optional(),
  finance: z.boolean().optional(),
  archived: z.boolean().optional(),
});
