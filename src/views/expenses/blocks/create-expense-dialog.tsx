"use client"

import type { Expense } from "@/types/forms/expense"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesExpense as defaultValues, ExpenseSchema } from "@/types/forms/expense"

import { useForm } from "react-hook-form"

import useCreateExpenseMutation from "@/api/expenses/mutations/use-create-expense"
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
import CreateExpenseInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type CreateExpenseDialogProps = {
    createNewRecordDialogOpen: boolean
    setCreateNewRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateExpenseDialog(props: CreateExpenseDialogProps) {
    const { createNewRecordDialogOpen, setCreateNewRecordDialogOpen, userId } = props

    const form = useForm<Expense>({ defaultValues, resolver: zodResolver(ExpenseSchema) })
    const { mutateAsync: createExpense } = useCreateExpenseMutation()

    async function onSubmit(data: Expense) {
        await createExpense({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            userId,
        })

        setCreateNewRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setCreateNewRecordDialogOpen} open={createNewRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create A New Expense</DialogTitle>
                    <DialogDescription>Enter The Details Of Your Expense Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateExpenseInput inputName="amount" label="Amount" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateExpenseInput inputName="description" label="Description" />
                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setCreateNewRecordDialogOpen(false)} type="button" variant="outline">
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
