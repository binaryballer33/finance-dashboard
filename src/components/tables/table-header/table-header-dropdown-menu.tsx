"use client"

import type { Header } from "@tanstack/react-table"

import { MoreVertical } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type TableHeaderDropdownMenuProps = {
    header: Header<any, any>
}

export default function TableHeaderDropdownMenu(props: TableHeaderDropdownMenuProps) {
    const { header } = props

    const isPinned = header.column.getIsPinned()
    const isSorted = header.column.getIsSorted()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className="h-5 w-5" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* Pin to right */}
                {isPinned !== "right" && (
                    <DropdownMenuItem onClick={() => header.column.pin("right")}>Pin to Right</DropdownMenuItem>
                )}

                {/* Pin to left */}
                {isPinned !== "left" && (
                    <DropdownMenuItem onClick={() => header.column.pin("left")}>Pin to Left</DropdownMenuItem>
                )}

                {/* Unpin */}
                {isPinned && <DropdownMenuItem onClick={() => header.column.pin(false)}>Unpin</DropdownMenuItem>}

                {/* Sort */}
                <DropdownMenuItem onClick={header.column.getToggleSortingHandler()}>
                    {isSorted === "desc" ? "Sort Asc" : "Sort Desc"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
