import type { DateRange } from "@/types/date-range"
import type { Dayjs } from "dayjs"

// get the start date based on date range string
export default function getDateRangeStartDate(dateRange: DateRange, today: Dayjs): Dayjs {
    switch (dateRange) {
        case "7d":
            return today.subtract(7, "day")
        case "14d":
            return today.subtract(14, "day")
        case "1m":
            return today.subtract(1, "month")
        case "3m":
            return today.subtract(3, "month")
        case "6m":
            return today.subtract(6, "month")
        case "1y":
            return today.subtract(1, "year")
        case "Jan":
            return today.set("month", 0).startOf("month")
        case "Feb":
            return today.set("month", 1).startOf("month")
        case "Mar":
            return today.set("month", 2).startOf("month")
        case "Apr":
            return today.set("month", 3).startOf("month")
        case "May":
            return today.set("month", 4).startOf("month")
        case "Jun":
            return today.set("month", 5).startOf("month")
        case "Jul":
            return today.set("month", 6).startOf("month")
        case "Aug":
            return today.set("month", 7).startOf("month")
        case "Sep":
            return today.set("month", 8).startOf("month")
        case "Oct":
            return today.set("month", 9).startOf("month")
        case "Nov":
            return today.set("month", 10).startOf("month")
        case "Dec":
            return today.set("month", 11).startOf("month")
        case "all":
            return today.subtract(10, "year")
        default:
            return today.subtract(14, "day")
    }
}
