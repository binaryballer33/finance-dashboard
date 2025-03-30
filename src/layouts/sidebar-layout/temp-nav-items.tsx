import { ArrowLeftRight, BarChart3, Home, PiggyBank, Settings, User } from "lucide-react"

const navItems = [
    {
        href: "#",
        icon: Home,
        isActive: true,
        title: "Dashboard",
    },
    {
        href: "#",
        icon: ArrowLeftRight,
        title: "Transactions",
    },
    {
        href: "#",
        icon: BarChart3,
        title: "Investments",
    },
    {
        href: "#",
        icon: PiggyBank,
        title: "Savings",
    },
    {
        href: "#",
        icon: User,
        title: "Profile",
    },
    {
        href: "#",
        icon: Settings,
        title: "Settings",
    },
]

export default navItems
