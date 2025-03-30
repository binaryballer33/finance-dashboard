import { ArrowLeftRight, BarChart3, Home, LogOut, PiggyBank, Settings, User } from "lucide-react"

import routes from "@/routes/routes"

const navItems = [
    {
        href: routes.user.home,
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
        href: routes.user.profile,
        icon: User,
        title: "Profile",
    },
    {
        href: routes.user.settings,
        icon: Settings,
        title: "Settings",
    },
    {
        href: routes.auth.signOut,
        icon: LogOut,
        title: "Logout",
    },
]

export default navItems
