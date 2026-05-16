import { z } from 'zod';

export const createProposalSchema = z.object({
  queryId: z.string().min(1, 'Query ID is required'),
  leadId: z.string().min(1, 'Lead ID is required'),

  packageDetails: z
    .object({
      hotels: z.array(z.string()).optional(),
      flights: z.array(z.string()).optional(),
      sightseeing: z.array(z.string()).optional(),
      transfers: z.array(z.string()).optional(),
      notes: z.string().optional(),
    })
    .optional(),

  basePrice: z.number().min(0),
  markup: z.number().min(0).default(0),
  totalPrice: z.number().min(0),

  status: z.enum(['draft', 'sent', 'accepted', 'rejected']).default('draft'),
});

export const updateProposalSchema = createProposalSchema.partial();
