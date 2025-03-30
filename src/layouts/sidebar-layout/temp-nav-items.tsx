import { ArrowLeftRight, BarChart3, Home, Lock, LogIn, LogOut, PiggyBank, Settings, User, UserPlus } from "lucide-react"

import routes from "@/routes/routes"

const navItems = [
    {
        href: routes.home,
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
    {
        href: routes.auth.login,
        icon: LogIn,
        title: "Login",
    },
    {
        href: routes.auth.register,
        icon: UserPlus,
        title: "Sign Up",
    },
    {
        href: routes.auth.forgotPassword,
        icon: Lock,
        title: "Forgot Password",
    },
]

export default navItems
