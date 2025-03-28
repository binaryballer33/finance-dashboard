const QUERY_KEYS = {
    GET_ALL_TRADES: ["trades"],
    GET_ALL_USERS: ["user"],

    GET_USER_BY_ID: (id: string) => ["user", { id }],

    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],

    YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-cards", { id }],

    // yu-gi-oh query keys
    YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
}

export default QUERY_KEYS
