import type { DateRange } from "@/types/date-range"
import type { Expense } from "@prisma/client"
import type { Dayjs } from "dayjs"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDaysInRange from "@/components/helper-functions/get-days-in-range"

import { months } from "../constants"

export default function getDailyTransactionTotals(expenses: Expense[], dateRange: DateRange, currentDate: Dayjs) {
    const dailySpending = new Map<string, number>()

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
            startDate = getDayJsDateWithPlugins(new Date(currentDate.year(), monthIndex, 1))
            endDate = startDate.endOf("month")
        } else {
            // Handle other date ranges (7d, 14d, 1m, 3m, 6m, 1y, etc.)
            const daysInRange = getDaysInRange(dateRange)
            endDate = currentDate
            startDate = currentDate.subtract(daysInRange, "day")
        }

        // Generate all dates between start and end
        let currentDateChecked = startDate
        while (currentDateChecked.isBefore(endDate) || currentDateChecked.isSame(endDate, "day")) {
            const dateKey = currentDateChecked.format("YYYY-MM-DD")
            dailySpending.set(dateKey, 0)
            currentDateChecked = currentDateChecked.add(1, "day")
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
