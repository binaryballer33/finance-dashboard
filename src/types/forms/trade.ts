import { TradeRealized, TradeType } from "@prisma/client"
import { z } from "zod"

export const TradeSchema = z.object({
    buyToClose: z.coerce.number().min(0, "Buy To Close Must Be At Least 0"),
    contracts: z.coerce.number().min(1, "Contracts Must Be At Least 1"),
    date: z.date({
        required_error: "Please Select A Date",
    }),
    profitLoss: z.coerce.number().min(0, "Profit Loss Must Be At Least 0"),
    profitLossPercentage: z.coerce.number().min(0, "Profit Loss Percentage Must Be At Least 0"),
    realized: z.nativeEnum(TradeRealized),
    sellToOpen: z.coerce.number().min(0, "Sell To Open Must Be At Least 0"),
    strike: z.coerce.number().min(0, "Strike Must Be At Least 0"),
    ticker: z.string().min(1, "Ticker Must Be At Least 1 Character"),
    type: z.nativeEnum(TradeType),
})

export type Trade = z.infer<typeof TradeSchema>

export const defaultValuesTrade = {
    buyToClose: 0,
    contracts: 1,
    date: new Date(),
    profitLoss: 100,
    profitLossPercentage: 100,
    realized: "GAIN",
    sellToOpen: 100,
    strike: 200,
    ticker: "AAPL",
    type: "SELL_CALL",
} satisfies Trade
