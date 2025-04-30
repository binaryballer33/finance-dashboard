const QUERY_KEYS = {
    // creates
    CREATE_EXPENSE: ["create-expense"],
    CREATE_INCOME: ["create-income"],
    CREATE_TRADE: ["create-trade"],
    CREATE_USER: ["create-user"],

    // deletes
    DELETE_EXPENSE: ["delete-expense"],
    DELETE_INCOME: ["delete-income"],
    DELETE_TRADE: ["delete-trade"],
    DELETE_USER: ["delete-user"],

    // get many
    GET_ALL_EXPENSES_BY_USER_ID: (userId: string) => ["expenses", { userId }],
    GET_ALL_INCOMES_BY_USER_ID: (userId: string) => ["incomes", { userId }],
    GET_ALL_TRADES: ["trades"],
    GET_ALL_TRADES_BY_USER_ID: (userId: string) => ["trades", { userId }],
    GET_ALL_USERS: ["user"],

    // get by id
    GET_EXPENSE_BY_ID: (id: string) => ["expense", { id }],
    GET_INCOME_BY_ID: (id: string) => ["income", { id }],
    GET_TRADE_BY_ID: (id: string) => ["trade", { id }],
    GET_USER_BY_ID: (id: string) => ["user", { id }],

    // updates
    UPDATE_EXPENSE: ["update-expense"],
    UPDATE_INCOME: ["update-income"],
    UPDATE_TRADE: ["update-trade"],
    UPDATE_USER: ["user"],
}

export default QUERY_KEYS
