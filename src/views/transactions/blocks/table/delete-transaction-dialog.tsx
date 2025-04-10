"use client"

import type { Transaction } from "@prisma/client"

import useDeleteTransactionMutation from "@/api/transactions/mutations/use-delete-transaction"
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

type DeleteTransactionDialogProps = {
    deleteRecordDialogOpen: boolean
    setDeleteRecordDialogOpen: (open: boolean) => void
    transaction: Transaction
    userId: string
}

export default function DeleteTransactionDialog(props: DeleteTransactionDialogProps) {
    const { deleteRecordDialogOpen, setDeleteRecordDialogOpen, transaction, userId } = props
    const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation()

    if (!transaction) return null
    if (transaction.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Transaction")
        return null
    }

    async function onSubmit(data: Transaction) {
        await deleteTransaction(data)
        setDeleteRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setDeleteRecordDialogOpen} open={deleteRecordDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Delete Transaction</DialogTitle>
                    <DialogDescription>Dialog For Deleting A Transaction</DialogDescription>
                </DialogHeader>
                <Card className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="text-lg">Amount: </span>
                            <span className="ml-2 text-lg font-medium">{transaction.amount} USD</span>
                        </div>
                        <div
                            className={`flex items-center ${transaction.description?.length && transaction.description.length > 15 ? "flex-col !items-start gap-1" : ""}`}
                        >
                            <span className="text-lg">Description: </span>
                            <span className="ml-2 text-lg font-medium">{transaction.description}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Category: </span>
                            <span className="ml-2 text-lg font-medium">{transaction.category}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Date Of Income: </span>
                            <span className="ml-2 text-lg font-medium">{transaction.date.toLocaleDateString()}</span>
                        </div>
                    </div>
                </Card>
                <DialogFooter>
                    <Button
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        onClick={() => onSubmit(transaction)}
                        variant="default"
                    >
                        Delete Transaction
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
