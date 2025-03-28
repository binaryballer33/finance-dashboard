import type { FilterOperation } from "@/types/table/filters"

const filterOperationsMap: Record<string, { label: string; value: FilterOperation }[]> = {
    date: [
        { label: "Contains", value: "contains" },
        { label: "Does Not Contain", value: "notContains" },
        { label: "Before Date", value: "beforeDate" },
        { label: "After Date", value: "afterDate" },
        { label: "Between Dates", value: "betweenDates" },
        { label: "Equals", value: "eq" },
        { label: "Not Equals", value: "neq" },
    ],
    default: [
        { label: "Contains", value: "contains" },
        { label: "Does Not Contain", value: "notContains" },
        { label: "Before Date", value: "beforeDate" },
        { label: "After Date", value: "afterDate" },
        { label: "Between Dates", value: "betweenDates" },
        { label: "Equals", value: "eq" },
        { label: "Not Equals", value: "neq" },
    ],
    number: [
        { label: "Less Than", value: "lt" },
        { label: "Less Than or Equal", value: "lte" },
        { label: "Greater Than", value: "gt" },
        { label: "Greater Than or Equal", value: "gte" },
        { label: "Equals", value: "eq" },
        { label: "Not Equals", value: "neq" },
        { label: "Between", value: "between" },
        { label: "Contains", value: "contains" },
        { label: "Does Not Contain", value: "notContains" },
    ],
    string: [
        { label: "Equals", value: "eq" },
        { label: "Not Equals", value: "neq" },
        { label: "Contains", value: "contains" },
        { label: "Does Not Contain", value: "notContains" },
    ],
}

export default filterOperationsMap
