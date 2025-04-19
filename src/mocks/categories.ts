import type { Category } from "@/types/forms/expense-categories"

import { BookOpen, Car, CircleHelp, Clapperboard, House, ShoppingCart, SubscriptIcon, Zap } from "lucide-react"
import { GiFruitBowl, GiGymBag } from "react-icons/gi"
import { IoFastFoodOutline } from "react-icons/io5"

const categories: Category = [
    { icon: IoFastFoodOutline, label: "Food", value: "Food" },
    { icon: Car, label: "Transportation", value: "Transportation" },
    { icon: Clapperboard, label: "Entertainment", value: "Entertainment" },
    { icon: ShoppingCart, label: "Shopping", value: "Shopping" },
    { icon: House, label: "Housing", value: "Housing" },
    { icon: Zap, label: "Utilities", value: "Utilities" },
    { icon: CircleHelp, label: "Other", value: "Other" },
    { icon: BookOpen, label: "Education", value: "Education" },
    { icon: GiGymBag, label: "Health", value: "Health" },
    { icon: SubscriptIcon, label: "Subscriptions", value: "Subscriptions" },
    { icon: GiFruitBowl, label: "Groceries", value: "Groceries" },
]

export default categories
