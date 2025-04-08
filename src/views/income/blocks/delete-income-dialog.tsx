"use client"

import type { Income } from "@prisma/client"

import useDeleteIncomeMutation from "@/api/incomes/mutations/use-delete-income"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>Dialog For Deleting An Income</DialogDescription>
                    <DialogTitle>
                        <Card>
                            <CardHeader>
                                <CardTitle>Delete Income</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <span>Amount: {income.amount} USD</span>
                                <span>Description: {income.description}</span>
                                <span>Category: {income.category}</span>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <span>Date Of Income: {income.date.toLocaleDateString()}</span>
                                <Button onClick={() => onSubmit(income)} variant="default">
                                    Delete Income
                                </Button>
                            </CardFooter>
                        </Card>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
