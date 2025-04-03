"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TableExtraCreateNewRecordProps {
    handleCreateNewRecord: () => void
    tooltipContent?: string
}

export default function TableExtraCreateNewRecord(props: TableExtraCreateNewRecordProps) {
    const { handleCreateNewRecord, tooltipContent } = props

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleCreateNewRecord} size="sm">
                        +
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{tooltipContent ?? "Create New Record"}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
