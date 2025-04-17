import type { DateRange } from "./types"

export default function getChartTitle(dateRange: DateRange) {
    switch (dateRange) {
        case "7d":
            return "Last Week"
        case "14d":
            return "Last 2 Weeks"
        case "1m":
            return "Last Month"
        case "3m":
            return "Last 3 Months"
        case "6m":
            return "Last 6 Months"
        case "1y":
            return "Last Year"
        default:
            return "Last 2 Weeks"
    }
}
