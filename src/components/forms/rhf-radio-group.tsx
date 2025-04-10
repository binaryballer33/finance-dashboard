import { type ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = {
    className?: string
    helperText?: ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    orientation?: "horizontal" | "vertical"
}

export default function RHFRadioGroup(props: Props) {
    const { className, helperText, label, name, options, orientation } = props
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel id={`radio-group-${name}-label`}>{label}</FormLabel>}
                    <FormControl>
                        <RadioGroup
                            aria-labelledby={`radio-group-${name}-label`}
                            className={cn("gap-3", orientation === "horizontal" ? "flex flex-row" : "flex flex-col")}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                        >
                            {options.map((option) => (
                                <div className="flex items-center space-x-2" key={option.value}>
                                    <RadioGroupItem id={`${name}-${option.value}`} value={option.value} />
                                    <FormLabel className="text-sm font-normal" htmlFor={`${name}-${option.value}`}>
                                        {option.label}
                                    </FormLabel>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
