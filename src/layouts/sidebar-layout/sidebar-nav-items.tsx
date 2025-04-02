import { BarChart3, LayoutDashboard, PiggyBank, ReceiptText, Settings, User } from "lucide-react"
import { GiPayMoney } from "react-icons/gi"
import { TbMoneybag } from "react-icons/tb"

import routes from "@/routes/routes"

const navItems = [
    {
        href: routes.user.home,
        icon: LayoutDashboard,
        title: "Dashboard",
    },
    {
        href: routes.user.transactions,
        icon: ReceiptText,
        title: "Transactions",
    },
    {
        href: routes.user.investments,
        icon: BarChart3,
        title: "Investments",
    },
    {
        href: routes.user.savings,
        icon: PiggyBank,
        title: "Savings",
    },
    {
        href: routes.user.expenses,
        icon: GiPayMoney,
        title: "Expenses",
    },
    {
        href: routes.user.income,
        icon: TbMoneybag,
        title: "Income",
    },
    {
        href: routes.user.profile,
        icon: User,
        title: "Profile",
    },
    {
        href: routes.user.settings,
        icon: Settings,
        title: "Settings",
    },
]

export default navItems
