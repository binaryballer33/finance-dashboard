import { Car, CircleHelp, Clapperboard, House, ShoppingCart, Zap } from "lucide-react"
import { IoFastFoodOutline } from "react-icons/io5"

const categories = [
    {
        icon: IoFastFoodOutline,
        label: "Food",
        value: "Food",
    },
    {
        icon: Car,
        label: "Transportation",
        value: "Transportation",
    },
    {
        icon: Clapperboard,
        label: "Entertainment",
        value: "Entertainment",
    },
    {
        icon: ShoppingCart,
        label: "Shopping",
        value: "Shopping",
    },
    {
        icon: House,
        label: "Housing",
        value: "Housing",
    },
    {
        icon: Zap,
        label: "Utilities",
        value: "Utilities",
    },
    {
        icon: CircleHelp,
        label: "Other",
        value: "Other",
    },
]

export default categories
