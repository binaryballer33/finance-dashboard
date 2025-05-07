import type { DateRange } from "@/types/date-range"
import type { Expense } from "@prisma/client"
import type { Dayjs } from "dayjs"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDaysInRange from "@/components/helper-functions/get-days-in-range"

import { months } from "../constants"

export default function getDailyTransactionTotals(expenses: Expense[], dateRange: DateRange) {
    const dailySpending = new Map<string, number>()
    const today = getDayJsDateWithPlugins(new Date())

    if (dateRange === "all") {
        // Create data points only for dates that have transactions
        expenses.forEach((tx) => {
            const txDate = getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD")
            dailySpending.set(txDate, (dailySpending.get(txDate) || 0) + tx.amount)
        })
    } else {
        let startDate: Dayjs
        let endDate: Dayjs

        if (months.includes(dateRange)) {
            // Handle month date ranges (e.g. "Jan", "Feb", etc.)
            const monthIndex = months.indexOf(dateRange)
            const currentYear = today.year()
            startDate = getDayJsDateWithPlugins(new Date(currentYear, monthIndex, 1))
            endDate = startDate.endOf("month")
        } else {
            // Handle other date ranges (7d, 14d, 1m, 3m, 6m, 1y, etc.)
            const daysInRange = getDaysInRange(dateRange)
            endDate = today
            startDate = today.subtract(daysInRange, "day")
        }

        // Generate all dates between start and end
        let currentDate = startDate
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
            const dateKey = currentDate.format("YYYY-MM-DD")
            dailySpending.set(dateKey, 0)
            currentDate = currentDate.add(1, "day")
        }

        // Calculate daily totals
        expenses.forEach((tx) => {
            const txDate = getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD")
            if (dailySpending.has(txDate)) {
                dailySpending.set(txDate, (dailySpending.get(txDate) || 0) + tx.amount)
            }
        })
    }

    // Format the data for chart display
    return Array.from(dailySpending.entries())
        .map(([date, amount]) => ({
            amount,
            completeDateString: getDayJsDateWithPlugins(date).format("MM-DD-YYYY"),
            date: getDayJsDateWithPlugins(date).format("MM-DD"),
            expenses: expenses.filter((tx) => getDayJsDateWithPlugins(tx.date).format("YYYY-MM-DD") === date),
        }))
        .sort(
            (a, b) =>
                getDayJsDateWithPlugins(a.completeDateString).valueOf() -
                getDayJsDateWithPlugins(b.completeDateString).valueOf(),
        )
}
