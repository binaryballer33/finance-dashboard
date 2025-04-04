"use client"

import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TableExtraCreateNewRecordProps {
    setCreateNewRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    tooltipContent?: string
}

export default function TableExtraCreateNewRecord(props: TableExtraCreateNewRecordProps) {
    const { setCreateNewRecordDialogOpen, tooltipContent } = props

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={() => setCreateNewRecordDialogOpen(true)} size="sm">
                        +
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{tooltipContent ?? "Create New Record"}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
