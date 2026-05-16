import { z } from 'zod';

export const createFollowUpSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  queryId: z.string().optional(),

  activityType: z.enum(['call', 'todo']),
  direction: z.enum(['outgoing', 'incoming']).optional(),
  outcome: z.enum(['answered', 'unanswered', 'notReachable']).optional(),
  nextAction: z
    .enum(['callBack', 'todo', 'meeting', 'createQuery', 'lost'])
    .optional(),

  followUpDate: z.string().min(1, 'Follow up date is required'),
  followUpTime: z.string().min(1, 'Follow up time is required'),
  remindBefore: z.number().default(15),

  assignedTo: z.string().min(1, 'Assigned to is required'),
  customerId: z.string().min(1, 'Customer is required'),
  customerType: z.enum(['B2C', 'B2B']),

  details: z.string().optional(),
  isCompleted: z.boolean().default(false),
});

export const updateFollowUpSchema = createFollowUpSchema.partial();
