import { cn } from "@/lib/utils"

import useAuthUser from "@/hooks/useAuthUser"

import LoggedInAuthIcons from "../navbar-icons/auth-icons/logged-in-auth-icons"
import NotLoggedInAuthIcons from "../navbar-icons/auth-icons/not-logged-in-auth-icons"
import Logo from "../navbar-icons/logo/logo"
import ThemeToggle from "../navbar-icons/theme-toggle"

type MobileNavbarIconsProps = {
    className?: string
}

export default function MobileNavbarIcons(props: MobileNavbarIconsProps) {
    const { className } = props

    const { user } = useAuthUser()

    return (
        <div className={cn("flex  items-center justify-center space-x-4", className)}>
            {user ? <LoggedInAuthIcons /> : <NotLoggedInAuthIcons />}
            <Logo />
            <ThemeToggle />
        </div>
    )
}
