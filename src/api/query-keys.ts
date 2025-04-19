const QUERY_KEYS = {
    // creates
    CREATE_TRADE: ["create-trade"],
    CREATE_TRANSACTION: ["create-transaction"],
    CREATE_USER: ["create-user"],

    // deletes
    DELETE_EXPENSE_BY_ID: (id: string) => ["delete-expense", { id }],
    DELETE_INCOME_BY_ID: (id: string) => ["delete-income", { id }],
    DELETE_TRADE_BY_ID: (id: string) => ["delete-trade", { id }],
    DELETE_USER_BY_ID: (id: string) => ["delete-user", { id }],

    // get many
    GET_ALL_EXPENSES_BY_USER_ID: (userId: string) => ["expenses", { userId }],
    GET_ALL_INCOMES_BY_USER_ID: (userId: string) => ["incomes", { userId }],
    GET_ALL_TRADES: ["trades"],
    GET_ALL_TRADES_BY_USER_ID: (userId: string) => ["trades", { userId }],
    GET_ALL_TRANSACTIONS: ["transactions"],
    GET_ALL_USERS: ["user"],

    // get by id
    GET_EXPENSE_BY_ID: (id: string) => ["expense", { id }],
    GET_INCOME_BY_ID: (id: string) => ["income", { id }],
    GET_TRADE_BY_ID: (id: string) => ["trade", { id }],
    GET_USER_BY_ID: (id: string) => ["user", { id }],

    // updates
    UPDATE_EXPENSE_BY_ID: (id: string) => ["update-expense", { id }],
    UPDATE_INCOME_BY_ID: (id: string) => ["update-income", { id }],
    UPDATE_TRADE_BY_ID: (id: string) => ["update-trade", { id }],
    UPDATE_USER_BY_ID: (id: string) => ["user", { id }],
}

export default QUERY_KEYS
