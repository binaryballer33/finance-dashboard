import type { DateRange } from "@/types/date-range"
import type { Expense } from "@prisma/client"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDaysInRange from "./get-days-in-range"

export default function getDailyTransactionTotals(expenses: Expense[], dateRange: DateRange) {
    const daysInRange = getDaysInRange(dateRange)
    const dailySpending = new Map<string, number>()
    const today = getDayJsDateWithPlugins(new Date())

    // create the map with the selected range of days as the keys and initialize the values to 0
    for (let i = daysInRange; i >= 0; i -= 1) {
        const day = today.subtract(i, "day").format("YYYY-MM-DD")
        dailySpending.set(day, 0)
    }

    // get the total amount spent for each day
    expenses.forEach((tx) => {
        const txDate = getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD")
        if (dailySpending.has(txDate)) dailySpending.set(txDate, (dailySpending.get(txDate) || 0) + tx.amount)
    })

    // return the data in the format required by the chart
    return Array.from(dailySpending.entries()).map(([date, amount]) => ({
        amount,
        completeDateString: getDayJsDateWithPlugins(date).format("MM-DD-YYYY"),
        date: getDayJsDateWithPlugins(date).format("MM-DD"),
        expenses: expenses.filter((tx) => getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD") === date),
    }))
}
