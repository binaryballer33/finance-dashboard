"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TableExtraCreateNewRecord() {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="sm">+</Button>
                </TooltipTrigger>
                <TooltipContent>Create New Record</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
