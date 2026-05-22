import { z } from 'zod';

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const seasonSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  markUpType: z.enum(['Fixed %', 'Percentage']).default('Fixed %'),
  b2c: z.coerce.number().min(0).default(0),
  b2b: z.coerce.number().min(0).default(0),
});

const pointToPointSubTypes = z
  .array(
    z.enum([
      'local_city_tour',
      'airport_transfer',
      'railway_station_transfer',
      'bus_stand_transfer',
      'port_transfer',
      'meal_transfer',
    ]),
  )
  .default([]);

// ── Base (common to all categories) ──────────────────────────────────────────

const baseSchema = z.object({
  vehicleCostType: z.enum(['normal', 'km_based']).default('normal'),
  currency: z.string().default('INR'),
  seasons: z.array(seasonSchema).default([]),
  isWebsite: z.boolean().default(false),
  description: z.string().optional(),
});

// ── Category-specific schemas ─────────────────────────────────────────────────

// Shared by itinerary, point_to_point, sic
const withRouteFields = z.object({
  transportType: z.enum(['one_way', 'round_trip']),
  startCity: z.string().min(1, 'Start city is required').trim(),
  destinationCity: z.string().min(1, 'Destination city is required').trim(),
  routeName: z.string().min(1, 'Route name is required').trim(),
  pickupPointArea: z.string().optional(),
  dropPointArea: z.string().optional(),
  forWithHotelBYO: z.string().optional(),
  forLandOnlyBYO: z.string().optional(),
});

// Shared by itinerary & point_to_point
const withCityFields = z.object({
  citiesIncluded: z.string().optional(),
  noOfDays: z.string().optional(),
  destinationsCovered: z.string().optional(),
  sightseeingCovered: z.string().optional(),
});

const itinerarySchema = baseSchema
  .merge(withRouteFields)
  .merge(withCityFields)
  .extend({
    category: z.literal('itinerary'),
    subTypes: z.array(z.string()).default([]),
  });

const pointToPointSchema = baseSchema
  .merge(withRouteFields)
  .merge(withCityFields)
  .extend({
    category: z.literal('point_to_point'),
    subTypes: pointToPointSubTypes,
  });

const sicSchema = baseSchema.merge(withRouteFields).extend({
  category: z.literal('sic'),
  subTypes: z.array(z.string()).default([]),
});

const perDaySchema = baseSchema.extend({
  category: z.literal('per_day'),
  subTypes: z.array(z.string()).default([]),
  perDayScopeType: z.enum(['state', 'country']).optional(),
  perDayScopeValue: z.string().optional(),
});

// ── Discriminated union ───────────────────────────────────────────────────────

export const createTransportRouteSchema = z.discriminatedUnion('category', [
  itinerarySchema,
  pointToPointSchema,
  sicSchema,
  perDaySchema,
]);

export const updateTransportRouteSchema = z.object({
  transportType: z.enum(['one_way', 'round_trip']).optional(),
  startCity: z.string().trim().optional(),
  destinationCity: z.string().trim().optional(),
  routeName: z.string().trim().optional(),
  citiesIncluded: z.string().optional(),
  noOfDays: z.string().optional(),
  destinationsCovered: z.string().optional(),
  sightseeingCovered: z.string().optional(),
  description: z.string().optional(),
  pickupPointArea: z.string().optional(),
  dropPointArea: z.string().optional(),
  forWithHotelBYO: z.string().optional(),
  forLandOnlyBYO: z.string().optional(),
  perDayScopeType: z.enum(['state', 'country']).optional(),
  perDayScopeValue: z.string().optional(),
  vehicleCostType: z.enum(['normal', 'km_based']).optional(),
  currency: z.string().optional(),
  seasons: z.array(seasonSchema).optional(),
  subTypes: z.array(z.string()).optional(),
  isWebsite: z.boolean().optional(),
});

export const transportRouteQuerySchema = z.object({
  category: z
    .enum(['itinerary', 'point_to_point', 'sic', 'per_day'])
    .optional(),
  startCity: z.string().optional(),
  destinationCity: z.string().optional(),
  isWebsite: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateTransportRouteInput = z.infer<
  typeof createTransportRouteSchema
>;
export type UpdateTransportRouteInput = z.infer<
  typeof updateTransportRouteSchema
>;
export type TransportRouteQueryInput = z.infer<
  typeof transportRouteQuerySchema
>;
