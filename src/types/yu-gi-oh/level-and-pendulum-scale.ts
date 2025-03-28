import { z } from "zod"

// const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export const LevelSchema = z.union(
    [
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
        z.literal(6),
        z.literal(7),
        z.literal(8),
        z.literal(9),
        z.literal(10),
        z.literal(11),
        z.literal(12),
    ],
    { message: "Level Must Be Between 1 And 12" },
)

export const PendulumScaleSchema = z.union([z.literal(0), LevelSchema, z.literal(13)], {
    message: "Pendulum Scale Must Be Between 0 And 13",
})
