import type { Dayjs } from "dayjs"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

/**
 * Generates an array of 6 date strings in YYYY-MM-DD format
 * starting from today and going backward (oldest date last)
 * @returns Array of 6 date strings
 * @example ["2025-04-01", "2025-03-01", "2025-02-01", "2025-01-01", "2024-12-01", "2024-11-01"]
 */
export default function getLastSixMonthsArray(): Dayjs[] {
    const lastSixMonthsArray: Dayjs[] = []
    const today = new Date()

    for (let i = 0; i < 6; i += 1) {
        let date = getDayJsDateWithPlugins(today)
        date = date.subtract(i, "month")
        date = date.startOf("month")

        lastSixMonthsArray.push(date)
    }

    return lastSixMonthsArray
}
