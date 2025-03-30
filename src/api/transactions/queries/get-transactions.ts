import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getTransactions from "@/actions/transactions/queries/get-transactions"

export default function useGetTransactionsQuery() {
    return useQuery({
        queryFn: async () => {
            const transactions = await getTransactions()
            return transactions ?? []
        },
        queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS,
    })
}
