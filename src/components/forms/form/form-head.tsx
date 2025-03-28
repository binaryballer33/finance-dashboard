import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type FormHeadProps = {
    className?: string
    description?: ReactNode
    icon?: ReactNode
    title: ReactNode
}

export default function FormHead(props: FormHeadProps) {
    const { className, description, icon, title } = props

    return (
        <>
            {icon && <div className={cn("mb-3 flex w-full justify-center")}>{icon}</div>}

            <div className={cn("mb-5 flex flex-col gap-1.5 whitespace-pre-line text-center", className)}>
                <h2 className="text-xl font-semibold">{title}</h2>

                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
        </>
    )
}
