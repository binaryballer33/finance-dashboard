import { type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    disableGutters?: boolean
    maxWidth?: "2xl" | "full" | "lg" | "md" | "sm" | "xl" | "xs"
}

export default function Container(props: ContainerProps) {
    const { children, className, disableGutters = false, maxWidth = "lg", ...restOfProps } = props

    return (
        <div
            className={cn(
                "mx-auto w-full",
                // Padding/gutters
                !disableGutters && "px-4 sm:px-6 lg:px-8",
                // Max-width variants
                maxWidth === "xs" && "max-w-screen-xs",
                maxWidth === "sm" && "max-w-screen-sm",
                maxWidth === "md" && "max-w-screen-md",
                maxWidth === "lg" && "max-w-screen-lg",
                maxWidth === "xl" && "max-w-screen-xl",
                maxWidth === "2xl" && "max-w-screen-2xl",
                maxWidth === "full" && "max-w-full",
                className,
            )}
            {...restOfProps}
        >
            {children}
        </div>
    )
}
