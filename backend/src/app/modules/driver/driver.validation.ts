import { z } from 'zod';

const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId');

export const createDriverSchema = z.object({
  driverName: z.string().min(1, 'Driver name is required').trim(),
  mobileCountryCode: z.string().min(1).default('+91'),
  mobileNumber: z.string().min(1, 'Mobile number is required').trim(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  languages: z.string().min(1, 'Languages is required').trim(),
  address: z.string().optional(),
  country: z.string().min(1, 'Country is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  drivingLicense: z.string().min(1, 'Driving license is required').trim(),
  primaryVehicle: objectIdString,
  image: z.string().optional(),
  remark: z.string().optional(),
});

export const updateDriverSchema = createDriverSchema.partial();

export const driverQuerySchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  primaryVehicle: objectIdString.optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateDriverInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;
export type DriverQueryInput = z.infer<typeof driverQuerySchema>;
