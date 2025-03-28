"use client"

import type { DraggableAttributes } from "@dnd-kit/core"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"

import { UnfoldHorizontal } from "lucide-react"

type TableHeaderDragColumnProps = {
    attributes: DraggableAttributes
    listeners: SyntheticListenerMap | undefined
}

export default function TableHeaderDragColumn(props: TableHeaderDragColumnProps) {
    const { attributes, listeners } = props

    return <UnfoldHorizontal className="h-5 w-5" {...attributes} {...listeners} />
}
