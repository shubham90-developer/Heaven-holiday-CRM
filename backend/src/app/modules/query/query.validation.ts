import { z } from 'zod';

export const createQuerySchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),

  requirementType: z.enum([
    'package',
    'flight',
    'hotel',
    'visa',
    'transfer',
    'sightseeing',
    'miscellaneous',
  ]),
  queryType: z.enum(['FIT', 'GIT']),

  goingTo: z.string().min(1, 'Destination is required').trim(),
  goingFrom: z.string().trim().optional(),
  travelDate: z.string().optional(), // ISO string from frontend
  noOfDays: z.number().optional(),
  travelers: z.number().min(1).default(1),

  priceRange: z.string().trim().optional(),
  inclusions: z.array(z.string()).optional(),
  theme: z.string().trim().optional(),
  hotelPreference: z.number().min(1).max(5).optional(),
  foodPreference: z.string().trim().optional(),

  stage: z
    .enum([
      'queryCreated',
      'proposalPending',
      'proposalSent',
      'confirmed',
      'rejected',
    ])
    .default('queryCreated'),
  temperature: z
    .enum(['hot', 'warm', 'cold', 'no-status'])
    .default('no-status'),

  assignedSales: z.string().optional(),
  assignedOps: z.string().optional(),
  remark: z.string().optional(),
});

export const updateQuerySchema = createQuerySchema.partial();
