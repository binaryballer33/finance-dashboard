import type { Transaction } from "@prisma/client"

import QUERY_KEYS from "@/api/query-keys"
import { useInfiniteQuery } from "@tanstack/react-query"

import getTransactions from "@/actions/transactions/queries/get-transactions"

const CARDS_PER_PAGE = 100

export default function useGetTransactionsInfiniteQuery() {
    return useInfiniteQuery<Transaction[]>({
        // get the next page param
        getNextPageParam: (lastPage, allPages) => {
            // If the last page has fewer items than the limit, we've reached the end
            if (lastPage.length < CARDS_PER_PAGE) return undefined

            // Otherwise, return the next page number
            return allPages.length
        },

        initialPageParam: 0,

        queryFn: async (context) => {
            const pageParam = context.pageParam as number

            // fetch the transactions
            const transactions = await getTransactions(pageParam, CARDS_PER_PAGE)

            // if the transactions are not found, throw an error
            if (!transactions) throw new Error("Failed To Fetch Transactions")

            return transactions
        },

        queryKey: QUERY_KEYS.GET_ALL_TRANSACTIONS,
    })
}
