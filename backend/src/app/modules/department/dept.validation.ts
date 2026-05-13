// department.validation.ts
import { z } from 'zod';

export const createDepartmentSchema = z.object({
  name: z.string().min(1, 'Department name is required').trim(),
  is_operations: z.boolean().default(false),
  status: z.enum(['active', 'deactive']).default('active'),
});

export const updateDepartmentSchema = z.object({
  name: z.string().min(1, 'Department name is required').trim().optional(),
  is_operations: z.boolean().optional(),
  status: z.enum(['active', 'deactive']).optional(),
});
