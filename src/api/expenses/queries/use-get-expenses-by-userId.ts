import type { Expense } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getExpensesByUserId from "@/actions/expenses/queries/get-expenses-by-userId"

export default function useGetExpensesByUserIdQuery(userId: string, page?: number, limit?: number) {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    return useQuery<Expense[]>({
        queryFn: async () => (await getExpensesByUserId(validatedUserId, page, limit)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(validatedUserId),
    })
}
