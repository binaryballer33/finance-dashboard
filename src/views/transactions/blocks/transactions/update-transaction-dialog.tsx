"use client"

import type { Transaction } from "@prisma/client"

import useUpdateTransactionMutation from "@/api/transactions/mutations/use-update-transaction-mutation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type UpdateTransactionDialogProps = {
    setUpdateRecordDialogOpen: (open: boolean) => void
    transaction: Transaction
    updateRecordDialogOpen: boolean
    userId: string
}

export default function UpdateTransactionDialog(props: UpdateTransactionDialogProps) {
    const { setUpdateRecordDialogOpen, transaction, updateRecordDialogOpen, userId } = props
    const { mutateAsync: updateTransaction } = useUpdateTransactionMutation()

    if (!transaction) return null
    if (transaction.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Transaction")
        return null
    }

    async function onSubmit(data: Transaction) {
        await updateTransaction({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            id: transaction.id,
            userId,
        })

        setUpdateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setUpdateRecordDialogOpen} open={updateRecordDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>Dialog For Updating A Transaction</DialogDescription>
                    <DialogTitle>
                        <Card>
                            <CardHeader>
                                <CardTitle>Update Transaction</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <span>Amount: {transaction.amount} USD</span>
                                <span>Description: {transaction.description}</span>
                                <span>Category: {transaction.category}</span>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <span>Date Of Transaction: {transaction.date.toLocaleDateString()}</span>
                                <Button onClick={() => onSubmit(transaction)} variant="default">
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
