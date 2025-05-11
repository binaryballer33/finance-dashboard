import type { DateRange } from "@/types/date-range"
import type { Dayjs } from "dayjs"

import { ChevronLeft, ChevronRight } from "lucide-react"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DateRangeSelectorProps = {
    currentDate: Dayjs
    dateRange: DateRange
    setCurrentDate: (currentDate: Dayjs) => void
    setDateRange: (dateRange: DateRange) => void
}

export default function DateRangeSelector(props: DateRangeSelectorProps) {
    const { currentDate, dateRange, setCurrentDate, setDateRange } = props

    const sortedMonths = getMonthsSortedByCurrentDate(currentDate)
    const futureYear = currentDate.add(1, "year").isAfter(getDayJsDateWithPlugins(new Date()))

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

                <div className="flex items-center gap-1 overflow-x-auto max-sm:max-w-40 lg:flex-1">
                    <div className="flex items-center gap-0">
                        <Button
                            className="h-7 w-7 p-0"
                            onClick={() => setCurrentDate(currentDate.subtract(1, "year"))}
                            size="icon"
                            variant="ghost"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <span className="min-w-[2.5rem] text-center font-medium">{currentDate.year()}</span>

                        <Button
                            className="h-7 w-7 p-0"
                            disabled={futureYear}
                            onClick={() => setCurrentDate(currentDate.add(1, "year"))}
                            size="icon"
                            variant="ghost"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {sortedMonths.map((month) => (
                        <TabsTrigger className="p-2" key={month.value} value={month.value}>
                            {month.label}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
        </Tabs>
    )
}

function getMonthsSortedByCurrentDate(currentDate: Dayjs) {
    const currentMonth = currentDate.month() // 0-11 for Jan-Dec
    const currentYear = currentDate.year()
    const today = getDayJsDateWithPlugins(new Date())
    const isCurrentYear = currentYear === today.year()

    type MonthItem = { index: number; label: string; value: string }

    const months: MonthItem[] = [
        { index: 0, label: "Jan", value: "Jan" },
        { index: 1, label: "Feb", value: "Feb" },
        { index: 2, label: "Mar", value: "Mar" },
        { index: 3, label: "Apr", value: "Apr" },
        { index: 4, label: "May", value: "May" },
        { index: 5, label: "Jun", value: "Jun" },
        { index: 6, label: "Jul", value: "Jul" },
        { index: 7, label: "Aug", value: "Aug" },
        { index: 8, label: "Sep", value: "Sep" },
        { index: 9, label: "Oct", value: "Oct" },
        { index: 10, label: "Nov", value: "Nov" },
        { index: 11, label: "Dec", value: "Dec" },
    ]

    const sortedMonths: MonthItem[] = []

    if (isCurrentYear) {
        sortedMonths.push(months[currentMonth])

        // Add previous months in descending order
        for (let i = 1; i <= currentMonth; i += 1) {
            const index = currentMonth - i
            sortedMonths.push(months[index])
        }
    } else if (currentYear < today.year()) {
        // For past years, show all months in descending order (Dec to Jan)
        for (let i = 11; i >= 0; i -= 1) {
            sortedMonths.push(months[i])
        }
    } else {
        // For future years (shouldn't happen with the UI constraints, but just in case)
        sortedMonths.push(months[currentMonth])
    }

    return sortedMonths
}
