"use client"

import type { Transaction } from "@/types/forms/transaction"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesTransaction as defaultValues, TransactionSchema } from "@/types/forms/transaction"

import { useForm } from "react-hook-form"

import useCreateTransactionMutation from "@/api/transactions/mutations/use-create-transaction"
import categories from "@/mocks/categories"
import { zodResolver } from "@hookform/resolvers/zod"

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

type CreateTransactionDialogProps = {
    createRecordDialogOpen: boolean
    setCreateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateTransactionDialog(props: CreateTransactionDialogProps) {
    const { createRecordDialogOpen, setCreateRecordDialogOpen, userId } = props

    const form = useForm<Transaction>({ defaultValues, resolver: zodResolver(TransactionSchema) })
    const { mutateAsync: createTransaction } = useCreateTransactionMutation()

    async function onSubmit(data: Transaction) {
        await createTransaction({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            userId,
        })

        setCreateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setCreateRecordDialogOpen} open={createRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create A New Transaction</DialogTitle>
                    <DialogDescription>Enter The Details Of Your Transaction Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateTransactionInput inputName="amount" label="Amount" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateTransactionInput inputName="description" label="Description" />
                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setCreateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Create Transaction</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
