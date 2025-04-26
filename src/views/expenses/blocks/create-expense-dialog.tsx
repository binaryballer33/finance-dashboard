"use client"

import type { Expense } from "@/types/forms/expense"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesExpense as defaultValues, ExpenseSchema } from "@/types/forms/expense"

import { useForm } from "react-hook-form"

import useCreateExpenseMutation from "@/api/expenses/mutations/use-create-expense"
import categories from "@/mocks/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionType } from "@prisma/client"

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
import CreateExpenseInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type CreateExpenseDialogProps = {
    createRecordDialogOpen: boolean
    setCreateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateExpenseDialog(props: CreateExpenseDialogProps) {
    const { createRecordDialogOpen, setCreateRecordDialogOpen, userId } = props

    const form = useForm<Expense>({ defaultValues, resolver: zodResolver(ExpenseSchema) })
    const { mutateAsync: createExpense } = useCreateExpenseMutation()

    async function onSubmit(data: Expense) {
        await createExpense({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            type: data.type,
            userId,
        })

        setCreateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setCreateRecordDialogOpen} open={createRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create A New Expense</DialogTitle>
                    <DialogDescription>Enter The Details Of Your Expense Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateExpenseInput<Expense> label="Amount" name="amount" type="number" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateExpenseInput<Expense> label="Description" name="description" type="text" />
                        <RHFCalendar label="Date" name="date" />
                        <RHFSelect
                            label="Type"
                            name="type"
                            options={[
                                { color: "bg-emerald-500", label: "One Time", value: TransactionType.ONE_TIME },
                                { color: "bg-rose-500", label: "Recurring", value: TransactionType.RECURRING },
                            ]}
                        />
                        <DialogFooter>
                            <Button onClick={() => setCreateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Create Expense</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
