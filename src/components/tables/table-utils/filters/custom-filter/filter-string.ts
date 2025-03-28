import type { ColumnFilter } from "@/types/table/filters"

// Function to handle string comparisons
export default function handleStringComparison(value: unknown, filterValue: ColumnFilter): boolean {
    // the value from the row
    const rowStringValue = String(value).toLowerCase()

    // the value from the filter
    const filterVal = String(filterValue.value).toLowerCase()

    // Perform the appropriate string comparison
    switch (filterValue.operation) {
        case "contains":
            return rowStringValue.includes(filterVal)
        case "notContains":
            return !rowStringValue.includes(filterVal)
        case "eq":
            return rowStringValue === filterVal
        case "neq":
            return rowStringValue !== filterVal
        default:
            return false
    }
}
