// validations/role.validation.ts

import { z } from 'zod';

export const createRoleSchema = z.object({
  title: z
    .string('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be under 100 characters')
    .trim(),
  description: z
    .string()
    .max(500, 'Description must be under 500 characters')
    .trim()
    .optional(),
  roleType: z.enum(['superAdmin', 'reportManager'], {
    message: 'Invalid role type',
  }),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const updateRoleSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100)
    .trim()
    .optional(),
  description: z.string().max(500).trim().optional(),
  roleType: z.enum(['superAdmin', 'reportManager']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export const roleIdSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
