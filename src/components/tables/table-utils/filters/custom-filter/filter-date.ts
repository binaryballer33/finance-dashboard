import type { ColumnFilter } from "@/types/table/filters"
import type dayjs from "dayjs"

import { dateValueSchema } from "@/types/table/filters"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

/*
 * This function handles date comparisons using dayjs.
 * @param value - The value to compare.
 * @param filterValue - The filter input value.
 * @returns true if the value matches the filter, false otherwise.
 */
export default function handleDateComparison(value: unknown, filterValue: ColumnFilter): boolean {
    const validatedDate = dateValueSchema.safeParse(value)
    if (!validatedDate.success) return false

    // get the date value from the row
    const rowDate = getDayJsDateWithPlugins(validatedDate.data)

    // get the filter date value
    const filterDate = getDayJsDateWithPlugins(filterValue.value)

    // get the search value from the filter value
    const searchValue = filterValue.value.toString().toLowerCase()

    // if dayjs cannot parse the value, return false
    if (!rowDate.isValid()) return false

    // get the date formats for the row and filter values
    const rowDateFormats = getDateFormats(rowDate)

    switch (filterValue.operation) {
        case "afterDate":
            return rowDate.isAfter(filterDate)
        case "beforeDate":
            return rowDateFormats.some((format) => {
                const compareDate = getDayJsDateWithPlugins(format)
                return rowDate.valueOf() <= compareDate.valueOf()
            })
        // return rowDate.valueOf() <= filterDate.valueOf()
        case "betweenDates": {
            if (!filterValue.endDate) return false
            const endDateTime = getDayJsDateWithPlugins(filterValue.endDate)

            // Check if both dates are valid
            if (!filterDate.isValid() || !endDateTime.isValid()) return false

            // Use isBetween with inclusive boundaries '[]'
            return rowDate.isBetween(filterDate, endDateTime, "day", "[]")
        }
        case "eq":
            return rowDate.isSame(filterDate, "day")
        case "neq":
            return !rowDate.isSame(filterDate, "day")
        case "contains":
            return rowDateFormats.some((format) => format.toLowerCase().includes(searchValue))
        case "notContains":
            return !rowDateFormats.some((format) => format.toLowerCase().includes(searchValue))
        default:
            return true
    }
}

function getDateFormats(date: dayjs.Dayjs): string[] {
    return [
        // month space day format
        date.format("MM DD"), // 12 20

        // dash format
        date.format("MM-DD"), // 12-20
        date.format("DD-MM"), // 20-12
        date.format("MM-DD-YYYY"), // 12-20-2024
        date.format("YYYY-MM-DD"), // 2024-12-20

        // slash format
        date.format("MM/DD"), // 12/20
        date.format("DD/MM"), // 20/12
        date.format("MM/DD/YYYY"), // 12/20/2024
        date.format("YYYY/MM/DD"), // 2024/12/20

        // month spelled out format
        date.format("MMM DD"), // Dec 20
        date.format("MMMM DD"), // December 20
        date.format("MMM DD YYYY"), // Dec 20 2024
        date.format("MMM DD, YYYY"), // Dec 20, 2024
        date.format("MMMM DD, YYYY"), // December 20, 2024
    ]
}
