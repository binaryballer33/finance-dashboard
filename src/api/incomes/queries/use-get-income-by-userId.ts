import type { Income } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getIncomeByUserId from "@/actions/income/queries/get-income-by-userId"

export default function useGetIncomeByUserIdQuery(userId: string, page?: number, limit?: number) {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    return useQuery<Income[]>({
        queryFn: async () => (await getIncomeByUserId(validatedUserId, page, limit)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_INCOMES_BY_USER_ID(validatedUserId),
    })
}
