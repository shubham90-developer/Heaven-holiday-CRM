import { z } from 'zod';

// ─── Create ───────────────────────────────────────────────────────────────────

export const createAreaSchema = z.object({
  city: z.string().min(1, 'City is required').trim(),
  area: z.string().min(1, 'Area is required').trim(),
  isActive: z.boolean().default(true),
});

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateAreaSchema = createAreaSchema.partial();

// ─── Query ────────────────────────────────────────────────────────────────────

export const areaQuerySchema = z.object({
  city: z.string().optional(),
  area: z.string().optional(),
  areaId: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateAreaInput = z.infer<typeof createAreaSchema>;
export type UpdateAreaInput = z.infer<typeof updateAreaSchema>;
export type AreaQueryInput = z.infer<typeof areaQuerySchema>;
