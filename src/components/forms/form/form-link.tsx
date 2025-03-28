import Link from "next/link"

import { cn } from "@/lib/utils"

type FormLinkProps = {
    className?: string
    linkTitle: string
    linkTo: string
    title?: string
}

export default function FormLink({ className, linkTitle, linkTo, title }: FormLinkProps) {
    return (
        <div className={cn("mt-1", className)}>
            {title && <span className="text-muted-foreground">{title} </span>}
            <Link className="font-medium text-primary hover:underline" href={linkTo}>
                {linkTitle}
            </Link>
        </div>
    )
}
