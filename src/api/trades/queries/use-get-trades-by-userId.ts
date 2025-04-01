import type { Trade } from "@prisma/client"

import VerifyUUIDSchema from "@/types/forms/verify-id"

import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getTradesByUserId from "@/actions/trades/queries/get-trades-by-userId"

export default function useGetTradesByUserIdQuery(userId: string, page?: number, limit?: number) {
    const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })

    return useQuery<Trade[]>({
        queryFn: async () => (await getTradesByUserId(validatedUserId, page, limit)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES_BY_USER_ID(validatedUserId),
    })
}
