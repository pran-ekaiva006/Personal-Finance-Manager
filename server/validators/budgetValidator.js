import { z } from 'zod';

export const budgetSchema = z.object({
  category: z
    .string({ required_error: 'Category is required' })
    .min(1, 'Category cannot be empty'),
  amount: z
    .number({ required_error: 'Amount is required', invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be a positive number'),
});
