"use client"

import useGetExpensesByUserIdQuery from "@/api/expenses/queries/use-get-expenses-by-userId"

import CustomTable from "@/components/tables/table"

import useCreateExpensesTableColumns from "./use-create-expenses-table-columns"

type ExpensesTableProps = {
    userId: string
}

export default function ExpensesTable(props: ExpensesTableProps) {
    const { userId } = props
    const { columns } = useCreateExpensesTableColumns()

    const { data: expenses = [] } = useGetExpensesByUserIdQuery(userId)

    return <CustomTable columns={columns} data={expenses} width="100%" />
}
