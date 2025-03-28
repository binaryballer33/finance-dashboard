import { z } from "zod"

// Define all possible filter operations
export type FilterOperation =
    | "afterDate"
    | "beforeDate"
    | "between"
    | "betweenDates"
    | "contains"
    | "eq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "neq"
    | "notContains"

// Zod schema for validating filter values
export const dateValueSchema = z.union([z.string(), z.number(), z.date()])

export const filterValueSchema = z.object({
    endDate: z.string().optional(),
    operation: z.enum([
        "afterDate",
        "beforeDate",
        "betweenDates",
        "contains",
        "eq",
        "gt",
        "gte",
        "lt",
        "lte",
        "neq",
        "notContains",
        "between",
    ]),
    secondValue: z.union([z.string(), z.number()]).optional(),
    value: z.union([z.string(), z.number()]),
})

export type ColumnFilter = z.infer<typeof filterValueSchema>
