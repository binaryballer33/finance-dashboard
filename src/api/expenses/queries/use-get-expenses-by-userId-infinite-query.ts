import type { Expense } from "@prisma/client"

import QUERY_KEYS from "@/api/query-keys"
import { useInfiniteQuery } from "@tanstack/react-query"

import getExpensesByUserId from "@/actions/expenses/queries/get-expenses-by-userId"

const RECORDS_PER_PAGE = 100

export default function useGetExpensesByUserIdInfiniteQuery(userId: string) {
    return useInfiniteQuery<Expense[]>({
        // get the next page param
        getNextPageParam: (lastPage, allPages) => {
            // If the last page has fewer items than the limit, we've reached the end
            if (lastPage.length < RECORDS_PER_PAGE) return undefined

            // Otherwise, return the next page number
            return allPages.length
        },

        initialPageParam: 0,

        queryFn: async (context) => {
            const pageParam = context.pageParam as number
            const expenses = await getExpensesByUserId(userId, pageParam, RECORDS_PER_PAGE)
            return expenses ?? []
        },

        queryKey: QUERY_KEYS.GET_ALL_EXPENSES_BY_USER_ID(userId),
    })
}
