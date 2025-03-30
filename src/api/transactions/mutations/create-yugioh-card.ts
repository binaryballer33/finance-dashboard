// /* eslint-disable no-console */
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import axios from "axios"
// import toast from "react-hot-toast"
//
// import QUERY_KEYS from "@/api/query-keys"
// import { createCardRequestSchema } from "@/types/cards/card"
// import { YuGiOhCardWithoutId } from "@/types/cards/yu-gi-oh"
// import QUERY_ROUTES from "@/router/api-routes"
//
// export async function createYuGiOhCard(card: YuGiOhCardWithoutId) {
//     return (await axios.post(QUERY_ROUTES.CREATE_YUGIOH_CARD, card)).data
// }
//
// /*
//  * Id gets created after item is added to the database,
//  * need to invalidate the cache when creating the card because the id is not known until the card is created
//  * and if the cache is not invalidated, if you try to edit or delete that card with its id,
//  * you will get an error because the cache doesn't have the id because you didn't re-fetch the data from the database
//  */
// export default function useCreateYuGiOhCardMutation() {
//     const queryClient = useQueryClient()
//
//     return useMutation<YuGiOhCardWithoutId, Error, YuGiOhCardWithoutId>({
//         onMutate: async (card) => {
//             // if there's a validation error, the mutation will not be called and the onError will be called
//             createCardRequestSchema.parse(card)
//
//             toast.loading(`Attempting To Create Yu-Gi-Oh Card: ${card.name}`, {
//                 duration: 500,
//             })
//         },
//
//         mutationFn: (card: YuGiOhCardWithoutId) => createYuGiOhCard(card),
//
//         onSuccess(_data, card, _context) {
//             toast.success(`Successfully Created Yu-Gi-Oh Card: ${card.name} `)
//         },
//
//         onError(error, card, _context) {
//             console.error(`Error Creating Yu-Gi-Oh Card: ${error}`)
//             toast.error(`Error Creating Yu-Gi-Oh Card ${card.name}`)
//         },
//
//         onSettled: async (_data, _error, _card, _context) => {
//             await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_YU_GI_OH_CARDS })
//         },
//     })
// }
