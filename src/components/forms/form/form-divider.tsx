import { cn } from "@/lib/utils"

import { Separator } from "@/components/ui/separator"

type FormDividerProps = {
    className?: string
    title: string
}

export default function FormDivider({ className, title }: FormDividerProps) {
    return (
        <div className={cn("relative w-full", className)}>
            <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{title}</span>
            </div>
        </div>
    )
}
