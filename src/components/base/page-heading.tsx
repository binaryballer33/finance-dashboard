"use client"

import { type ReactNode } from "react"

import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

import { H1, H6 } from "./typography"

type PageHeadingProps = {
    actions?: ReactNode
    background?: string
    bottomText?: string
    className?: string
    description?: string
    iconBox?: ReactNode
    title: string
    topSection?: ReactNode
}

export default function PageHeading(props: PageHeadingProps) {
    const { actions, background, bottomText, className, description, iconBox, title, topSection } = props
    const { t } = useTranslation()

    return (
        <div className={cn("flex flex-col", background && `bg-[${background}]`, className)}>
            <div className="flex w-full flex-col items-center justify-between md:flex-row">
                <div className="PageTitleContent flex flex-col items-center overflow-hidden md:flex-row md:space-x-4">
                    {iconBox}
                    <div className="flex flex-col space-y-1 overflow-hidden text-center md:text-left">
                        {topSection}
                        <h3 className="truncate text-2xl font-semibold tracking-tight">{t(title)}</h3>
                        {description && (
                            <h5 className="truncate text-lg font-normal text-muted-foreground md:whitespace-normal">
                                {t(description)}
                            </h5>
                        )}
                    </div>
                </div>
                {actions}
            </div>

            {bottomText && (
                <div className="my-4">
                    <div className="mb-4 w-full border-b md:w-3/4" />
                    <p className="text-center text-base text-muted-foreground md:text-left">{t(bottomText)}</p>
                </div>
            )}
        </div>
    )
}

type PageHeaderProps = {
    description: string
    title: string
}

export function PageHeadingCentered(props: PageHeaderProps) {
    const { description, title } = props

    return (
        <div className="mb-16 flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
                <H1 className="text-primary hover:text-secondary">{title}</H1>
                <H6 className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">{description}</H6>
            </div>
        </div>
    )
}
