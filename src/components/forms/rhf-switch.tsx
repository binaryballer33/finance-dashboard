import type { ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

type RHFSwitchProps = {
    className?: string
    helperText?: ReactNode
    label?: string
    name: string
}

export default function RHFSwitch({ className, helperText, label, name }: RHFSwitchProps) {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-row items-center justify-between rounded-lg border p-4", className)}>
                    <div className="space-y-0.5">
                        {label && <FormLabel className="text-base">{label}</FormLabel>}
                        {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    </div>
                    <FormControl>
                        <Switch
                            aria-label={label || `Switch ${name}`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiSwitchProps = {
    className?: string
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
}

export function RHFMultiSwitch({ className, helperText, label, name, options }: RHFMultiSwitchProps) {
    const { control } = useFormContext()

    const getSelected = (selectedItems: string[], item: string) =>
        selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("space-y-4", className)}>
                    {label && <FormLabel>{label}</FormLabel>}

                    <div className="space-y-4">
                        {options.map((option) => (
                            <div
                                className="flex flex-row items-center justify-between rounded-lg border p-4"
                                key={option.value}
                            >
                                <FormLabel className="text-base">{option.label}</FormLabel>
                                <FormControl>
                                    <Switch
                                        aria-label={option.label}
                                        checked={field.value.includes(option.value)}
                                        onCheckedChange={() => field.onChange(getSelected(field.value, option.value))}
                                    />
                                </FormControl>
                            </div>
                        ))}
                    </div>

                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
