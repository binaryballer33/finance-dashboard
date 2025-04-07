// noinspection ES6ConvertVarToLetConst

import { PrismaClient } from "@prisma/client"

import { NODE_ENV } from "@/lib/secrets"

declare global {
    // eslint-disable-next-line no-var,vars-on-top
    var prisma: PrismaClient | undefined
}

const prisma =
    global.prisma ||
    new PrismaClient({ log: NODE_ENV === "development" ? ["info", "query", "error", "warn"] : ["error"] })

export default prisma

if (NODE_ENV !== "production") global.prisma = prisma
