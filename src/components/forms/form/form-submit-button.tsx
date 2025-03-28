"use client"

import { useFormContext } from "react-hook-form"

import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

type FormSubmitButtonProps = {
    className?: string
    loadingTitle: string
    size?: "default" | "icon" | "lg" | "sm"
    title: string
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
}

function FormSubmitButton(props: FormSubmitButtonProps) {
    const { className, loadingTitle, size = "default", title, variant = "default" } = props

    const {
        formState: { isSubmitting },
    } = useFormContext()

    return (
        <Button
            className={cn("my-1 w-full", className)}
            disabled={isSubmitting}
            size={size}
            type="submit"
            variant={variant}
        >
            {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingTitle}
                </>
            ) : (
                title
            )}
        </Button>
    )
}

export default FormSubmitButton
