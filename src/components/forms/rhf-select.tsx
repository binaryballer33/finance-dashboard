import type { Category } from "@/types/forms/transaction-categories"

import { type ReactNode, useState } from "react"

import { useFormContext } from "react-hook-form"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Single Select
type RHFSelectProps = {
    className?: string
    helperText?: ReactNode
    label?: string
    name: string
    options: Category
    placeholder?: string
}

export default function RHFSelect(props: RHFSelectProps) {
    const { className, helperText, label, name, options, placeholder } = props
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center gap-2">
                                        {option.icon && <option.icon className="h-4 w-4" />}
                                        {option.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

// Multi Select
type RHFMultiSelectProps = {
    className?: string
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    placeholder?: string
}

export function RHFMultiSelect({ className, helperText, label, name, options, placeholder }: RHFMultiSelectProps) {
    const { control } = useFormContext()
    const [open, setOpen] = useState(false)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-col", className)}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover onOpenChange={setOpen} open={open}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value?.length && "text-muted-foreground",
                                    )}
                                    role="combobox"
                                    variant="outline"
                                >
                                    {field.value?.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {field.value.map((value: string) => (
                                                <Badge className="mr-1" key={value} variant="secondary">
                                                    {options.find((opt) => opt.value === value)?.label}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        placeholder
                                    )}
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandEmpty>No option found.</CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => {
                                        const isSelected = field.value?.includes(option.value)
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => {
                                                    const newValue = isSelected
                                                        ? field.value.filter((value: string) => value !== option.value)
                                                        : [...(field.value || []), option.value]
                                                    field.onChange(newValue)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        isSelected ? "opacity-100" : "opacity-0",
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {helperText && <div className="text-sm text-muted-foreground">{helperText}</div>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
