import DesktopNavbar from "@/layouts/main-layout/header/desktop-navbar/desktop-navbar"
import MobileNavbar from "@/layouts/main-layout/header/mobile-navbar/mobile-navbar"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur">
            <div className="container flex h-14 items-center">
                <MobileNavbar />
                <DesktopNavbar />
            </div>
        </header>
    )
}
