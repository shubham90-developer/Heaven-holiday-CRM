import { z } from 'zod';

export const updateBookingSchema = z.object({
  paidAmount: z.number().min(0).optional(),
  paymentStatus: z.enum(['pending', 'partial', 'completed']).optional(),
  status: z.enum(['confirmed', 'cancelled']).optional(),
});
