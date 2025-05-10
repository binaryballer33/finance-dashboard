import type { Category } from "@/types/forms/expense-categories"

import { BookOpen, Car, CircleHelp, Clapperboard, House, Plane, ShoppingCart, SubscriptIcon, Zap } from "lucide-react"
import { GiGymBag } from "react-icons/gi"
import { IoFastFoodOutline } from "react-icons/io5"

const categories: Category = [
    { color: "#9966FF", icon: House, label: "Housing", value: "Housing" },
    { color: "#36A2EB", icon: Car, label: "Transportation", value: "Transportation" },
    { color: "#FF6384", icon: IoFastFoodOutline, label: "Food", value: "Food" },
    { color: "#FF6384", icon: Zap, label: "Utilities", value: "Utilities" },
    { color: "#FFCE56", icon: Clapperboard, label: "Entertainment", value: "Entertainment" },
    { color: "#FFCE56", icon: GiGymBag, label: "Health", value: "Health" },
    { color: "#36A2EB", icon: BookOpen, label: "Education", value: "Education" },
    { color: "#8AC926", icon: ShoppingCart, label: "Shopping", value: "Shopping" },
    { color: "#9966FF", icon: SubscriptIcon, label: "Subscriptions", value: "Subscriptions" },
    { color: "#36A2EB", icon: Plane, label: "Travel", value: "Travel" },
    { color: "#8AC926", icon: CircleHelp, label: "Other", value: "Other" },
]

const categoryColors: Record<string, string> = categories.reduce(
    (acc, category) => ({
        ...acc,
        [category.value]: category.color,
    }),
    {},
)

export { categoryColors }

export default categories
