import type { Table } from "@tanstack/react-table"
import type { ReactNode } from "react"

import { Download, FileJson, Sheet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import downloadTableToCSV from "../table-utils/downloads/download-table-to-csv"
import downloadTableToJSON from "../table-utils/downloads/download-table-to-json"

type TableExtraExportButtonsProps = {
    table: Table<any>
}

export default function TableExtraExportButtons(props: TableExtraExportButtonsProps) {
    const { table } = props

    // Get all rows that match current filters
    const filteredRows = table.getFilteredRowModel().rows
    const data = filteredRows.map((row) => row.original)

    const exportButtons = [
        {
            handleDownload: () => downloadTableToCSV(data),
            icon: <Sheet className="h-4 w-4" />,
            label: "Download CSV",
        },
        {
            handleDownload: () => downloadTableToJSON(data),
            icon: <FileJson className="h-4 w-4" />,
            label: "Download JSON",
        },
    ]

    return (
        <div className="flex w-full flex-col items-center gap-2">
            <div className="flex items-center gap-2">
                <Download className="h-6 w-6 max-sm:!w-4" />
                <h5 className="text-md font-medium hover:text-secondary">Export</h5>
            </div>

            <div className="flex w-full items-center justify-center gap-2">
                {exportButtons.map((button) => (
                    <TableHeaderExportButton
                        handleDownload={button.handleDownload}
                        icon={button.icon}
                        key={button.label}
                        label={button.label}
                    />
                ))}
            </div>
        </div>
    )
}

type TableHeaderExportButtonProps = {
    handleDownload: () => void
    icon: ReactNode
    label: string
}

function TableHeaderExportButton(props: TableHeaderExportButtonProps) {
    const { handleDownload, icon, label } = props

    return (
        <div className="flex items-center justify-start gap-2 whitespace-nowrap hover:text-primary">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="h-8 w-8 hover:border-2 hover:border-primary"
                            onClick={handleDownload}
                            size="icon"
                            variant="ghost"
                        >
                            {icon}
                            <span className="sr-only">{label}</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="whitespace-nowrap">{label}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
