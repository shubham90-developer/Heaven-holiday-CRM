import { z } from 'zod';

const statusEnum = z.enum(['active', 'deactive']);

// ─── Create ───────────────────────────────────────────────────────────────────

export const createEmailTemplateSchema = z.object({
  templateName: z.string().min(2, 'Template name is required').trim(),
  subject: z.string().min(1, 'Subject is required').trim(),
  messageBody: z.string().min(1, 'Message body is required'),
  status: statusEnum.default('active'),
});

// ─── Update ───────────────────────────────────────────────────────────────────

export const updateEmailTemplateSchema = createEmailTemplateSchema.partial();

// ─── Query ────────────────────────────────────────────────────────────────────

export const emailTemplateQuerySchema = z.object({
  templateName: z.string().optional(),
  subject: z.string().optional(),
  status: statusEnum.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateEmailTemplateInput = z.infer<
  typeof createEmailTemplateSchema
>;
export type UpdateEmailTemplateInput = z.infer<
  typeof updateEmailTemplateSchema
>;
export type EmailTemplateQueryInput = z.infer<typeof emailTemplateQuerySchema>;
