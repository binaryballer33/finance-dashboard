"use client"

import type { ColumnFilter, FilterOperation } from "@/types/table/filters"
import type { Header, Table } from "@tanstack/react-table"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import getColumnType from "../../table-utils/filters/custom-filter/get-column-type"
import filterOperationsMap from "../../table-utils/filters/filter-operations"

type FilterOperationsProps = {
    filterState: ColumnFilter
    header: Header<any, unknown>
    onOperationChange: (operation: FilterOperation) => void
    table: Table<any>
}

export default function FilterOperations(props: FilterOperationsProps) {
    const { filterState, header, onOperationChange, table } = props

    const columnCellData = table.getRowModel().rows[0]?.getValue(header.id)
    const columnType = getColumnType(columnCellData)
    const columnFilterOperations = filterOperationsMap[columnType] || filterOperationsMap.default

    return (
        <RadioGroup
            className="grid grid-cols-2 gap-2"
            onValueChange={(valueChange) => onOperationChange(valueChange as FilterOperation)}
            value={filterState.operation}
        >
            {columnFilterOperations.map((op) => (
                <div className="flex items-center space-x-2" key={op.value}>
                    <RadioGroupItem id={op.value} value={op.value} />
                    <Label htmlFor={op.value}>{op.label}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}
