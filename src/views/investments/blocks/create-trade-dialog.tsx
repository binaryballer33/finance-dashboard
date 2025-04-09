"use client"

import type { Trade } from "@/types/forms/trade"
import type { Dispatch, SetStateAction } from "react"

import { defaultValuesTrade as defaultValues, TradeSchema } from "@/types/forms/trade"

import { useForm } from "react-hook-form"

import useCreateTradeMutation from "@/api/trades/mutations/use-create-trade"
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
import CreateTradeInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type CreateTradeDialogProps = {
    createRecordDialogOpen: boolean
    setCreateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    userId: string
}

export default function CreateTradeDialog(props: CreateTradeDialogProps) {
    const { createRecordDialogOpen, setCreateRecordDialogOpen, userId } = props

    const realizedOptions = [
        { label: "GAIN", value: "GAIN" },
        { label: "LOSS", value: "LOSS" },
    ]

    const typeOptions = [
        { label: "SELL_CALL", value: "SELL_CALL" },
        { label: "SELL_PUT", value: "SELL_PUT" },
    ]

    const form = useForm<Trade>({ defaultValues, resolver: zodResolver(TradeSchema) })
    const { mutateAsync: createTrade } = useCreateTradeMutation()

    async function onSubmit(data: Trade) {
        await createTrade({ ...data, userId })
        setCreateRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setCreateRecordDialogOpen} open={createRecordDialogOpen}>
            <DialogContent className="max-h-[700px] overflow-auto sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create A New Trade</DialogTitle>
                    <DialogDescription>Enter The Details Of Your Trade Below.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CreateTradeInput inputName="buyToClose" label="Buy To Close" />
                        <CreateTradeInput inputName="contracts" label="Contracts" />
                        <RHFCalendar label="Date" name="date" />
                        <CreateTradeInput inputName="profitLoss" label="Profit / Loss" />
                        <CreateTradeInput inputName="profitLossPercentage" label="Profit / Loss %" />
                        <RHFSelect label="Realized" name="realized" options={realizedOptions} />
                        <CreateTradeInput inputName="sellToOpen" label="Sell To Open" />
                        <CreateTradeInput inputName="strike" label="Strike" />
                        <CreateTradeInput inputName="ticker" label="Ticker" />
                        <RHFSelect label="Type" name="type" options={typeOptions} />

                        <DialogFooter>
                            <Button onClick={() => setCreateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Create Trade</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
