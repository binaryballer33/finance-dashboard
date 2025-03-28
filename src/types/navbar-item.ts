import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons"

export type NavBarItem = {
    route: string
    separator?: boolean
    subMenu?: NavBarItem[]
    title: string
}

export type NavBarItemWithIcon = {
    icon: IconType | LucideIcon
    route: string
    separator?: boolean
    subMenu?: NavBarItemWithIcon[]
    title: string
}
