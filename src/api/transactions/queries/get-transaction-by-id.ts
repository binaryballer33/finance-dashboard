import VerifyUUIDSchema from "@/types/forms/verify-id"

import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getTransactionById from "@/actions/transactions/queries/get-transaction-by-id"

export default function useGetTransactionByIdQuery(transactionId: string) {
    const { id: validatedTransactionId } = VerifyUUIDSchema.parse({ id: transactionId })

    return useQuery({
        queryFn: async () => {
            const transaction = await getTransactionById(validatedTransactionId)
            if (!transaction) throw new Error("Transaction Not Found")
            return transaction
        },
        queryKey: QUERY_KEYS.GET_TRANSACTION_BY_ID(validatedTransactionId),
    })
}
