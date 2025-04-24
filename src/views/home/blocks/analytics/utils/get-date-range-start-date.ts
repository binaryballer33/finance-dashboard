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
        default:
            return today.subtract(14, "day")
    }
}
