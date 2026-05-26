import { z } from 'zod';

export const createLeadSourceSchema = z.object({
  leadSourceName: z.string().min(1, 'Lead source name is required').trim(),
  status: z.boolean().default(true),
});

export const updateLeadSourceSchema = createLeadSourceSchema.partial();

export const leadSourceQuerySchema = z.object({
  status: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateLeadSourceInput = z.infer<typeof createLeadSourceSchema>;
export type UpdateLeadSourceInput = z.infer<typeof updateLeadSourceSchema>;
export type LeadSourceQueryInput = z.infer<typeof leadSourceQuerySchema>;
