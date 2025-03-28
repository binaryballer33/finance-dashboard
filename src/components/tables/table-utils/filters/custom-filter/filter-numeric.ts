import type { ColumnFilter } from "@/types/table/filters"

// Function to handle numeric comparisons
export default function handleNumericComparison(value: unknown, filterValue: ColumnFilter): boolean {
    // convert the value from the row to a number
    const rowNumValue = Number(value)

    // convert the value from the filter to a number so we can compare them
    const numFilterVal = Number(filterValue.value)

    // convert the second value from the filter to a number so we can compare them
    const numSecondFilterVal = Number(filterValue.secondValue)

    // check if the value from the row and the value from the filter are numbers
    const isNumeric = !Number.isNaN(rowNumValue) && !Number.isNaN(numFilterVal)
    if (!isNumeric) return false

    // Perform the appropriate numeric comparison
    switch (filterValue.operation) {
        case "gt":
            return rowNumValue > numFilterVal
        case "lt":
            return rowNumValue < numFilterVal
        case "gte":
            return rowNumValue >= numFilterVal
        case "lte":
            return rowNumValue <= numFilterVal
        case "eq":
            return rowNumValue === numFilterVal
        case "neq":
            return rowNumValue !== numFilterVal
        case "between":
            return rowNumValue >= numFilterVal && rowNumValue <= numSecondFilterVal
        case "contains":
            return rowNumValue.toString().includes(numFilterVal.toString())
        case "notContains":
            return !rowNumValue.toString().includes(numFilterVal.toString())
        default:
            return false
    }
}
