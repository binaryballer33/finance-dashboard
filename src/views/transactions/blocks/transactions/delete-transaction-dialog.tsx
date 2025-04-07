"use client"

import type { Transaction } from "@prisma/client"

import useDeleteTransactionMutation from "@/api/transactions/mutations/use-delete-transaction"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>Dialog For Deleting A Transaction</DialogDescription>
                    <DialogTitle>
                        <Card>
                            <CardHeader>
                                <CardTitle>Delete Transaction</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <span>Amount: {transaction.amount} USD</span>
                                <span>Description: {transaction.description}</span>
                                <span>Category: {transaction.category}</span>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <span>Date Of Transaction: {transaction.date.toLocaleDateString()}</span>
                                <Button onClick={() => onSubmit(transaction)} variant="default">
                                    Delete Transaction
                                </Button>
                            </CardFooter>
                        </Card>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
