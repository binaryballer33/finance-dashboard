"use client"

import type { Trade } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"

import { TradeSchema } from "@/types/forms/trade"

import { useForm } from "react-hook-form"

import useUpdateTradeMutation from "@/api/trades/mutations/use-update-trade"
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
import CreateTradeInput from "@/components/forms/rhf-custom-input"
import RHFSelect from "@/components/forms/rhf-select"

type UpdateTradeDialogProps = {
    setUpdateRecordDialogOpen: Dispatch<SetStateAction<boolean>>
    trade: Trade
    updateRecordDialogOpen: boolean
    userId: string
}

export default function UpdateTradeDialog(props: UpdateTradeDialogProps) {
    const { setUpdateRecordDialogOpen, trade, updateRecordDialogOpen, userId } = props
    const { mutateAsync: updateTrade } = useUpdateTradeMutation()

    const form = useForm<Trade>({
        resolver: zodResolver(TradeSchema),
        values: trade,
    })

    if (!trade) return null
    if (trade.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Trade")
        return null
    }

    async function onSubmit(data: Trade) {
        await updateTrade({ ...data, id: trade.id })
        setUpdateRecordDialogOpen(false)
    }

    const realizedOptions = [
        { label: "GAIN", value: "GAIN" },
        { label: "LOSS", value: "LOSS" },
    ]

    const typeOptions = [
        { label: "SELL_CALL", value: "SELL_CALL" },
        { label: "SELL_PUT", value: "SELL_PUT" },
    ]

    return (
        <Dialog onOpenChange={setUpdateRecordDialogOpen} open={updateRecordDialogOpen}>
            <DialogContent className="max-h-[700px] overflow-auto sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Update Trade</DialogTitle>
                    <DialogDescription>Edit The Details Of Your Trade Below.</DialogDescription>
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
                            <Button onClick={() => setUpdateRecordDialogOpen(false)} type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Update Trade</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
