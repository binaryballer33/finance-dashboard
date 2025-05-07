import type { DateRange } from "@/types/date-range"
import type { Dayjs } from "dayjs"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DateRangeSelectorProps = {
    currentDate: Dayjs
    dateRange: DateRange
    setDateRange: (dateRange: DateRange) => void
}

export default function DateRangeSelector(props: DateRangeSelectorProps) {
    const { currentDate, dateRange, setDateRange } = props

    // Create an array of months sorted by proximity to current month
    const sortedMonths = getMonthsSortedByCurrentDate(currentDate)

    return (
        <Tabs onValueChange={(v) => setDateRange(v as DateRange)} value={dateRange}>
            <TabsList className="flex justify-between overflow-x-auto max-sm:flex-col">
                <div className="flex flex-1 justify-start overflow-x-auto">
                    <TabsTrigger value="7d">1W</TabsTrigger>
                    <TabsTrigger value="14d">2W</TabsTrigger>
                    <TabsTrigger value="1m">1M</TabsTrigger>
                    <TabsTrigger value="3m">3M</TabsTrigger>
                    <TabsTrigger value="6m">6M</TabsTrigger>
                    <TabsTrigger value="1y">1Y</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </div>

                <Separator className="mx-2 h-full" orientation="vertical" />

                <div className="flex items-center gap-2 overflow-x-scroll max-sm:max-w-40 lg:flex-1">
                    {sortedMonths.map((month) => (
                        <TabsTrigger key={month.value} value={month.value}>
                            {month.label}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
        </Tabs>
    )
}

// Helper function to sort months by proximity to current month
function getMonthsSortedByCurrentDate(currentDate: Dayjs) {
    const currentMonth = currentDate.month() // 0-11 for Jan-Dec

    type MonthItem = { label: string; value: string }

    const months: MonthItem[] = [
        { label: "Jan", value: "Jan" },
        { label: "Feb", value: "Feb" },
        { label: "Mar", value: "Mar" },
        { label: "Apr", value: "Apr" },
        { label: "May", value: "May" },
        { label: "Jun", value: "Jun" },
        { label: "Jul", value: "Jul" },
        { label: "Aug", value: "Aug" },
        { label: "Sep", value: "Sep" },
        { label: "Oct", value: "Oct" },
        { label: "Nov", value: "Nov" },
        { label: "Dec", value: "Dec" },
    ]

    const sortedMonths: MonthItem[] = []

    // Add current month first
    sortedMonths.push(months[currentMonth])

    // Add previous months in descending order, wrapping around if needed
    for (let i = 1; i <= 11; i += 1) {
        const index = (currentMonth - i + 12) % 12
        sortedMonths.push(months[index])
    }

    return sortedMonths
}
