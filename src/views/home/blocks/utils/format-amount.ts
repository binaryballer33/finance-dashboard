export default function formatAmount(amount: number) {
    return amount.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}
