"use client"

import type { Table } from "@tanstack/react-table"

import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import convertCamelToTitleCase from "../table-utils/typography/convert-camel-to-title-case"

type TableExtraColumnVisibilityProps = {
    columnOrder: string[]
    table: Table<any>
}

export default function TableExtraColumnVisibility(props: TableExtraColumnVisibilityProps) {
    const { columnOrder, table } = props

    const handleValueChangeAll = (value: string) => {
        table.toggleAllColumnsVisible(value === "all")
    }

    const handleValueChangeColumn = (checked: boolean | string, id: string) => {
        table.setColumnVisibility((prev) => ({
            ...prev,
            [id]: !!checked,
        }))
    }

    const isChecked = (id: string) => table.getColumn(id)?.getIsVisible()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="m-2 max-sm:!m-0" size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Show Column Visibility</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4">
                <div className="space-y-4">
                    <RadioGroup
                        className="flex gap-4"
                        defaultValue="all"
                        onValueChange={(value) => handleValueChangeAll(value)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="all" value="all" />
                            <Label htmlFor="all">Show All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="none" value="none" />
                            <Label htmlFor="none">Show None</Label>
                        </div>
                    </RadioGroup>

                    <div className="space-y-2">
                        {columnOrder.map((id) => (
                            <div className="flex items-center space-x-2" key={id}>
                                <Checkbox
                                    checked={isChecked(id)}
                                    id={id}
                                    onCheckedChange={(checked) => handleValueChangeColumn(checked, id)}
                                />
                                <Label htmlFor={id}>{convertCamelToTitleCase(id)}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
