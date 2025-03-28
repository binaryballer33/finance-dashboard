import z from "zod"

export const SavedItemSchema = z.object({
    createdAt: z.string().optional(),
    id: z.string().min(1, { message: "Id Must Be At Least 1 Character Long" }),
    updatedAt: z.string().optional(),
    userId: z.string().min(1, { message: "User Id Must Be At Least 1 Character Long" }),
    yugiohCardId: z.number().int().gt(0, { message: "Yugioh Card Id Must Be Greater Than 0" }),
})

export type SavedItem = z.infer<typeof SavedItemSchema>
export type SavedItemWithoutId = Omit<SavedItem, "id">
