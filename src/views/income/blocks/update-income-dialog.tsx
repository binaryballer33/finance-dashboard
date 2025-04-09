"use client"

import type { Income } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

import { IncomeSchema } from "@/types/forms/income"

import { useForm } from "react-hook-form"

import useUpdateIncomeMutation from "@/api/incomes/mutations/use-update-income"
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
import CreateIncomeInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type UpdateIncomeDialogProps = {
    income: Income
    setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    updateRecordDialogOpen: boolean
    userId: string
}

type FormValues = Pick<Income, "amount" | "category" | "date" | "description">

export default function UpdateIncomeDialog(props: UpdateIncomeDialogProps) {
    const { income, setUpdateRecordDialogOpen, updateRecordDialogOpen, userId } = props
    const { mutateAsync: updateIncome } = useUpdateIncomeMutation()

    const form = useForm<FormValues>({
        resolver: zodResolver(IncomeSchema),
        values: income,
    })

    if (!income) return null
    if (income.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Income")
        return null
    }

    async function onSubmit(data: FormValues) {
        await updateIncome({
            ...data,
            id: income.id,
            userId,
        })

        setUpdateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setUpdateRecordDialogOpen} open={updateRecordDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Income</DialogTitle>
                    <DialogDescription>Edit The Details Of Your Income Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateIncomeInput<Income> label="Amount" name="amount" type="number" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateIncomeInput<Income> label="Description" name="description" type="text" />
                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setUpdateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Update Income</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
