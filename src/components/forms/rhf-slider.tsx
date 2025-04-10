import type { ReactNode } from "react"

import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"

type Props = {
    className?: string
    defaultValue?: number[]
    helperText?: ReactNode
    label?: string
    max?: number
    min?: number
    name: string
    step?: number
} & React.ComponentProps<typeof Slider>

export default function RHFSlider(props: Props) {
    const { className, defaultValue, helperText, label, max, min, name, step, ...other } = props
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("space-y-4", className)}>
                    {label && <FormLabel htmlFor={`slider-${name}`}>{label}</FormLabel>}
                    <FormControl>
                        <Slider
                            defaultValue={defaultValue}
                            id={`slider-${name}`}
                            max={max}
                            min={min}
                            onValueChange={([value]) => field.onChange(value)}
                            step={step}
                            value={[field.value]}
                            {...other}
                        />
                    </FormControl>
                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
