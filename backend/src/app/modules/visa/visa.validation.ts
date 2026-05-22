import { z } from 'zod';

const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId');

// ─── Enums ────────────────────────────────────────────────────────────────────

const visaTypeEnum = z.enum([
  'Tourist',
  'Business',
  'Student',
  'Work',
  'Transit',
  'Medical',
  'Conference',
  'Other',
]);

const visaCategoryEnum = z.enum([
  'Tourism',
  'Business',
  'Education',
  'Employment',
  'Family',
  'Medical',
  'Other',
]);

const entryTypeEnum = z.enum([
  'Single Entry',
  'Double Entry',
  'Multiple Entry',
]);

const markUpTypeEnum = z.enum(['Amount', 'Percentage']);

const marketPlaceEnum = z.enum(['MY B2C', 'MY B2B']);

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const embassyFeeSchema = z.object({
  currency: z.string().default('INR'),
  adult: z.number().min(0).default(0),
  child: z.number().min(0).default(0),
  childAge: z.number().int().min(0).default(0),
  infant: z.number().min(0).default(0),
});

const markUpSchema = z.object({
  marketPlace: marketPlaceEnum,
  currency: z.string().default('INR'),
  markUpType: markUpTypeEnum.default('Amount'),
  adult: z.number().min(0).default(0),
  child: z.number().min(0).default(0),
  infant: z.number().min(0).default(0),
});

const serviceProviderSchema = z.object({
  display: z.boolean().default(false),
  serviceName: z.string().min(1, 'Service name is required').trim(),
  currency: z.string().default('INR'),
  fees: z.number().min(0).default(0),
  markup: z.number().min(0).default(0),
  taxable: z.boolean().default(false),
});

// ─── Create ───────────────────────────────────────────────────────────────────

export const createVisaSchema = z.object({
  // Basic Info
  travelersNationality: z
    .string()
    .min(1, 'Travelers nationality is required')
    .trim(),
  countriesCovered: z
    .array(z.string().trim())
    .min(1, 'At least one country must be covered'),

  // Visa Details
  visaName: z.string().min(2, 'Visa name is required').trim(),
  visaType: visaTypeEnum.optional(),
  visaCategory: visaCategoryEnum.optional(),
  entryType: entryTypeEnum.default('Single Entry'),
  processingTime: z.number().int().min(0).optional(), // days
  passportExpire: z.number().int().min(0).optional(), // days
  validityOfVisa: z.number().int().min(0).optional(), // days
  duration: z.string().trim().optional(),
  supplier: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid Supplier ObjectId')
    .optional(),

  // Embassy Fee
  embassyFee: embassyFeeSchema.default({
    currency: 'INR',
    adult: 0,
    child: 0,
    childAge: 0,
    infant: 0,
  }),

  // Mark Up — must include both MY B2C and MY B2B rows
  markUp: z
    .array(markUpSchema)
    .length(2, 'Mark up must have exactly 2 entries (MY B2C and MY B2B)')
    .default([
      {
        marketPlace: 'MY B2C',
        currency: 'INR',
        markUpType: 'Amount',
        adult: 0,
        child: 0,
        infant: 0,
      },
      {
        marketPlace: 'MY B2B',
        currency: 'INR',
        markUpType: 'Amount',
        adult: 0,
        child: 0,
        infant: 0,
      },
    ]),

  // Service Providers — dynamic, can be empty
  serviceProviders: z.array(serviceProviderSchema).default([]),
});

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateVisaSchema = createVisaSchema.partial();

// ─── Query ────────────────────────────────────────────────────────────────────

export const visaQuerySchema = z.object({
  visaName: z.string().optional(),
  travelersNationality: z.string().optional(),
  countriesCovered: z.string().optional(),
  visaType: visaTypeEnum.optional(),
  visaCategory: visaCategoryEnum.optional(),
  entryType: entryTypeEnum.optional(),
  supplier: z.string().optional(),
  visaId: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateVisaInput = z.infer<typeof createVisaSchema>;
export type UpdateVisaInput = z.infer<typeof updateVisaSchema>;
export type VisaQueryInput = z.infer<typeof visaQuerySchema>;
