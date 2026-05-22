import { z } from 'zod';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ');
const wordCount = (text: string) =>
  stripHtml(text).trim().split(/\s+/).filter(Boolean).length;

export const createItinerarySchema = z.object({
  startCity: z.string().min(1, 'Start city is required').trim(),

  destinationCity: z.string().min(1, 'Destination city is required').trim(),

  title: z
    .string()
    .min(1, 'Title is required')
    .trim()
    .refine((val) => wordCount(val) <= 100, 'Title must not exceed 100 words'),

  description: z
    .string()
    .min(1, 'Description is required')
    .trim()
    .refine(
      (val) => wordCount(val) <= 750,
      'Description must not exceed 750 words',
    ),
});

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateItinerarySchema = createItinerarySchema.partial();

// ─── Query ────────────────────────────────────────────────────────────────────

export const itineraryQuerySchema = z.object({
  startCity: z.string().optional(),
  destinationCity: z.string().optional(),
  title: z.string().optional(),
  itineraryId: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateItineraryInput = z.infer<typeof createItinerarySchema>;
export type UpdateItineraryInput = z.infer<typeof updateItinerarySchema>;
export type ItineraryQueryInput = z.infer<typeof itineraryQuerySchema>;
