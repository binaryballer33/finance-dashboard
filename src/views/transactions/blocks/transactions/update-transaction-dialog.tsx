"use client"

import type { Transaction } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

import { TransactionSchema } from "@/types/forms/transaction"

import { useForm } from "react-hook-form"

import useUpdateTransactionMutation from "@/api/transactions/mutations/use-update-transaction"
import categories from "@/mocks/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"

import RHFCalendar from "@/components/forms/rhf-calendar"
import CreateTransactionInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type UpdateTransactionDialogProps = {
    setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    transaction: Transaction
    updateRecordDialogOpen: boolean
    userId: string
}

type FormValues = Pick<Transaction, "amount" | "category" | "date" | "description">

export default function UpdateTransactionDialog(props: UpdateTransactionDialogProps) {
    const { setUpdateRecordDialogOpen, transaction, updateRecordDialogOpen, userId } = props
    const { mutateAsync: updateTransaction } = useUpdateTransactionMutation()

    const form = useForm<FormValues>({
        resolver: zodResolver(TransactionSchema),
        values: transaction,
    })

    if (!transaction) return null
    if (transaction.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Transaction")
        return null
    }

    async function onSubmit(data: FormValues) {
        await updateTransaction({
            ...data,
            id: transaction.id,
            userId,
        })

        setUpdateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setUpdateRecordDialogOpen} open={updateRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Transaction</DialogTitle>
                    <DialogDescription>Edit The Details Of Your Transaction Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateTransactionInput<Transaction> label="Amount" name="amount" type="number" />

                        <RHFSelect label="Category" name="category" options={categories} />

                        <CreateTransactionInput<Transaction> label="Description" name="description" type="text" />

                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setUpdateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Update Transaction</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
