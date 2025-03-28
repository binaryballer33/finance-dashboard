import { Controller, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

type RHFCheckboxProps = {
    className?: string
    helperText?: React.ReactNode
    label?: React.ReactNode
    name: string
}

export default function RHFCheckbox({ className, helperText, label, name }: RHFCheckboxProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
                    <FormControl>
                        <Checkbox
                            aria-label={!label ? `Checkbox ${name}` : undefined}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>

                    {label && <Label className="text-sm font-normal">{label}</Label>}

                    {(error || helperText) && (
                        <FormDescription className={cn("mt-1", error && "text-destructive")}>
                            {error ? error.message : helperText}
                        </FormDescription>
                    )}
                </FormItem>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiCheckboxProps = {
    className?: string
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
}

export function RHFMultiCheckbox({ className, helperText, label, name, options }: RHFMultiCheckboxProps) {
    const { control } = useFormContext()

    const getSelected = (selectedItems: string[], item: string) =>
        selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={className}>
                    {label && <FormLabel className="text-base">{label}</FormLabel>}

                    <div className="space-y-2">
                        {options.map((option) => (
                            <div className="flex items-center space-x-3" key={option.value}>
                                <FormControl>
                                    <Checkbox
                                        aria-label={!option.label ? `Checkbox ${option.label}` : undefined}
                                        checked={field.value.includes(option.value)}
                                        onCheckedChange={() => field.onChange(getSelected(field.value, option.value))}
                                    />
                                </FormControl>

                                <Label className="text-sm font-normal">{option.label}</Label>
                            </div>
                        ))}
                    </div>

                    {(error || helperText) && (
                        <FormDescription className={cn("mt-1", error && "text-destructive")}>
                            {error ? error.message : helperText}
                        </FormDescription>
                    )}
                </FormItem>
            )}
        />
    )
}
