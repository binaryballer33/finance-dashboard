import type { DateRange } from "@/types/date-range"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import getDateRangeStartDate from "@/components/helper-functions/get-date-range-start-date"

import { months } from "../constants"

export default function getFilteredArrayByDateRange<ObjectOfSomeType extends Record<string, any>>(
    array: ObjectOfSomeType[],
    dateRange: DateRange,
) {
    if (dateRange === "all") {
        return array.sort(
            (a, b) => getDayJsDateWithPlugins(b.date).valueOf() - getDayJsDateWithPlugins(a.date).valueOf(),
        )
    }

    const today = getDayJsDateWithPlugins(new Date())
    const startDate = getDateRangeStartDate(dateRange, today)

    return array
        .filter((item) => {
            const date = getDayJsDateWithPlugins(item.date)

            // if the date range is a month, only return items with the same month and year as the start date
            if (months.includes(dateRange)) {
                return date.month() === startDate.month() && date.year() === startDate.year()
            }

            // only return items between the start date and today
            return date.isBetween(startDate, today, "day", "[]")
        })
        .sort((a, b) => getDayJsDateWithPlugins(b.date).valueOf() - getDayJsDateWithPlugins(a.date).valueOf())
}
