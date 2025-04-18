"use client"

import type { Expense } from "@prisma/client"

import { useState } from "react"

import CustomTable from "@/components/tables/table"

import CreateExpenseDialog from "./create-expense-dialog"
import DeleteExpenseDialog from "./delete-expense-dialog"
import ExpenseRowDetail from "./expense-row-expand"
import UpdateExpenseDialog from "./update-expense-dialog"
import useCreateExpensesTableColumns from "./use-create-expenses-table-columns"

type ExpensesTableProps = {
    expenses: Expense[]
    userId: string
}

export default function ExpensesTable(props: ExpensesTableProps) {
    const { expenses, userId } = props
    const { columns } = useCreateExpensesTableColumns()

    const [createRecordDialogOpen, setCreateRecordDialogOpen] = useState(false)
    const [deleteRecordDialogOpen, setDeleteRecordDialogOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<Expense | null>(null)
    const [updateRecordDialogOpen, setUpdateRecordDialogOpen] = useState(false)

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
                    setCreateRecordDialogOpen,
                    tooltipContent: "Create New Expense",
                    userId,
                }}
                data={expenses}
                deleteRecordButton={{
                    setDeleteRecordDialogOpen,
                    setSelectedRecord,
                }}
                expandRowDetailComponent={ExpenseRowDetail}
                updateRecordButton={{
                    setSelectedRecord,
                    setUpdateRecordDialogOpen,
                }}
            />

            {selectedRecord && (
                <UpdateExpenseDialog
                    expense={selectedRecord}
                    setUpdateRecordDialogOpen={setUpdateRecordDialogOpen}
                    updateRecordDialogOpen={updateRecordDialogOpen}
                    userId={userId}
                />
            )}

            {selectedRecord && (
                <DeleteExpenseDialog
                    deleteRecordDialogOpen={deleteRecordDialogOpen}
                    expense={selectedRecord}
                    setDeleteRecordDialogOpen={setDeleteRecordDialogOpen}
                    userId={userId}
                />
            )}

            <CreateExpenseDialog
                createRecordDialogOpen={createRecordDialogOpen}
                setCreateRecordDialogOpen={setCreateRecordDialogOpen}
                userId={userId}
            />
        </>
    )
}
