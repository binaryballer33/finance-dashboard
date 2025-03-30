const QUERY_KEYS = {
    // creates
    CREATE_TRADE: ["create-trade"],
    CREATE_TRANSACTION: ["create-transaction"],
    CREATE_USER: ["create-user"],

    // deletes
    DELETE_TRADE_BY_ID: (id: string) => ["delete-trade", { id }],
    DELETE_TRANSACTION_BY_ID: (id: string) => ["delete-transaction", { id }],
    DELETE_USER_BY_ID: (id: string) => ["delete-user", { id }],

    // get many
    GET_ALL_TRADES: ["trades"],
    GET_ALL_TRANSACTIONS: ["transactions"],
    GET_ALL_USERS: ["user"],

    // get by id
    GET_TRADE_BY_ID: (id: string) => ["trade", { id }],
    GET_TRANSACTION_BY_ID: (id: string) => ["transaction", { id }],
    GET_USER_BY_ID: (id: string) => ["user", { id }],

    // updates
    UPDATE_TRADE_BY_ID: (id: string) => ["update-trade", { id }],
    UPDATE_TRANSACTION_BY_ID: (id: string) => ["update-transaction", { id }],
    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],
}

export default QUERY_KEYS
