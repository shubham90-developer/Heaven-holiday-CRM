import { z } from 'zod';

export const createLeadSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').trim(),
  companyName: z.string().trim().optional(),
  phone: z.string().min(10, 'Invalid phone number').trim(),
  email: z.string().email('Invalid email').trim().optional(),

  type: z.enum(['B2C', 'B2B']),
  source: z.string().min(1, 'Source is required').trim(),
  temperature: z
    .enum(['hot', 'warm', 'cold', 'no-status'])
    .default('no-status'),

  status: z
    .enum(['unassigned', 'inProcess', 'callback', 'archived'])
    .default('unassigned'),
  leadStage: z
    .enum(['new', 'followUp', 'confirmed', 'rejected', 'lost'])
    .default('new'),

  owner: z.string().optional(),
  remark: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

export const bulkAssignSchema = z.object({
  leadIds: z.array(z.string()).min(1, 'Select at least one lead'),
  owner: z.string().min(1, 'Owner is required'),
});

export const bulkArchiveSchema = z.object({
  leadIds: z.array(z.string()).min(1, 'Select at least one lead'),
});
