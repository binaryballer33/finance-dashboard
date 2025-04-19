import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import type { DateRange, Expense, Income, Transaction } from "./types"

import getFilteredArray from "./get-filtered-array-by-date-range"
import getTotal from "./get-total"

type MonthlyData = {
    balance: number
    expenses: number
    income: number
    name: string
}

export default function getMonthlyData(
    incomes: Income[],
    expenses: Expense[],
    transactions: Transaction[],
    dateRange?: DateRange,
): MonthlyData[] {
    const monthlyDataMap: Record<string, { expenses: Expense[]; incomes: Income[]; transactions: Transaction[] }> = {}

    // make sure to filter the data based on the date range
    const filteredIncomes = dateRange && dateRange !== "all" ? getFilteredArray(incomes, dateRange) : incomes
    const filteredExpenses = dateRange && dateRange !== "all" ? getFilteredArray(expenses, dateRange) : expenses
    const filteredTransactions =
        dateRange && dateRange !== "all" ? getFilteredArray(transactions, dateRange) : transactions

    // add the income data to the map
    filteredIncomes.forEach((income) => {
        const date = getDayJsDateWithPlugins(income.date).format("MMM YYYY")
        if (!monthlyDataMap[date]) monthlyDataMap[date] = { expenses: [], incomes: [], transactions: [] }
        monthlyDataMap[date].incomes.push(income)
    })

    // add the expense data to the map
    filteredExpenses.forEach((expense) => {
        const date = getDayJsDateWithPlugins(expense.date).format("MMM YYYY")
        if (!monthlyDataMap[date]) monthlyDataMap[date] = { expenses: [], incomes: [], transactions: [] }
        monthlyDataMap[date].expenses.push(expense)
    })

    // add the transaction data to the map
    filteredTransactions.forEach((transaction) => {
        const date = getDayJsDateWithPlugins(transaction.date).format("MMM YYYY")
        if (!monthlyDataMap[date]) monthlyDataMap[date] = { expenses: [], incomes: [], transactions: [] }
        monthlyDataMap[date].transactions.push(transaction)
    })

    // create the return data in the format the chart expects
    const result: MonthlyData[] = Object.entries(monthlyDataMap).map(([monthYear, data]) => {
        const monthlyIncome = getTotal({ usingArray: data.incomes, usingField: "amount" })
        const monthlyExpenses = getTotal({ usingArray: data.expenses, usingField: "amount" })
        const monthlyTransactions = getTotal({ usingArray: data.transactions, usingField: "amount" })
        const monthlyBalance = monthlyIncome - monthlyExpenses

        return {
            balance: monthlyBalance,
            expenses: monthlyExpenses,
            income: monthlyIncome,
            name: monthYear,
            transactions: monthlyTransactions,
        }
    })

    // sort the data by date (oldest first)
    result.sort((a, b) => {
        const dateA = getDayJsDateWithPlugins(a.name, "MMM YYYY")
        const dateB = getDayJsDateWithPlugins(b.name, "MMM YYYY")
        return dateA.diff(dateB)
    })

    return result
}
