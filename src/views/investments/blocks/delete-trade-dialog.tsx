"use client"

import type { Trade } from "@prisma/client"

import useDeleteTradeMutation from "@/api/trades/mutations/use-delete-trade"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type DeleteTradeDialogProps = {
    deleteRecordDialogOpen: boolean
    setDeleteRecordDialogOpen: (open: boolean) => void
    trade: Trade
    userId: string
}

export default function DeleteTradeDialog(props: DeleteTradeDialogProps) {
    const { deleteRecordDialogOpen, setDeleteRecordDialogOpen, trade, userId } = props
    const { mutateAsync: deleteTrade } = useDeleteTradeMutation()

    if (!trade) return null
    if (trade.userId !== userId) {
        toast.error("You Are Not Authorized To Update This Trade")
        return null
    }

    async function onSubmit(data: Trade) {
        await deleteTrade(data)
        setDeleteRecordDialogOpen(false)
    }

    return (
        <Dialog onOpenChange={setDeleteRecordDialogOpen} open={deleteRecordDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Delete Trade</DialogTitle>
                    <DialogDescription>Dialog For Deleting A Trade</DialogDescription>
                </DialogHeader>
                <Card className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <span className="text-lg">Ticker: </span>
                            <span className="ml-2 text-lg font-medium">{trade.ticker}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Type: </span>
                            <span className="ml-2 text-lg font-medium">{trade.type}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Contracts: </span>
                            <span className="ml-2 text-lg font-medium">{trade.contracts}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Date: </span>
                            <span className="ml-2 text-lg font-medium">{trade.date.toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Profit / Loss: </span>
                            <span className="ml-2 text-lg font-medium">{trade.profitLoss}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Profit / Loss %: </span>
                            <span className="ml-2 text-lg font-medium">{trade.profitLossPercentage}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg">Realized: </span>
                            <span className="ml-2 text-lg font-medium">{trade.realized}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Buy To Close: </span>
                            <span className="ml-2 text-lg font-medium">{trade.buyToClose}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Sell To Open: </span>
                            <span className="ml-2 text-lg font-medium">{trade.sellToOpen}</span>
                        </div>

                        <div className="flex items-center">
                            <span className="text-lg">Strike: </span>
                            <span className="ml-2 text-lg font-medium">{trade.strike}</span>
                        </div>
                    </div>
                </Card>
                <DialogFooter>
                    <Button
                        className="w-full bg-red-600 text-white hover:bg-red-700"
                        onClick={() => onSubmit(trade)}
                        variant="default"
                    >
                        Delete Trade
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
