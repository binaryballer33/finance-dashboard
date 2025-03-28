import QUERY_KEYS from "@/api/query-keys"
import { useQuery } from "@tanstack/react-query"

import getYugiohCardById from "@/actions/yu-gi-oh/queries/get-yu-gi-oh-card-by-id"

export default function useGetYugiohCardByIdQuery(cardId: number) {
    return useQuery({
        queryFn: async () => {
            const card = await getYugiohCardById(cardId)
            if (!card) throw new Error("Card not found")
            return card
        },
        queryKey: QUERY_KEYS.YU_GI_OH_CARD_BY_ID(cardId),
    })
}
