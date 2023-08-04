import { z } from "zod"

export const BudgetSchema = z.object({
    bills: z.number(),
    customFields: z.object({
        label: z.string(),
        value: z.number(),
    }).array(),
    id: z.string().optional(),
    internet: z.number(),
    metroCard: z.number(),
    monthlyFood: z.number(),
    name: z.string(),
    rent: z.number(),
    total: z.number()
});

export type BudgetDTO = z.infer<typeof BudgetSchema>;