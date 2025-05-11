import type { DateRange } from "@/types/date-range"
import type { Dayjs } from "dayjs"

import getFilteredArrayByDateRange from "@/lib/data-aggregation/get-filtered-array-by-date-range"

type GetTotalProps<ObjectOfSomeType extends Record<string, any>> = {
    usingArray: ObjectOfSomeType[]
    usingCurrentDate?: Dayjs
    usingDateRange?: DateRange
    usingField: keyof ObjectOfSomeType
}

export default function getTotal<ObjectOfSomeType extends Record<string, any>>(props: GetTotalProps<ObjectOfSomeType>) {
    const { usingArray: array, usingCurrentDate: currentDate, usingDateRange: dateRange, usingField } = props

    const filteredArray = dateRange && currentDate ? getFilteredArrayByDateRange(array, dateRange, currentDate) : array

    return filteredArray.reduce((total, current) => total + current[usingField], 0)
}
