import type { DateRange } from "@/types/date-range"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDateRangeStartDate from "@/components/helper-functions/get-date-range-start-date"

export default function getFilteredArrayByDateRange<ObjectOfSomeType extends Record<string, any>>(
    array: ObjectOfSomeType[],
    dateRange: DateRange,
) {
    if (dateRange === "all") return array

    const today = getDayJsDateWithPlugins(new Date())
    const startDate = getDateRangeStartDate(dateRange, today)

    return array.filter((item) => {
        const date = getDayJsDateWithPlugins(item.date)
        return date.isBetween(startDate, today, "day", "[]")
    })
}
