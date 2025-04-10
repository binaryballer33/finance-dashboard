import type { Table } from "@tanstack/react-table"

import { EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TableExtraHideSelectedProps = {
    table: Table<any>
}

export default function TableExtraHideSelected(props: TableExtraHideSelectedProps) {
    const { table } = props

    const selectedRows = table.getSelectedRowModel().rows
    if (selectedRows.length === 0) return null

    // handle the hiding of the selected row(s)
    const handleHideSelected = () => {
        const selectedIds = selectedRows.map((row) => row.id)
        table.options.meta?.removeRows(selectedIds)
        table.resetRowSelection()
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
                {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected
            </span>

            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="m-2.5 h-4 w-8 text-yellow-600 hover:text-yellow-600/90"
                            onClick={handleHideSelected}
                            size="icon"
                            variant="ghost"
                        >
                            <EyeOff className="h-4 w-4" />
                            <span className="sr-only">Hide selected rows</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Hide selected rows</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
