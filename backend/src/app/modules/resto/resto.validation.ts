import { z } from 'zod';

// ── Rate schema ────────────────────────────────────────────────────────────
const rateSchema = z.object({
  rateType: z.string().min(1, 'Rate type is required').trim(),
  amount: z
    .number({
      error: (issue) =>
        issue.code === 'invalid_type'
          ? 'Amount must be a number'
          : 'Amount is required',
    })
    .min(0, 'Amount must be >= 0'),
  currency: z.string().min(1, 'Currency is required').default('INR'),
});

// ── Create ─────────────────────────────────────────────────────────────────
export const createRestaurantSchema = z.object({
  city: z.string().min(1, 'City is required').trim(),
  address: z.string().min(1, 'Address is required').trim(),
  restaurantArea: z.string().min(1, 'Restaurant area is required').trim(),
  supplierName: z.string().min(1, 'Supplier name is required').trim(),
  currency: z.string().default('INR'),
  isPreferred: z.boolean().default(false),
  mealName: z.string().min(1, 'Meal name is required').trim(),
  isVeg: z.boolean().default(false),
  isNonVeg: z.boolean().default(false),
  isAI: z.boolean().default(false),
  rates: z.array(rateSchema).default([]),
  isActive: z.boolean().default(true),
});

// ── Update ─────────────────────────────────────────────────────────────────
export const updateRestaurantSchema = createRestaurantSchema.partial();

// ── Query ──────────────────────────────────────────────────────────────────
export const restaurantQuerySchema = z.object({
  city: z.string().optional(),
  restaurantArea: z.string().optional(),
  supplierName: z.string().optional(),
  restaurantId: z.string().optional(),
  isPreferred: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  isVeg: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  isNonVeg: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  isAI: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ── Inferred Types ─────────────────────────────────────────────────────────
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
export type RestaurantQueryInput = z.infer<typeof restaurantQuerySchema>;
