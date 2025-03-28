"use client"

import { useFormContext } from "react-hook-form"

import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

type RHFTextAreaProps = {
    className?: string
    name: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFTextArea(props: RHFTextAreaProps) {
    const { className, name } = props

    const { control, setValue } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="group">
                    <FormLabel className="h-8 items-center font-medium group-focus-within:text-primary">
                        {name}
                    </FormLabel>

                    <FormControl>
                        <div className="relative">
                            <Textarea className={cn("bg-accent pl-2", className)} {...field} />

                            {/* Icon on the far right of the input field, used to clear the text in the field */}
                            {field.value && (
                                <button
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setValue(name, "")}
                                    type="button"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </FormControl>
                    <FormDescription>Please Provide As Much Detail As Possible.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
