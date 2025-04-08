"use client"

import type { Income } from "@prisma/client"

import { useState } from "react"

import useGetIncomeByUserIdQuery from "@/api/incomes/queries/use-get-income-by-userId"

import CustomTable from "@/components/tables/table"

import CreateNewIncomeDialog from "./create-income-dialog"
import DeleteIncomeDialog from "./delete-income-dialog"
import IncomeRowDetail from "./income-row-expand"
import UpdateIncomeDialog from "./update-income-dialog"
import useCreateIncomeTableColumns from "./use-create-income-table-columns"

type IncomeTableProps = {
    userId: string
}

export default function IncomeTable(props: IncomeTableProps) {
    const { userId } = props
    const { columns } = useCreateIncomeTableColumns()

    const [createNewRecordDialogOpen, setCreateNewRecordDialogOpen] = useState(false)
    const [updateDialogOpen, setUpdateRecordDialogOpen] = useState(false)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)
    const [selectedIncome, setSelectedRecord] = useState<Income | null>(null)

    const { data: income = [] } = useGetIncomeByUserIdQuery(userId)

    return (
        <>
            <CustomTable
                columns={columns}
                columnsToAdd={{
                    addDeleteRowColumn: true,
                    addExpandRowColumn: true,
                    addHideRowColumn: true,
                    addSelectRowsColumn: true,
                    addUpdateRowColumn: true,
                }}
                createRecordButton={{
                    createNewRecordButtonTooltipContent: "Create New Income",
                    setCreateNewRecordDialogOpen,
                    userId,
                }}
                data={income}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord,
                }}
                expandRowDetailComponent={IncomeRowDetail}
                updateRecordButton={{
                    setSelectedRecord,
                    setUpdateRecordDialogOpen,
                }}
            />

            {selectedIncome && (
                <UpdateIncomeDialog
                    income={selectedIncome}
                    setUpdateRecordDialogOpen={setUpdateRecordDialogOpen}
                    updateRecordDialogOpen={updateDialogOpen}
                    userId={userId}
                />
            )}

            {selectedIncome && (
                <DeleteIncomeDialog
                    deleteRecordDialogOpen={deleteRecordDialogOpen}
                    income={selectedIncome}
                    setDeleteRecordDialogOpen={setDeleteRecordDialogOpen}
                    userId={userId}
                />
            )}

            <CreateNewIncomeDialog
                createNewIncomeDialogOpen={createNewRecordDialogOpen}
                setCreateNewIncomeDialogOpen={setCreateNewRecordDialogOpen}
                userId={userId}
            />
        </>
    )
}
