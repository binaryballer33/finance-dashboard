import type { DateRange } from "@/types/date-range"

export default function getTimeframeString(dateRange: DateRange) {
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
        case "Jan":
            return "January"
        case "Feb":
            return "February"
        case "Mar":
            return "March"
        case "Apr":
            return "April"
        case "May":
            return "May"
        case "Jun":
            return "June"
        case "Jul":
            return "July"
        case "Aug":
            return "August"
        case "Sep":
            return "September"
        case "Oct":
            return "October"
        case "Nov":
            return "November"
        case "Dec":
            return "December"
        case "all":
            return "All Time"
        default:
            return "Last 2 Weeks"
    }
}
