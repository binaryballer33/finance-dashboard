import type { FlexContainerProps } from "@/components/base/flex-box/flex-container"

import { cn } from "@/lib/utils"

import FlexContainer from "@/components/base/flex-box/flex-container"

export default function FlexAroundContainer({ children, className, stackOn, ...props }: FlexContainerProps) {
    return (
        <FlexContainer className={cn("justify-around", className)} stackOn={stackOn} {...props}>
            {children}
        </FlexContainer>
    )
}
