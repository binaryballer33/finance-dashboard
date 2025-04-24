import type { DateRange } from "@/types/date-range"

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
        default:
            return 14
    }
}
