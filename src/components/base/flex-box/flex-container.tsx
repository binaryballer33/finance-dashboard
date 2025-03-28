import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type FlexDirection = "column-reverse" | "column" | "row-reverse" | "row"
type StackOn = "desktop" | "mobile" | "tablet"

export type FlexContainerProps = {
    children: React.ReactNode
    className?: string
    flexDirection?: FlexDirection
    stackOn?: StackOn
} & HTMLAttributes<HTMLDivElement>

export default function FlexContainer(props: FlexContainerProps) {
    const { children, className, flexDirection = "row", stackOn, ...restOfProps } = props

    const stackClasses = {
        desktop: "flex-col lg:flex-row",
        mobile: "flex-col sm:flex-row",
        tablet: "flex-col md:flex-row",
    }

    // Base direction classes
    const directionClasses = {
        column: "flex-col items-center",
        "column-reverse": "flex-col-reverse items-center",
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
    }

    return (
        <div
            className={cn(
                "my-1 flex gap-2",
                // If stackOn is provided, use responsive classes, otherwise use fixed direction
                stackOn ? stackClasses[stackOn] : directionClasses[flexDirection],
                // Row variants get initial alignment, columns get centered
                !stackOn && (flexDirection.includes("row") ? "items-start" : "justify-center"),
                className,
            )}
            {...restOfProps}
        >
            {children}
        </div>
    )
}
