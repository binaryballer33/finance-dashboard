import type { FlexContainerProps } from "@/components/base/flex-box/flex-container"

import { cn } from "@/lib/utils"

import FlexContainer from "@/components/base/flex-box/flex-container"

export default function FlexEvenlyContainer(props: FlexContainerProps) {
    const { children, className, stackOn, ...restOfProps } = props

    return (
        <FlexContainer className={cn("justify-evenly", className)} stackOn={stackOn} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
