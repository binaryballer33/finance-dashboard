"use client"

import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"

import CustomTable from "@/components/tables/table"

import useCreateIncomeTableColumns from "./use-create-income-table-columns"

type IncomeTableProps = {
    userId: string
}

export default function IncomeTable(props: IncomeTableProps) {
    const { userId } = props
    const { columns, hideForColumns } = useCreateIncomeTableColumns()

    const { data: income } = useGetIncomeByUserIdQuery(userId)

    return (
        <CustomTable
            columns={columns as any}
            data={income as any}
            hideForColumns={hideForColumns}
            recordsPerPage={[10, 20, 30, 40, 50, 100]}
            width="100%"
        />
    )
}
