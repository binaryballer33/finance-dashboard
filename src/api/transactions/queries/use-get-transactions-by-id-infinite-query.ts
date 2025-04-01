import type { Transaction } from "@prisma/client"

import QUERY_KEYS from "@/api/query-keys"
import { useInfiniteQuery } from "@tanstack/react-query"

import getAllTransactionsById from "@/actions/transactions/queries/get-all-transactions-by-id"

const TRANSACTIONS_PER_PAGE = 100

export default function useGetTransactionsInfiniteQuery(userId: string) {
    return useInfiniteQuery<Transaction[]>({
        // get the next page param
        getNextPageParam: (lastPage, allPages) => {
            // If the last page has fewer items than the limit, we've reached the end
            if (lastPage.length < TRANSACTIONS_PER_PAGE) return undefined

            // Otherwise, return the next page number
            return allPages.length
        },

        initialPageParam: 0,

        queryFn: async (context) => {
            const pageParam = context.pageParam as number

            // fetch the transactions
            const transactions = await getAllTransactionsById(userId, pageParam, TRANSACTIONS_PER_PAGE)

            // if the transactions are not found, throw an error
            if (!transactions) throw new Error("Failed To Fetch Transactions")

            return transactions
        },

        queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS_BY_USER_ID(userId),
    })
}
