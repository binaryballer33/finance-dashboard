"use client"

import type { ColumnFilter } from "@/types/table/filters"
import type { Header, Table } from "@tanstack/react-table"

import { useCallback, useState } from "react"

import { Search } from "lucide-react"

import { useBoolean } from "@/hooks/use-boolean"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import FilterInputs from "./table-header-filter-inputs"
import FilterOperations from "./table-header-filter-operations"

// Define the props for the TableHeaderColumnFilter component
type TableHeaderColumnFilterProps = {
    header: Header<any, unknown>
    table: Table<any>
}

// TODO: figure out a way to still be able to see the column that you are trying to filter when the filter menu opens
// TODO: when selecting a date range after selecting the start date the end date should be focused
export default function TableHeaderColumnFilter(props: TableHeaderColumnFilterProps) {
    const { header, table } = props

    // for opening and closing the filter menu
    const { handleFalse: closeOpen, handleToggle: toggleOpen, value: open } = useBoolean(false)
    const [filterState, setFilterState] = useState<ColumnFilter>({
        endDate: "",
        operation: "contains",
        secondValue: "",
        value: "",
    })

    const handleFilter = useCallback(() => {
        const { endDate, operation, secondValue, value } = filterState

        // Create the filter value object
        const filterValue: ColumnFilter = { operation, value }

        // Add second input if the operation is "betweenDates" or "between"
        if (operation === "betweenDates" && endDate) filterValue.endDate = endDate
        if (operation === "between" && secondValue) filterValue.secondValue = secondValue

        // filter the column based on the filter value
        header.column.setFilterValue(filterValue)
    }, [filterState, header.column])

    // apply the filter and close the popover menu
    const handleApplyFilter = useCallback(() => {
        handleFilter()
        closeOpen()
    }, [handleFilter, closeOpen])

    // Clear the filter and reset the state
    const handleClearFilter = () => {
        header.column.setFilterValue(null)
        setFilterState({ endDate: "", operation: "contains", secondValue: "", value: "" })
        closeOpen()
    }

    const handleResetAllFilters = () => {
        table.resetColumnFilters()
        setFilterState({ endDate: "", operation: "contains", secondValue: "", value: "" })
        closeOpen()
    }

    // close the popover menu when the user presses enter
    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleApplyFilter()
            closeOpen()
        }
    }

    return (
        <Popover onOpenChange={toggleOpen} open={open}>
            <PopoverTrigger asChild>
                <Button className={header.column.getIsFiltered() ? "bg-primary/50" : ""} size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Filter {header.column.id}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-4">
                    <h4 className="font-medium leading-none">Filter Based On {header.column.id}</h4>

                    {/* Radio Group for Filter Operations */}
                    <FilterOperations
                        filterState={filterState}
                        header={header}
                        onOperationChange={(operation) => setFilterState((prev) => ({ ...prev, operation }))}
                        table={table}
                    />

                    {/* Input Fields For Filtering */}
                    <FilterInputs
                        filterState={filterState}
                        handleEnterKeyPress={handleEnterKeyPress}
                        onEndDateChange={(endDate) => setFilterState((prev) => ({ ...prev, endDate }))}
                        onSecondValueChange={(secondValue) => setFilterState((prev) => ({ ...prev, secondValue }))}
                        onValueChange={(value) => setFilterState((prev) => ({ ...prev, value }))}
                        open={open}
                    />

                    {/* Buttons for Applying and Clearing Filter */}
                    <div className="flex gap-2 overflow-x-auto">
                        <Button onClick={handleApplyFilter}>Apply Filter</Button>
                        <Button onClick={handleClearFilter}>Clear</Button>
                        <Button onClick={handleResetAllFilters}>Clear All Filters</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
