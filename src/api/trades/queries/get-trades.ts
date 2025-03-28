import type { Trade } from "@prisma/client"

import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getTrades from "@/actions/trades/queries/get-trades"

export default function useGetTradesQuery(page?: number, limit?: number) {
    return useQuery<Trade[]>({
        queryFn: async () => (await getTrades(page, limit)) ?? [],
        queryKey: QUERY_KEYS.GET_ALL_TRADES,
    })
}
