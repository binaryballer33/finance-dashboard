import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { DateRange } from "../utils/types"

type DateRangeSelectorProps = {
    dateRange: DateRange
    setDateRange: (dateRange: DateRange) => void
}

export default function DateRangeSelector(props: DateRangeSelectorProps) {
    const { dateRange, setDateRange } = props

    return (
        <Tabs onValueChange={(v) => setDateRange(v as DateRange)} value={dateRange}>
            <TabsList className="flex justify-start overflow-x-auto">
                <TabsTrigger value="7d">1W</TabsTrigger>
                <TabsTrigger value="14d">2W</TabsTrigger>
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
