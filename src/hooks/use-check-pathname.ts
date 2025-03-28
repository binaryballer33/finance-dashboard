import { usePathname } from "next/navigation"

export default function useCheckPathname() {
    const pathname = usePathname()

    const isLinkActive = (route: string) => pathname === route

    return { isLinkActive, pathname }
}
