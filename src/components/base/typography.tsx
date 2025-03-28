import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    ellipsis?: boolean
}

const ellipsisClasses = "overflow-hidden text-ellipsis whitespace-nowrap"

export function H1({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h1 className={cn("text-4xl font-bold", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h1>
    )
}

export function H2({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h2 className={cn("text-3xl font-bold", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h2>
    )
}

export function H3({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h3 className={cn("text-2xl font-bold", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h3>
    )
}

export function H4({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h4 className={cn("text-xl font-semibold", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h4>
    )
}

export function H5({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h5 className={cn("text-lg font-semibold leading-none", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h5>
    )
}

export function H6({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <h6 className={cn("text-base font-semibold", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </h6>
    )
}

export function Paragraph({ children, className, ellipsis, ...props }: TypographyProps) {
    return (
        <p className={cn("text-sm", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </p>
    )
}

export function Small({ children, className, ellipsis = false, ...props }: TypographyProps) {
    return (
        <small className={cn("text-xs font-normal", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </small>
    )
}

export function Span({ children, className, ellipsis = false, ...props }: TypographyProps) {
    return (
        <span className={cn(ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </span>
    )
}

export function Tiny({ children, className, ellipsis = false, ...props }: TypographyProps) {
    return (
        <small className={cn("text-[10px] font-normal", ellipsis && ellipsisClasses, className)} {...props}>
            {children}
        </small>
    )
}
