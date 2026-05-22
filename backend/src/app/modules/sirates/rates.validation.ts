import { z } from 'zod';

const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId');

export const createSightseeingRateSchema = z.object({
  sightseeingId: objectIdString,
  city: z.string().min(1, 'City is required').trim(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  supplier: objectIdString,
  currency: z.string().min(1, 'Currency is required').default('INR'),
  entryFeeAdult: z.coerce.number().min(0).default(0),
  entryFeeKids: z.coerce.number().min(0).default(0),
  costMarkup: z.coerce.number().min(0).default(0),
  bookingType: z.enum(['On Request', 'Real Time']),
  termsAndConditions: z.string().optional(),
});

export const updateSightseeingRateSchema =
  createSightseeingRateSchema.partial();

export const sightseeingRateQuerySchema = z.object({
  sightseeingId: objectIdString.optional(),
  city: z.string().optional(),
  supplier: objectIdString.optional(),
  currency: z.string().optional(),
  bookingType: z.enum(['On Request', 'Real Time']).optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateSightseeingRateInput = z.infer<
  typeof createSightseeingRateSchema
>;
export type UpdateSightseeingRateInput = z.infer<
  typeof updateSightseeingRateSchema
>;
export type SightseeingRateQueryInput = z.infer<
  typeof sightseeingRateQuerySchema
>;
