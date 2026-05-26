// query.validation.ts
import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = z.string().regex(objectIdRegex, 'Invalid ObjectId');
const dateField = z.coerce.date().nullable().optional();
const nullableString = z.string().trim().nullable().optional();
const nullableNumber = z.number().nullable().optional();
const nullableObjectId = objectId.nullable().optional();

// ── sub-schemas ──────────────────────────────────────────────────────────────

export const PackageInfoSchema = z.object({
  queryType: z.enum(['FIT', 'GIT']).optional(),
  goingTo: nullableString,
  goingFrom: nullableString,
  specificDate: dateField,
  noOfDays: nullableNumber,
  travelers: nullableNumber,
  priceRange: nullableString,
  inclusions: nullableString,
  theme: nullableString,
  hotelPreference: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
    ])
    .nullable()
    .optional(),
  assignToOps: z.boolean().optional().default(false),
});

export const FlightInfoSchema = z.object({
  tripType: z.enum(['OneWay', 'RoundTrip', 'MultiCity']).optional(),
  isGroup: z.boolean().optional().default(false),
  sourceCity: nullableString,
  destinationCity: nullableString,
  departureDate: dateField,
  adults: z.number().min(1).optional().default(1),
  children: z.number().min(0).optional().default(0),
  infants: z.number().min(0).optional().default(0),
  class: z
    .enum(['Economy', 'Business', 'First', 'PremiumEconomy'])
    .optional()
    .default('Economy'),
  fareType: z
    .enum(['Regular', 'Student', 'SeniorCitizen', 'Direct'])
    .optional()
    .default('Regular'),
  preferredAirline: nullableString,
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemark: nullableString,
});

export const TransferInfoSchema = z.object({
  mode: z.enum(['Cab', 'Train']).optional(),
  tripType: z.enum(['OneWay', 'RoundTrip']).optional(),
  goingTo: nullableString,
  goingFrom: nullableString,
  pickupDateTime: dateField,
  noOfDays: nullableNumber,
  travelers: nullableNumber,
  pickupLocation: nullableString,
  preference: nullableString,
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemark: nullableString,
});

export const VisaInfoSchema = z.object({
  country: nullableString,
  visaCategory: nullableString,
  entryType: nullableString,
  dateOfTravel: dateField,
  adults: nullableNumber,
  child: nullableNumber,
  childWithFamily: nullableNumber,
  infant: nullableNumber,
  duration: nullableString,
  nationality: z.string().optional().default('India'),
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemark: nullableString,
});

export const HotelInfoSchema = z.object({
  destination: nullableString,
  checkIn: dateField,
  checkOut: dateField,
  nights: z.number().min(1).optional().default(1),
  travelers: z.number().min(1).optional().default(1),
  nationality: z.string().optional().default('India'),
  starRating: z.string().optional().default('Any'),
  foodPreference: nullableString,
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemarks: nullableString,
});

export const SightseeingInfoSchema = z.object({
  destination: nullableString,
  duration: nullableNumber,
  adults: z.number().min(1).optional().default(1),
  children: z.number().min(0).optional().default(0),
  nationality: z.string().optional().default('India'),
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemark: nullableString,
});

export const MiscellaneousInfoSchema = z.object({
  service: nullableString,
  destination: nullableString,
  selectDate: dateField,
  count: z.number().min(0).optional().default(0),
  leadSource: nullableString,
  assignToSales: nullableObjectId,
  assignToOps: z.boolean().optional().default(false),
  addRemark: nullableString,
});

// ── root query schema (discriminated union on requirementType) ───────────────

const BaseQuerySchema = z.object({
  lead: objectId,
  goingFrom: nullableString,
  goingTo: nullableString,
  travelDate: dateField,
  createdBy: nullableObjectId,
  status: z
    .enum(['new', 'inProcess', 'confirmed', 'rejected', 'lost'])
    .optional()
    .default('new'),
});

export const CreateQuerySchema = z.discriminatedUnion('requirementType', [
  BaseQuerySchema.extend({
    requirementType: z.literal('Package'),
    packageInfo: PackageInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Flight'),
    flightInfo: FlightInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Transfer'),
    transferInfo: TransferInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Visa'),
    visaInfo: VisaInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Hotel'),
    hotelInfo: HotelInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Sightseeing'),
    sightseeingInfo: SightseeingInfoSchema,
  }),
  BaseQuerySchema.extend({
    requirementType: z.literal('Miscellaneous'),
    miscellaneousInfo: MiscellaneousInfoSchema,
  }),
]);

export const UpdateQuerySchema = z.discriminatedUnion('requirementType', [
  BaseQuerySchema.extend({
    requirementType: z.literal('Package'),
    packageInfo: PackageInfoSchema.partial().optional(),
  }).partial(),

  BaseQuerySchema.extend({
    requirementType: z.literal('Flight'),
    flightInfo: FlightInfoSchema.partial().optional(),
  }).partial(),
]);
// ── inferred types ───────────────────────────────────────────────────────────

export type CreateQueryInput = z.infer<typeof CreateQuerySchema>;
export type UpdateQueryInput = z.infer<typeof UpdateQuerySchema>;
export type PackageInfoInput = z.infer<typeof PackageInfoSchema>;
export type FlightInfoInput = z.infer<typeof FlightInfoSchema>;
export type TransferInfoInput = z.infer<typeof TransferInfoSchema>;
export type VisaInfoInput = z.infer<typeof VisaInfoSchema>;
export type HotelInfoInput = z.infer<typeof HotelInfoSchema>;
export type SightseeingInfoInput = z.infer<typeof SightseeingInfoSchema>;
export type MiscellaneousInfoInput = z.infer<typeof MiscellaneousInfoSchema>;
