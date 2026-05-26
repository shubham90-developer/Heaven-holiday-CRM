import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = () => z.string().regex(objectIdRegex, 'Invalid ObjectId');

const salutationSchema = z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']).optional();

const phoneSchema = z.string().min(10, 'Invalid phone number').trim();

const emailSchema = z.string().email('Invalid email').trim().optional();

const temperatureSchema = z
  .enum(['hot', 'warm', 'cold', 'no-status'])
  .default('no-status');

const statusSchema = z
  .enum(['unassigned', 'inProcess', 'callback', 'archived'])
  .default('unassigned');

const leadStageSchema = z
  .enum(['new', 'followUp', 'confirmed', 'rejected', 'lost'])
  .default('new');

const b2cLeadSchema = z.object({
  type: z.literal('B2C'),

  salutation: salutationSchema,
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().trim().optional(),
  customerName: z.string().trim().optional(), // auto-derived in pre-save

  phone: phoneSchema,
  email: emailSchema,

  leadSource: objectId(),
  temperature: temperatureSchema,
  status: statusSchema,
  leadStage: leadStageSchema,

  owner: objectId().optional(),
  remarks: z.string().trim().optional(),
});

const b2bLeadSchema = z.object({
  type: z.literal('B2B'),
  agentType: z.enum(['Agency', 'Corporate']),

  companyName: z.string().min(1, 'Company name is required').trim(),

  salutation: salutationSchema,
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  customerName: z.string().trim().optional(), // auto-derived in pre-save

  phone: phoneSchema,
  email: emailSchema,

  leadSource: objectId(),
  temperature: temperatureSchema,
  status: statusSchema,
  leadStage: leadStageSchema,

  owner: objectId().optional(),
  remarks: z.string().trim().optional(),
});

export const createLeadSchema = z.discriminatedUnion('type', [
  b2cLeadSchema,
  b2bLeadSchema,
]);

// ── Update (all fields optional but union still discriminated) ────────────────

export const updateLeadSchema = z.discriminatedUnion('type', [
  b2cLeadSchema.partial().extend({ type: z.literal('B2C') }),
  b2bLeadSchema.partial().extend({ type: z.literal('B2B') }),
]);

// ── Bulk operations ───────────────────────────────────────────────────────────

export const bulkAssignSchema = z.object({
  leadIds: z.array(objectId()).min(1, 'Select at least one lead'),
  owner: objectId(),
});

export const bulkArchiveSchema = z.object({
  leadIds: z.array(objectId()).min(1, 'Select at least one lead'),
});

// ── Inferred types ────────────────────────────────────────────────────────────

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type BulkAssignInput = z.infer<typeof bulkAssignSchema>;
export type BulkArchiveInput = z.infer<typeof bulkArchiveSchema>;
