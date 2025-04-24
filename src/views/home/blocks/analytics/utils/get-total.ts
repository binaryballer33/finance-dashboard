import type { DateRange } from "@/types/date-range"

import getFilteredArrayByDateRange from "./get-filtered-array-by-date-range"

type GetTotalProps<ObjectOfSomeType extends Record<string, any>> = {
    usingArray: ObjectOfSomeType[]
    usingDateRange?: DateRange
    usingField: keyof ObjectOfSomeType
}

export default function getTotal<ObjectOfSomeType extends Record<string, any>>(props: GetTotalProps<ObjectOfSomeType>) {
    const { usingArray: array, usingDateRange: dateRange, usingField } = props

    const filteredArray = dateRange ? getFilteredArrayByDateRange(array, dateRange) : array

    return filteredArray.reduce((total, current) => total + current[usingField], 0)
}
