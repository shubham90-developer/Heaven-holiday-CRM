import { z } from 'zod';

const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId');

// ─── Enums ────────────────────────────────────────────────────────────────────

const difficultyLevelEnum = z.enum(['Easy', 'Moderate', 'Hard', 'Extreme']);

const seasonEnum = z.enum([
  'Summer',
  'Winter',
  'Monsoon',
  'Spring',
  'Autumn',
  'All Season',
]);

const dayOfWeekEnum = z.enum([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

const popularityEnum = z.enum(['Low', 'Medium', 'High', 'Very High']);

// ─── Create ───────────────────────────────────────────────────────────────────

export const createSightseeingSchema = z.object({
  // Basic Info
  country: z.string().min(1, 'Country is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  sightseeingName: z.string().min(2, 'Sightseeing name is required').trim(),
  latitude: z.coerce.number().default(0),
  longitude: z.coerce.number().default(0),
  address: z.string().trim().optional(),

  // Image — URL stored after multer upload
  image: z.string().optional(),

  // Rich Text Sections
  details: z.string().optional(),
  otherInclusions: z.string().optional(),
  advisory: z.string().optional(),
  cancellationPolicy: z.string().optional(),
  refundPolicy: z.string().optional(),
  confirmationPolicy: z.string().optional(),
  termsAndConditions: z.string().optional(),

  // Other Details
  category: z.string().trim().optional(),
  activities: z
    .union([z.array(z.string().trim()), z.string().transform((v) => [v])])
    .default([]),
  difficultyLevel: difficultyLevelEnum.optional(),
  season: seasonEnum.optional(),
  daysOfWeek: z
    .union([z.array(dayOfWeekEnum), dayOfWeekEnum.transform((v) => [v])])
    .default([]),
  popularity: popularityEnum.optional(),
  thingsToCarry: z
    .union([z.array(z.string().trim()), z.string().transform((v) => [v])])
    .default([]),
  pickUpPoint: z.string().trim().optional(),
  pickUpTime: z.string().optional(),

  // Pax
  paxMin: z.coerce.number().int().min(0).optional(),
  paxMax: z.coerce.number().int().min(0).optional(),

  // Duration
  durationHours: z.coerce.number().int().min(0).default(0),
  durationMinutes: z.coerce.number().int().min(0).max(59).default(0),

  // Allowed Age Group
  allowedAgeFrom: z.coerce.number().int().min(0).default(0),
  allowedAgeTo: z.coerce.number().int().min(0).default(0),
});

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateSightseeingSchema = createSightseeingSchema.partial();

// ─── Query ────────────────────────────────────────────────────────────────────

export const sightseeingQuerySchema = z.object({
  sightseeingName: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  difficultyLevel: difficultyLevelEnum.optional(),
  season: seasonEnum.optional(),
  popularity: popularityEnum.optional(),
  sightseeingId: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSightseeingInput = z.infer<typeof createSightseeingSchema>;
export type UpdateSightseeingInput = z.infer<typeof updateSightseeingSchema>;
export type SightseeingQueryInput = z.infer<typeof sightseeingQuerySchema>;
