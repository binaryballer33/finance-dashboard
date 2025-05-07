import type { DateRange } from "@/types/date-range"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDateRangeStartDate from "@/components/helper-functions/get-date-range-start-date"

import { months } from "../constants"

export default function getFilteredArrayByDateRange<ObjectOfSomeType extends Record<string, any>>(
    array: ObjectOfSomeType[],
    dateRange: DateRange,
) {
    if (dateRange === "all") return array

    const today = getDayJsDateWithPlugins(new Date())
    const startDate = getDateRangeStartDate(dateRange, today)

    return array.filter((item) => {
        const date = getDayJsDateWithPlugins(item.date)

        if (months.includes(dateRange)) {
            return date.month() === startDate.month() && date.year() === startDate.year()
        }

        return date.isBetween(startDate, today, "day", "[]")
    })
}
