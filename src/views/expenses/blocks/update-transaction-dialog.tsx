"use client"

import type { Expense } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

import { ExpenseSchema } from "@/types/forms/expense"

import { useForm } from "react-hook-form"

import useUpdateExpenseMutation from "@/api/expenses/mutations/use-update-expense"
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
import CreateExpenseInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type UpdateExpenseDialogProps = {
    expense: Expense
    setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    updateRecordDialogOpen: boolean
    userId: string
}

type FormValues = Pick<Expense, "amount" | "category" | "date" | "description">

export default function UpdateExpenseDialog(props: UpdateExpenseDialogProps) {
    const { expense, setUpdateRecordDialogOpen, updateRecordDialogOpen, userId } = props
    const { mutateAsync: updateExpense } = useUpdateExpenseMutation()

    const form = useForm<FormValues>({
        resolver: zodResolver(ExpenseSchema),
        values: expense,
    })

    if (!expense) return null
    if (expense.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Expense")
        return null
    }

    async function onSubmit(data: FormValues) {
        await updateExpense({
            ...data,
            id: expense.id,
            userId,
        })

        setUpdateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setUpdateRecordDialogOpen} open={updateRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Expense</DialogTitle>
                    <DialogDescription>Edit The Details Of Your Expense Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateExpenseInput inputName="amount" label="Amount" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateExpenseInput inputName="description" label="Description" />
                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setUpdateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Update Expense</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
