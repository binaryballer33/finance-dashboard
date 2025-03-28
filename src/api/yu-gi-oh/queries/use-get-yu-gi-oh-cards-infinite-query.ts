import type { YugiohCard } from "@prisma/client"

import QUERY_KEYS from "@/api/query-keys"
import { useInfiniteQuery } from "@tanstack/react-query"

import getYugiohCards from "@/actions/yu-gi-oh/queries/get-yu-gi-oh-cards"

const CARDS_PER_PAGE = 100

export default function useGetYugiohCardsInfiniteQuery() {
    return useInfiniteQuery<YugiohCard[]>({
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

            // fetch the yugioh cards
            const yugiohCards = await getYugiohCards(pageParam, CARDS_PER_PAGE)

            // if the cards are not found, throw an error
            if (!yugiohCards) throw new Error("Failed to fetch Yu-Gi-Oh cards")

            return yugiohCards
        },

        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
    })
}
