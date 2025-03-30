import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getTransactionById from "@/actions/transactions/queries/get-transaction-by-id"

export default function useGetTransactionByIdQuery(transactionId: string) {
    return useQuery({
        queryFn: async () => {
            const transaction = await getTransactionById(transactionId)
            if (!transaction) throw new Error("Transaction Not Found")
            return transaction
        },
        queryKey: QUERY_KEYS.GET_TRANSACTION_BY_ID(transactionId),
    })
}
