import type { YuGiOhCard } from "@/types/yu-gi-oh/yu-gi-oh"

import Image from "next/image"
import Link from "next/link"

import { useMemo } from "react"

import { createColumnHelper } from "@tanstack/react-table"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import TableBodyRowCheckbox from "@/components/tables/table-body/table-body-row-checkbox"
import TableBodyRowDelete from "@/components/tables/table-body/table-body-row-delete"
import TableBodyRowRowDrag from "@/components/tables/table-body/table-body-row-drag"
import TableBodyRowExpand from "@/components/tables/table-body/table-body-row-expand"
import TableHeaderCheckboxAll from "@/components/tables/table-header/table-header-checkbox-all"
import TableHeaderDelete from "@/components/tables/table-header/table-header-delete"
import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"

const createCellTooltip = (tooltipTrigger: string, tooltipContent: string) => {
    return (
        <TooltipProvider delayDuration={333}>
            <Tooltip>
                <TooltipTrigger className="max-w-[300px]">{tooltipTrigger.slice(0, 100)}</TooltipTrigger>
                <TooltipContent className="max-w-[300px]">{tooltipContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const columnHelper = createColumnHelper<YuGiOhCard>()

export default function useCreateYugiohTableColumns() {
    // don't show the header features like sort, filter, drag and drop, etc for these columns
    const hideForColumnsMap = useMemo(
        () => ({
            delete: "Delete",
            dragRow: "Drag Row",
            rowDetails: "Row Details",
            selectAll: "Select All",
        }),
        [],
    )

    const hideForColumns = Object.values(hideForColumnsMap)

    // create the columns for the table, the id is also being used to create the footer and header tooltip content
    const columns = useMemo(
        () => [
            columnHelper.display({
                cell: ({ row }) => (
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <TableBodyRowCheckbox row={row} />
                    </div>
                ),
                footer: (props) => props.column.id,
                header: ({ table }) => (
                    <div className="flex h-full w-full items-center justify-center p-2">
                        <TableHeaderCheckboxAll table={table} />
                    </div>
                ),
                id: hideForColumnsMap.selectAll,
                maxSize: 50,
            }),

            columnHelper.display({
                cell: ({ row }) => <TableBodyRowRowDrag rowId={row.id} />,
                footer: (props) => props.column.id,
                id: hideForColumnsMap.dragRow,
                maxSize: 30,
            }),

            columnHelper.display({
                cell: ({ row }) => (row.getCanExpand() ? <TableBodyRowExpand row={row} /> : null),
                footer: (props) => props.column.id,
                id: hideForColumnsMap.rowDetails,
                maxSize: 30,
            }),

            columnHelper.accessor("imageUrl", {
                cell: ({ row }) => (
                    <div className="relative h-[100px] w-[100px]">
                        <Image
                            alt={row.original.name}
                            className="rounded-sm object-contain"
                            fill
                            priority
                            sizes="100px"
                            src={row.original.imageUrl}
                        />
                    </div>
                ),
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Image</span>,
                id: "Image",
                minSize: 120,
            }),

            columnHelper.accessor("name", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Name</span>,
                id: "Name",
                minSize: 120,
            }),

            columnHelper.accessor("price", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Price</span>,
                id: "Price",
                minSize: 120,
            }),

            columnHelper.accessor("type", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Type</span>,
                id: "Type",
                minSize: 120,
            }),

            columnHelper.accessor("frameType", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Frame Type</span>,
                id: "Frame Type",
                minSize: 120,
            }),

            columnHelper.accessor("desc", {
                cell: ({ row }) => createCellTooltip(row.original.desc, row.original.desc),
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Description</span>,
                id: "Description",
                minSize: 120,
            }),

            columnHelper.accessor("atk", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Attack</span>,
                id: "Attack",
                minSize: 120,
            }),

            columnHelper.accessor("def", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Defense</span>,
                id: "Defense",
                minSize: 120,
            }),

            columnHelper.accessor("level", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Level</span>,
                id: "Level",
                minSize: 120,
            }),

            columnHelper.accessor("race", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Race</span>,
                id: "Race",
                minSize: 120,
            }),

            columnHelper.accessor("attribute", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Attribute</span>,
                id: "Attribute",
                minSize: 120,
            }),

            columnHelper.accessor("archetype", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Archetype</span>,
                id: "Archetype",
                minSize: 120,
            }),

            columnHelper.accessor("ygoprodeck_url", {
                cell: ({ row }) => (
                    <Link href={row.original.ygoprodeck_url} target="_blank">
                        {row.original.ygoprodeck_url}
                    </Link>
                ),
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>YGO Pro Deck Url</span>,
                id: "YGO Pro Deck Url",
                minSize: 120,
            }),

            columnHelper.accessor("pend_desc", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Pendulum Description</span>,
                id: "Pendulum Description",
                minSize: 120,
            }),

            columnHelper.accessor("monster_desc", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Monster Description</span>,
                id: "Monster Description",
                minSize: 120,
            }),

            columnHelper.accessor("scale", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Scale</span>,
                id: "Scale",
                minSize: 120,
            }),

            columnHelper.accessor("linkval", {
                enableColumnFilter: true,
                enableResizing: true,
                filterFn: customFilter,
                footer: (props) => props.column.id,
                header: () => <span>Linkval</span>,
                id: "Linkval",
                minSize: 120,
            }),

            columnHelper.display({
                cell: ({ row, table }) => <TableBodyRowDelete row={row} table={table} />,
                footer: (props) => props.column.id,
                header: () => <TableHeaderDelete />,
                id: hideForColumnsMap.delete,
            }),
        ],
        [hideForColumnsMap],
    )

    return { columns, hideForColumns }
}
