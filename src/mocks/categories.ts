import type { Category } from "@/types/forms/expense-categories"

import { BookOpen, Car, CircleHelp, Clapperboard, House, ShoppingCart, SubscriptIcon, Zap } from "lucide-react"
import { GiFruitBowl, GiGymBag } from "react-icons/gi"
import { IoFastFoodOutline } from "react-icons/io5"

const categories: Category = [
    { color: "#FF6384", icon: IoFastFoodOutline, label: "Food", value: "Food" },
    { color: "#36A2EB", icon: Car, label: "Transportation", value: "Transportation" },
    { color: "#FFCE56", icon: Clapperboard, label: "Entertainment", value: "Entertainment" },
    { color: "#8AC926", icon: ShoppingCart, label: "Shopping", value: "Shopping" },
    { color: "#9966FF", icon: House, label: "Housing", value: "Housing" },
    { color: "#FF6384", icon: Zap, label: "Utilities", value: "Utilities" },
    { color: "#8AC926", icon: CircleHelp, label: "Other", value: "Other" },
    { color: "#36A2EB", icon: BookOpen, label: "Education", value: "Education" },
    { color: "#FFCE56", icon: GiGymBag, label: "Health", value: "Health" },
    { color: "#9966FF", icon: SubscriptIcon, label: "Subscriptions", value: "Subscriptions" },
    { color: "#FF6384", icon: GiFruitBowl, label: "Groceries", value: "Groceries" },
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
