import { z } from 'zod';

export const createTermsConditionsSchema = z.object({
  tcDomesticHolidays: z.string().default(''),
  tcInternationalHolidays: z.string().default(''),
  cancellationPolicyDomesticHolidays: z.string().default(''),
});

export const updateTermsConditionsSchema =
  createTermsConditionsSchema.partial();

export type CreateTermsConditionsInput = z.infer<
  typeof createTermsConditionsSchema
>;
export type UpdateTermsConditionsInput = z.infer<
  typeof updateTermsConditionsSchema
>;
