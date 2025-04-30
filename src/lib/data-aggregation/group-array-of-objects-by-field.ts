import type { Dayjs } from "dayjs"

import getDayJsDateWithPlugins from "@/lib/helper-functions/dates/get-day-js-date-with-plugins"

type DateFieldKey = "DD" | "MM-DD-YYYY" | "MM-YYYY" | "YYYY"

/**
 * The properties of the groupBy function.
 *
 * @template ObjectOfSomeType The type of the objects in the array
 * @template FieldFromObjectOfSomeType The key of the object to group by
 * @returns An object where keys are the unique values of the specified field and values are arrays of the corresponding objects
 */
type GroupByProps<ObjectOfSomeType extends Obj, FieldFromObjectOfSomeType extends keyof ObjectOfSomeType> = {
    /** The array of objects to group. */
    array: ObjectOfSomeType[]

    /** The field to group by. */
    field: FieldFromObjectOfSomeType

    /** The granularity to group by ('date', 'month', 'year', 'day'). */
    groupDatesByKey?: DateFieldKey
}

/**
 * The result of the groupBy function.
 *
 * @template ObjectOfSomeType The type of the objects in the array
 * @returns An array of objects where each object contains a group key and data array
 */
type GroupByResult<ObjectOfSomeType extends Obj> = Array<{
    data: ObjectOfSomeType[]
    group: string
}>

/**
 * A plain object.
 *
 * @template Key The type of the keys in the object
 * @template Value The type of the values in the object
 * @returns An object where keys are the unique values of the specified field and values are arrays of the corresponding objects
 */
type Obj = {
    [key: string]: any
}

/**
 * Groups an array of objects by a specified field.
 *
 * @template ObjectOfSomeType The type of objects in the array
 * @template FieldFromObjectOfSomeType The key of the object to group by
 * @param props An object containing the array and the field name to group by
 * @returns An array of objects, each containing a group key and the data that belongs to that group
 *
 * @example
 *
 * const trades = [
 *     { ticker: "AMD", profitLoss: 100, ... },
 *     { ticker: "AMD", profitLoss: 200, ... },
 *     { ticker: "NVDA", profitLoss: 300, ... },
 *     { ticker: "NVDA", profitLoss: 400, ... },
 *     ...
 * ]
 *
 * const groupedByTicker = groupBy({ array: trades, field: "ticker" }))
 *
 * groupedByTicker = [
 *   {
 *     group: "AMD",
 *     data: [
 *       { ticker: "AMD", profitLoss: 100, ... },
 *       { ticker: "AMD", profitLoss: 200, ... },
 *     ]
 *   },
 *   {
 *     group: "NVDA",
 *     data: [
 *       { ticker: "NVDA", profitLoss: 300, ... },
 *       { ticker: "NVDA", profitLoss: 400, ... },
 *     ]
 *   }
 * ]
 *
 *  * const orders = [
 * { id: 1, orderDate: "2023-10-26T10:00:00Z", amount: 50 },
 * { id: 2, orderDate: "2023-10-26T15:30:00Z", amount: 75 },
 * { id: 3, orderDate: "2023-11-15T09:00:00Z", amount: 100 },
 * { id: 4, orderDate: "2024-10-26T11:00:00Z", amount: 120 },
 * { id: 5, orderDate: "invalid-date-string", amount: 99 }, // Will be skipped
 * ];
 *
 * Group by full date
 * const groupedByFullDate = groupArrayOfObjectsByDate({ array: orders, dateField: "orderDate", groupBy: "date" });
 *  groupedByFullDate = [
 *    { group: "2023-10-26", data: [ { id: 1, ... }, { id: 2, ... } ] },
 *    { group: "2023-11-15", data: [ { id: 3, ... } ] },
 *    { group: "2024-10-26", data: [ { id: 4, ... } ] }
 *  ]
 *
 *  Group by month
 * const groupedByMonth = groupArrayOfObjectsByDate({ array: orders, dateField: "orderDate", groupBy: "month" });
 *  groupedByMonth = [
 *    { group: "2023-10", data: [ { id: 1, ... }, { id: 2, ... } ] },
 *    { group: "2023-11", data: [ { id: 3, ... } ] },
 *    { group: "2024-10", data: [ { id: 4, ... } ] }
 *  ]
 *
 *  Group by year
 * const groupedByYear = groupArrayOfObjectsByDate({ array: orders, dateField: "orderDate", groupBy: "year" });
 *  groupedByYear = [
 *    { group: "2023", data: [ { id: 1, ... }, { id: 2, ... }, { id: 3, ... } ] },
 *    { group: "2024", data: [ { id: 4, ... } ] }
 *  ]
 *
 *  Group by day of the month
 * const groupedByDay = groupArrayOfObjectsByDate({ array: orders, dateField: "orderDate", groupBy: "day" });
 *  groupedByDay = [
 *    { group: "26", data: [ { id: 1, ... }, { id: 2, ... }, { id: 4, ... } ] },  Groups day 26 from 2023 and 2024
 *    { group: "15", data: [ { id: 3, ... } ] }
 *  ]
 *
 */
export default function groupArrayOfObjectsByField<
    ObjectOfSomeType extends Obj,
    FieldFromObjectOfSomeType extends keyof ObjectOfSomeType,
>(props: GroupByProps<ObjectOfSomeType, FieldFromObjectOfSomeType>): GroupByResult<ObjectOfSomeType> {
    const { array, field, groupDatesByKey } = props

    /*
     * group the array by the field and return the grouping
     *
     * initialGrouping = {
     *     AMD: [
     *         { ticker: "AMD", profitLoss: 100, ... },
     *         { ticker: "AMD", profitLoss: 200, ... },
     *         ...
     *     ],
     *     NVDA: [
     *         { ticker: "NVDA", profitLoss: 300, ... },
     *         { ticker: "NVDA", profitLoss: 400, ... },
     *         ...
     *     ],
     * }
     */
    const initialGrouping: Record<string, ObjectOfSomeType[]> = array.reduce(
        (acc, item) => {
            // check if the field is a date
            if (groupDatesByKey) {
                const dateString = item[field]
                const date = getDayJsDateWithPlugins(dateString)
                if (!date.isValid()) return acc

                const groupKey = getGroupKey(date, groupDatesByKey)
                acc[groupKey] = acc[groupKey] || []
                acc[groupKey].push(item)
                return acc
            }

            // if the field is not a date, group by the field
            const key = item[field]
            acc[key] = acc[key] || []
            acc[key].push(item)
            return acc
        },
        {} as Record<string, ObjectOfSomeType[]>,
    )

    /*
     * returns an array of arrays aka an ( array of key value pairs )
     *
     * example groupEntries = [
     *   [ "NVDA", [{ticker: "NVDA", profitLoss: 300, ...}, {ticker: "NVDA", profitLoss: 400, ...}, ...]],
     *   [ "AMD", [{ticker: "AMD", profitLoss: 100, ...}, {ticker: "AMD", profitLoss: 200, ...}, ...]],
     * ]
     */
    const groupEntries = Object.entries(initialGrouping)

    /*
     * returns an array of objects with the key and the data, this is what we can use in React to render the data
     *
     * example grouping = [
     *   { group: "NVDA", data: [{ticker: "NVDA", profitLoss: 300, ...}, {ticker: "NVDA", profitLoss: 400, ...}],  },
     *   { group: "AMD", data: [{ticker: "AMD", profitLoss: 100, ...}, {ticker: "AMD", profitLoss: 200, ...}],  },
     * ]
     */
    const grouping = groupEntries.map(([group, data]) => {
        return {
            data,
            group,
        }
    })

    return grouping
}

function getGroupKey(date: Dayjs, dateField: DateFieldKey) {
    switch (dateField) {
        case "MM-DD-YYYY":
            return date.format("MM-DD-YYYY")
        case "MM-YYYY":
            return date.format("MM-YYYY")
        case "YYYY":
            return date.format("YYYY")
        case "DD":
            return date.format("DD")
        default:
            return date.format("MM-DD-YYYY")
    }
}
