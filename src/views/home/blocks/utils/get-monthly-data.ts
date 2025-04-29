import type { MonthlyData } from "@/types/monthly-data"
import type { Expense, Income } from "@prisma/client"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getTotal from "./get-total"

export default function getMonthlyData(incomes: Income[], expenses: Expense[]): MonthlyData[] {
    const monthlyDataMap: Record<string, { expenses: Expense[]; incomes: Income[] }> = {}

    // add the income data to the map
    incomes.forEach((income) => {
        const date = getDayJsDateWithPlugins(income.date).format("MMM YYYY")
        if (!monthlyDataMap[date]) monthlyDataMap[date] = { expenses: [], incomes: [] }
        monthlyDataMap[date].incomes.push(income)
    })

    // add the expense data to the map
    expenses.forEach((expense) => {
        const date = getDayJsDateWithPlugins(expense.date).format("MMM YYYY")
        if (!monthlyDataMap[date]) monthlyDataMap[date] = { expenses: [], incomes: [] }
        monthlyDataMap[date].expenses.push(expense)
    })

    // create the return data in the format the chart expects
    const result: MonthlyData[] = Object.entries(monthlyDataMap).map(([monthYear, monthlyData]) => {
        const monthlyIncome = getTotal({ usingArray: monthlyData.incomes, usingField: "amount" })
        const monthlyExpenses = getTotal({ usingArray: monthlyData.expenses, usingField: "amount" })
        const monthlyBalance = monthlyIncome - monthlyExpenses

        const recurringExpenses = monthlyData.expenses.filter((e) => e.type === "RECURRING")
        const recurringExpensesTotal = getTotal({ usingArray: recurringExpenses, usingField: "amount" })

        const oneTimeExpenses = monthlyData.expenses.filter((e) => e.type === "ONE_TIME")
        const oneTimeExpensesTotal = getTotal({ usingArray: oneTimeExpenses, usingField: "amount" })

        return {
            balance: monthlyBalance,
            expenses: monthlyExpenses,
            income: monthlyIncome,
            name: monthYear,
            oneTimeExpensesTotal,
            recurringExpensesTotal,
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
