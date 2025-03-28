"use client"

import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

type ResetFormProps = {
    className?: string
    size?: "default" | "icon" | "lg" | "sm"
    title: string
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
}

export default function ResetFormButton(props: ResetFormProps) {
    const { className, size = "sm", title, variant = "outline" } = props

    const {
        formState: { isSubmitting },
        reset: resetForm,
    } = useFormContext()

    return (
        <Button
            className={cn("mt-1 whitespace-nowrap px-4 hover:bg-primary/10", className)}
            disabled={isSubmitting}
            onClick={resetForm}
            size={size}
            type="button"
            variant={variant}
        >
            {title}
        </Button>
    )
}
