import { z } from 'zod';

export const createTransportSchema = z.object({
  carType: z.string().min(1, 'Car type is required').trim(),
  carName: z.string().min(1, 'Car name is required').trim(),
  seatingCapacity: z.coerce
    .number()
    .int()
    .min(1, 'Seating capacity must be at least 1'),
  ac: z.enum(['Yes', 'No']).default('Yes'),
  vehicleNumber: z.string().min(1, 'Vehicle number is required').trim(),
  noOfVehicle: z.coerce
    .number()
    .int()
    .min(1, 'Number of vehicles must be at least 1'),
  image: z.string().optional(),
});

export const updateTransportSchema = createTransportSchema.partial();

export const transportQuerySchema = z.object({
  carType: z.string().optional(),
  ac: z.enum(['Yes', 'No']).optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateTransportInput = z.infer<typeof createTransportSchema>;
export type UpdateTransportInput = z.infer<typeof updateTransportSchema>;
export type TransportQueryInput = z.infer<typeof transportQuerySchema>;
