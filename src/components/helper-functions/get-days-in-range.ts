import type { DateRange } from "@/types/date-range"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

const isLeapYear = getDayJsDateWithPlugins("2024-02-29").isLeapYear()

export default function getDaysInRange(range: DateRange) {
    switch (range) {
        case "7d":
            return 7
        case "14d":
            return 14
        case "1m":
            return 30
        case "3m":
            return 90
        case "6m":
            return 180
        case "1y":
            return 365
        case "Jan":
            return 31
        case "Feb":
            return isLeapYear ? 29 : 28
        case "Mar":
            return 31
        case "Apr":
            return 30
        case "May":
            return 31
        case "Jun":
            return 30
        case "Jul":
            return 31
        case "Aug":
            return 31
        case "Sep":
            return 30
        case "Oct":
            return 31
        case "Nov":
            return 30
        case "Dec":
            return 31
        default:
            return 14
    }
}
