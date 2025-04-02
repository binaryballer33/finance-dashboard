"use client"

import useGetExpensesByUserIdQuery from "@/api/expenses/queries/use-get-expenses-by-userId"

import CustomTable from "@/components/tables/table"

import useCreateExpensesTableColumns from "./use-create-expenses-table-columns"

type ExpensesTableProps = {
    userId: string
}

export default function ExpensesTable(props: ExpensesTableProps) {
    const { userId } = props
    const { columns, hideForColumns } = useCreateExpensesTableColumns()

    const { data: expenses = [] } = useGetExpensesByUserIdQuery(userId)

    return (
        <CustomTable
            columns={columns as any}
            data={expenses as any}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
