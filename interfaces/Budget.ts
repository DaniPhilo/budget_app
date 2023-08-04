import { z } from "zod"

export const BudgetSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    rent: z.number(),
    metroCard: z.number(),
    monthlyFood: z.number(),
    customFields: z.object({
        label: z.string(),
        value: z.number(),
    }).array(),
});

export type BudgetDTO = z.infer<typeof BudgetSchema>;