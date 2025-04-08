"use client"

import type { Income } from "@/types/forms/income"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesIncome as defaultValues, IncomeSchema } from "@/types/forms/income"

import { useForm } from "react-hook-form"

import useCreateIncomeMutation from "@/api/incomes/mutations/use-create-income"
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
import CreateIncomeInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type CreateNewIncomeDialogProps = {
    createNewIncomeDialogOpen: boolean
    setCreateNewIncomeDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateNewIncomeDialog(props: CreateNewIncomeDialogProps) {
    const { createNewIncomeDialogOpen, setCreateNewIncomeDialogOpen, userId } = props

    const form = useForm<Income>({ defaultValues, resolver: zodResolver(IncomeSchema) })
    const { mutateAsync: createIncome } = useCreateIncomeMutation()

    async function onSubmit(data: Income) {
        await createIncome({
            amount: data.amount,
            category: data.category,
            date: new Date(data.date),
            description: data.description,
            userId,
        })

        setCreateNewIncomeDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setCreateNewIncomeDialogOpen} open={createNewIncomeDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create A New Income</DialogTitle>
                    <DialogDescription>Enter The Details Of Your Income Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateIncomeInput inputName="amount" label="Amount" />
                        <RHFSelect label="Category" name="category" options={categories} />
                        <CreateIncomeInput inputName="description" label="Description" />
                        <RHFCalendar label="Date" name="date" />

                        <DialogFooter>
                            <Button onClick={() => setCreateNewIncomeDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Create Income</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
