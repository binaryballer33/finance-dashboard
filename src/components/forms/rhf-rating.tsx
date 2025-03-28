"use client"

import { type ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { Star, StarHalf } from "lucide-react"

import { cn } from "@/lib/utils"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type Props = {
    className?: string
    helperText?: ReactNode
    label?: string
    max?: number
    name: string
    precision?: 0.5 | 1
    size?: "lg" | "md" | "sm"
}

export default function RHFRating({ className, helperText, label, max = 5, name, precision = 1, size = "md" }: Props) {
    const { control } = useFormContext()

    const sizeStyles = {
        lg: "w-8 h-8",
        md: "w-6 h-6",
        sm: "w-4 h-4",
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("space-y-2", className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: max }).map((_, index) => {
                                const value = index + 1
                                const isHalf = precision === 0.5 && field.value + 0.5 === value
                                const isFilled = field.value >= value

                                return (
                                    <button
                                        className={cn(
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                            "transition-transform hover:scale-110",
                                            isFilled ? "text-yellow-400" : "text-muted-foreground",
                                        )}
                                        key={value}
                                        onClick={() => field.onChange(value)}
                                        onKeyDown={(e) => {
                                            if (e.key === " " || e.key === "Enter") {
                                                e.preventDefault()
                                                field.onChange(value)
                                            }
                                        }}
                                        type="button"
                                    >
                                        {isHalf ? (
                                            <StarHalf className={sizeStyles[size]} />
                                        ) : (
                                            <Star
                                                className={sizeStyles[size]}
                                                fill={isFilled ? "currentColor" : "none"}
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </FormControl>
                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
