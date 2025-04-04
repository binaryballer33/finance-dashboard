"use client"

import type { Transaction } from "@/types/forms/transaction"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesTransaction as defaultValues, TransactionSchema } from "@/types/forms/transaction"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import createTransaction from "@/actions/transactions/mutations/create-transaction"

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

import categories from "./categories"

type CreateNewRecordDialogProps = {
    open: boolean
    setCreateNewRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateNewRecordDialog(props: CreateNewRecordDialogProps) {
    const { open, setCreateNewRecordDialogOpen, userId } = props

    const form = useForm<Transaction>({ defaultValues, resolver: zodResolver(TransactionSchema) })

    async function onSubmit(data: Transaction) {
        const transaction = await createTransaction({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            userId,
        })

        setCreateNewRecordDialogOpen(false)

        if (transaction) {
            toast.success("Transaction Created Successfully")
        } else {
            toast.error("Failed to create transaction")
        }
    }

    return (
        <Dialog onOpenChange={setCreateNewRecordDialogOpen} open={open}>
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
                            <Button onClick={() => setCreateNewRecordDialogOpen(false)} type="button" variant="outline">
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
