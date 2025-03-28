import type { FlexContainerProps } from "@/components/base/flex-box/flex-container"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import FlexContainer from "@/components/base/flex-box/flex-container"

type MinHeight = "100dvh" | "25dvh" | "33dvh" | "50dvh" | "66dvh" | "75dvh" | "80dvh" | "85dvh" | "90dvh" | "95dvh"

export type FlexCenteredFullScreenContainerProps = {
    children: ReactNode
    minHeight?: MinHeight
} & FlexContainerProps

const minHeightClasses: Record<MinHeight, string> = {
    "100dvh": "min-h-[100dvh]",
    "25dvh": "min-h-[25dvh]",
    "33dvh": "min-h-[33dvh]",
    "50dvh": "min-h-[50dvh]",
    "66dvh": "min-h-[66dvh]",
    "75dvh": "min-h-[75dvh]",
    "80dvh": "min-h-[80dvh]",
    "85dvh": "min-h-[85dvh]",
    "90dvh": "min-h-[90dvh]",
    "95dvh": "min-h-[95dvh]",
}

export default function FlexCenteredFullScreenContainer(props: FlexCenteredFullScreenContainerProps) {
    const { children, className, minHeight = "100dvh", ...restOfProps } = props
    return (
        <FlexContainer className={cn(minHeightClasses[minHeight], className)} flexDirection="column" {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
