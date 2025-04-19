"use client"

import type { Income } from "@prisma/client"

import useDeleteIncomeMutation from "@/api/incomes/mutations/use-delete-income"
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

type DeleteIncomeDialogProps = {
    deleteRecordDialogOpen: boolean
    income: Income
    setDeleteRecordDialogOpen: (open: boolean) => void
    userId: string
}

export default function DeleteIncomeDialog(props: DeleteIncomeDialogProps) {
    const { deleteRecordDialogOpen, income, setDeleteRecordDialogOpen, userId } = props
    const { mutateAsync: deleteIncome } = useDeleteIncomeMutation()

    if (!income) return null
    if (income.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Income")
        return null
    }

    async function onSubmit(data: Income) {
        await deleteIncome(data)
        setDeleteRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setDeleteRecordDialogOpen} open={deleteRecordDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Delete Income</DialogTitle>
                    <DialogDescription>Dialog For Deleting An Income</DialogDescription>
                </DialogHeader>
                <Card className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="text-lg">Amount: </span>
                            <span className="ml-2 text-lg font-medium">{income.amount} USD</span>
                        </div>

                        <div
                            className={`flex items-center ${income.description?.length && income.description.length > 15 ? "flex-col !items-start gap-1" : ""}`}
                        >
                            <span className="text-lg">Description: </span>
                            <span className="ml-2 text-lg font-medium">{income.description}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Category: </span>
                            <span className="ml-2 text-lg font-medium">{income.category}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Date Of Income: </span>
                            <span className="ml-2 text-lg font-medium">{income.date.toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Type: </span>
                            <span className="ml-2 text-lg font-medium">{income.type}</span>
                        </div>
                    </div>
                </Card>
                <DialogFooter>
                    <Button
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        onClick={() => onSubmit(income)}
                        variant="default"
                    >
                        Delete Income
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
