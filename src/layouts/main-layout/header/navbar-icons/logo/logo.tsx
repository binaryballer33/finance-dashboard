"use client"

import Link from "next/link"

import { placeholderImage } from "@/lib/constants"
import { cn } from "@/lib/utils"

import useCheckPathname from "@/hooks/use-check-pathname"

import routes from "@/routes/routes"

type LogoProps = {
    className?: string
    src?: string
}

export default function Logo(props: LogoProps) {
    const { className, src } = props

    const { isLinkActive } = useCheckPathname()

    return (
        <Link className="mr-4" href={routes.home}>
            <img
                alt="Logo"
                className={cn(
                    "h-6 w-6 rounded-full hover:h-7 hover:w-7 hover:border-2 hover:border-secondary",
                    isLinkActive(routes.home) && "border-2 border-primary",
                    className,
                )}
                src={src || placeholderImage}
            />
        </Link>
    )
}
