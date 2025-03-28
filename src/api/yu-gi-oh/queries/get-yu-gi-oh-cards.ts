import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getYugiohCards from "@/actions/yu-gi-oh/queries/get-yu-gi-oh-cards"

export default function useGetYuGiOhCardsQuery() {
    return useQuery({
        queryFn: async () => {
            const cards = await getYugiohCards()
            return cards ?? []
        },
        queryKey: QUERY_KEYS.YU_GI_OH_CARDS,
    })
}
