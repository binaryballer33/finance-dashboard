import type { DateRange } from "@/types/date-range"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type DateRangeSelectorProps = {
    dateRange: DateRange
    setDateRange: (dateRange: DateRange) => void
}

export default function DateRangeSelector(props: DateRangeSelectorProps) {
    const { dateRange, setDateRange } = props

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
                    <TabsTrigger value="Jan">Jan</TabsTrigger>
                    <TabsTrigger value="Feb">Feb</TabsTrigger>
                    <TabsTrigger value="Mar">Mar</TabsTrigger>
                    <TabsTrigger value="Apr">Apr</TabsTrigger>
                    <TabsTrigger value="May">May</TabsTrigger>
                    <TabsTrigger value="Jun">Jun</TabsTrigger>
                    <TabsTrigger value="Jul">Jul</TabsTrigger>
                    <TabsTrigger value="Aug">Aug</TabsTrigger>
                    <TabsTrigger value="Sep">Sep</TabsTrigger>
                    <TabsTrigger value="Oct">Oct</TabsTrigger>
                    <TabsTrigger value="Nov">Nov</TabsTrigger>
                    <TabsTrigger value="Dec">Dec</TabsTrigger>
                </div>
            </TabsList>
        </Tabs>
    )
}
