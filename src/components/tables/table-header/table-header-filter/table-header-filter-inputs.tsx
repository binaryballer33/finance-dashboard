"use client"

import type { ColumnFilter } from "@/types/table/filters"

import { useEffect, useRef } from "react"

import { Label } from "@/components/ui/label"

import DebouncedInput from "../../table-utils/debounced-input"

type FilterInputsProps = {
    filterState: ColumnFilter
    handleEnterKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onEndDateChange: (endDate: string) => void
    onSecondValueChange: (secondValue: string) => void
    onValueChange: (value: string) => void
    open: boolean
}

export default function FilterInputs(props: FilterInputsProps) {
    const { filterState, handleEnterKeyPress, onEndDateChange, onSecondValueChange, onValueChange, open } = props
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus the input when the popover opens
    useEffect(() => {
        if (open) {
            // Small timeout to ensure DOM is ready
            const timeoutId = setTimeout(() => {
                inputRef.current?.focus()
            }, 0)
            return () => clearTimeout(timeoutId)
        }
        return () => clearTimeout(100)
    }, [open])

    return (
        <div className="flex gap-2">
            <div className="w-full text-center">
                <Label htmlFor="filter-input">Search Data</Label>
                <DebouncedInput
                    className="w-full"
                    id="filter-input"
                    onChange={onValueChange}
                    onKeyDown={handleEnterKeyPress}
                    placeholder="Search Data..."
                    ref={inputRef}
                    type="text"
                    value={filterState.value.toString()}
                />
            </div>

            {filterState.operation === "betweenDates" && (
                <div className="w-full text-center">
                    <Label htmlFor="end-date-input">End Date</Label>
                    <DebouncedInput
                        className="w-full"
                        id="end-date-input"
                        onChange={onEndDateChange}
                        onKeyDown={handleEnterKeyPress}
                        placeholder="Select End Date..."
                        type="text"
                        value={filterState.endDate?.toString() ?? ""}
                    />
                </div>
            )}

            {filterState.operation === "between" && (
                <div className="w-full text-center">
                    <Label htmlFor="second-filter-value-input">Second Value</Label>
                    <DebouncedInput
                        className="w-full"
                        id="second-filter-value-input"
                        onChange={onSecondValueChange}
                        onKeyDown={handleEnterKeyPress}
                        placeholder="Search Data..."
                        type="text"
                        value={filterState.secondValue?.toString() ?? ""}
                    />
                </div>
            )}
        </div>
    )
}
