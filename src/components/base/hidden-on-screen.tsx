import type { ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

type ScreenSize = "lg" | "md" | "sm" | "xl" | "xs"

type DisplayType = "block" | "inline"

type HiddenOnScreenProps = {
    children?: ReactNode
    className?: string
    component?: ElementType
    size: ScreenSize
    sizeToShow: ScreenSize
    sizeToShowDisplayType?: DisplayType
    title?: string
} & ({ children: ReactNode } | { title: string })

const breakpointClasses: Record<ScreenSize, string> = {
    lg: "lg",
    md: "md",
    sm: "sm",
    xl: "xl",
    xs: "xs",
}

/*
 * Hides the element is the screen size is smaller than the prop size
 * Doing it this way helps up with the responsive layout and bypass using useTheme useMediaQuery
 * Therefore not being the reason the component has to be converted to a client component
 */
export default function HiddenOnScreen(props: HiddenOnScreenProps) {
    const {
        children,
        className,
        component: Component = "span",
        size,
        sizeToShow,
        sizeToShowDisplayType = "inline",
        title,
    } = props

    // Build the display classes based on breakpoints
    const displayClasses = cn(
        // Hide at specified size and below
        `${breakpointClasses[size]}:hidden`,

        // Show at specified size
        `${breakpointClasses[sizeToShow]}:${sizeToShowDisplayType === "block" ? "block" : "inline"}`,

        // Hidden by default (below the show breakpoint)
        "hidden",

        className,
    )

    if (title) {
        return <span className={displayClasses}>{title}</span>
    }

    return <Component className={displayClasses}>{children}</Component>
}
