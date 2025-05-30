import type { Expense } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"

import { createColumnHelper } from "@tanstack/react-table"

import customFilter from "@/components/tables/table-utils/filters/custom-filter/custom-filter"

const columnHelper = createColumnHelper<Expense>()

export default function useCreateExpensesTableColumns() {
    // create the columns for the table, the id is also being used to create the header tooltip content
    const columns = [
        columnHelper.accessor("category", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            header: () => <span>Category</span>,
            id: "Category",
            minSize: 120,
        }),

        columnHelper.accessor("amount", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            header: () => <span>Amount</span>,
            id: "Amount",
            minSize: 120,
        }),

        columnHelper.accessor("description", {
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            header: () => <span>Description</span>,
            id: "Description",
            minSize: 120,
        }),

        columnHelper.accessor("date", {
            cell: ({ row }) => {
                const { date } = row.original
                return <span>{date.toLocaleDateString()}</span>
            },
            enableColumnFilter: true,
            enableResizing: true,
            filterFn: customFilter,
            header: () => <span>Date</span>,
            id: "Date",
            minSize: 120,
        }),

        columnHelper.accessor("type", {
            cell: ({ row }) => {
                const { type } = row.original
                return <span>{type}</span>
            },
            header: () => <span>Type</span>,
            id: "Type",
            minSize: 80,
        }),
    ] as ColumnDef<Expense>[]

    return { columns }
}
