"use client"

import type { Expense } from "@prisma/client"

import useDeleteExpenseMutation from "@/api/expenses/mutations/use-delete-expense"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type DeleteExpenseDialogProps = {
    deleteRecordDialogOpen: boolean
    expense: Expense
    setDeleteRecordDialogOpen: (open: boolean) => void
    userId: string
}

export default function DeleteExpenseDialog(props: DeleteExpenseDialogProps) {
    const { deleteRecordDialogOpen, expense, setDeleteRecordDialogOpen, userId } = props
    const { mutateAsync: deleteExpense } = useDeleteExpenseMutation()

    if (!expense) return null
    if (expense.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Expense")
        return null
    }

    async function onSubmit(data: Expense) {
        await deleteExpense(data)
        setDeleteRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setDeleteRecordDialogOpen} open={deleteRecordDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Delete Expense</DialogTitle>
                    <DialogDescription>Dialog For Deleting A Expense</DialogDescription>
                </DialogHeader>
                <Card className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="text-lg">Amount: </span>
                            <span className="ml-2 text-lg font-medium">{expense.amount} USD</span>
                        </div>
                        <div
                            className={`flex items-center ${expense.description?.length && expense.description.length > 15 ? "flex-col !items-start gap-1" : ""}`}
                        >
                            <span className="text-lg">Description: </span>
                            <span className="ml-2 text-lg font-medium">{expense.description}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Category: </span>
                            <span className="ml-2 text-lg font-medium">{expense.category}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Date Of Income: </span>
                            <span className="ml-2 text-lg font-medium">{expense.date.toLocaleDateString()}</span>
                        </div>
                    </div>
                </Card>
                <DialogFooter>
                    <Button
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        onClick={() => onSubmit(expense)}
                        variant="default"
                    >
                        Delete Expense
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
