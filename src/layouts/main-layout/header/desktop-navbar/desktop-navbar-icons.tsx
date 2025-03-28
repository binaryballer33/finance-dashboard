import useAuthUser from "@/hooks/useAuthUser"

import LoggedInAuthIcons from "../navbar-icons/auth-icons/logged-in-auth-icons"
import NotLoggedInAuthIcons from "../navbar-icons/auth-icons/not-logged-in-auth-icons"
import ThemeToggle from "../navbar-icons/theme-toggle"

export default function DesktopNavbarIcons() {
    const { user } = useAuthUser()

    return (
        <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            {user ? <LoggedInAuthIcons /> : <NotLoggedInAuthIcons />}
        </div>
    )
}
