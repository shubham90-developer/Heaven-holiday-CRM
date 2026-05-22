import { z } from 'zod';

const guideRateSchema = z.object({
  currency: z.string().min(1, 'Currency is required').default('INR'),
  perDayRate: z.coerce.number().min(0).default(0),
  overnightCharges: z.coerce.number().min(0).default(0),
  markUpType: z.enum(['Percentage', 'Fixed']).default('Percentage'),
  markUp: z.coerce.number().min(0).default(0),
  taxes: z.coerce.number().min(0).default(0),
  total: z.coerce.number().min(0).default(0),
});

export const createGuideSchema = z.object({
  guideName: z.string().min(1, 'Guide name is required').trim(),
  destination: z.string().min(1, 'Destination is required').trim(),
  mobileCountryCode: z.string().min(1).default('+91'),
  mobileNumber: z.string().min(1, 'Mobile number is required').trim(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  languagesKnown: z.string().min(1, 'Languages known is required').trim(),
  shortDescription: z.string().optional(),
  image: z.string().optional(),
  rates: z.array(guideRateSchema).default([]),
});

export const updateGuideSchema = createGuideSchema.partial();

export const guideQuerySchema = z.object({
  destination: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateGuideInput = z.infer<typeof createGuideSchema>;
export type UpdateGuideInput = z.infer<typeof updateGuideSchema>;
export type GuideQueryInput = z.infer<typeof guideQuerySchema>;
