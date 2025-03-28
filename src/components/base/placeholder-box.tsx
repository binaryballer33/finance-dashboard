"use client"

import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

type PlaceholderBoxProps = {
    className?: string
    dark?: boolean
    disableHover?: boolean
    fixedHeight?: number
    flex?: number
    height?: number
    title?: string
}

export default function PlaceholderBox(props: PlaceholderBoxProps) {
    const { className, dark, disableHover, fixedHeight, flex, height, title, ...other } = props
    const { t } = useTranslation()

    const darkBackground = `repeating-linear-gradient(
        -55deg,
        rgba(0, 0, 0, 0.3) 0px,
        rgba(0, 0, 0, 0.3) 4px,
        rgba(23, 23, 23, 0.3) 4px,
        rgba(23, 23, 23, 0.3) 8px
    )`

    const lightBackground = `repeating-linear-gradient(
        -55deg,
        rgba(255, 255, 255, 0.7) 0px,
        rgba(255, 255, 255, 0.7) 4px,
        rgba(245, 245, 245, 0.7) 4px,
        rgba(245, 245, 245, 0.7) 8px
    )`

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-md border border-dashed",
                dark ? "border-neutral-400" : "border-neutral-300",
                !disableHover && "hover:border-primary hover:shadow-lg",
                flex && "flex-1",
                className,
            )}
            style={{
                background: dark ? darkBackground : lightBackground,
                height: fixedHeight ? `${fixedHeight}px` : "100%",
                minHeight: `${height}px`,
            }}
            {...other}
        >
            {title && <h3 className="text-xl font-semibold">{t(title)}</h3>}
        </div>
    )
}
