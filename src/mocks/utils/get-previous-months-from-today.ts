import type { Dayjs } from "dayjs"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

/**
 * Generates an array of 6 date strings in YYYY-MM-DD format
 * starting from today and going backward (oldest date last)
 * @param numberOfMonths - The number of months to go back
 * @returns Array of Dayjs objects
 *
 * @example
 *
 * getPreviousMonths(6)
 *
 * [Dayjs("2025-04-01"), Dayjs("2025-03-01"), Dayjs("2025-02-01"), Dayjs("2025-01-01"), Dayjs("2024-12-01"), Dayjs("2024-11-01")]
 */
export default function getPreviousMonthsFromToday(numberOfMonths: number): Dayjs[] {
    const lastTwelveMonthsArray: Dayjs[] = []
    const today = new Date()

    for (let i = 0; i < numberOfMonths; i += 1) {
        const date = getDayJsDateWithPlugins(today).subtract(i, "month").startOf("month")
        lastTwelveMonthsArray.push(date)
    }

    return lastTwelveMonthsArray
}
