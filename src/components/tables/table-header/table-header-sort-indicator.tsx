"use client"

import type { Header } from "@tanstack/react-table"

import { ArrowDownAZ, ArrowUpZA } from "lucide-react"
import { TiSortAlphabetically } from "react-icons/ti"

type TableHeaderSortIndicatorProps = {
    header: Header<any, any>
}

export default function TableHeaderSortIndicator(props: TableHeaderSortIndicatorProps) {
    const { header } = props

    const isSorted = header.column.getIsSorted()

    const handleClick = header.column.getToggleSortingHandler()

    const renderSortIndicator = () => {
        switch (isSorted) {
            case "asc":
                return <ArrowDownAZ className="h-5 w-5" onClick={handleClick} />
            case "desc":
                return <ArrowUpZA className="h-5 w-5" onClick={handleClick} />
            default:
                return <TiSortAlphabetically className="h-5 w-5" onClick={handleClick} />
        }
    }

    return renderSortIndicator()
}
