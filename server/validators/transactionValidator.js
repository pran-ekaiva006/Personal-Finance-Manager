import { z } from 'zod';

export const addTransactionSchema = z.object({
  type: z.enum(['Income', 'Expense'], {
    required_error: 'Type is required',
    invalid_type_error: "Type must be 'Income' or 'Expense'",
  }),
  category: z
    .string({ required_error: 'Category is required' })
    .min(1, 'Category cannot be empty'),
  amount: z
    .number({ required_error: 'Amount is required', invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be a positive number'),
  description: z
    .string()
    .max(200, 'Description must be at most 200 characters')
    .optional()
    .nullable(),
  isRecurring: z.boolean().optional(),
  frequency: z.enum(['monthly', 'weekly']).optional().nullable(),
});
