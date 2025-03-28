import { Controller, useFormContext } from "react-hook-form"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type RHFAutocompleteProps = {
    className?: string
    emptyMessage?: string
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    placeholder?: string
}

export default function RHFAutocomplete(props: RHFAutocompleteProps) {
    const { className, emptyMessage, helperText, label, name, options, placeholder } = props
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground",
                                        error && "border-destructive",
                                    )}
                                    role="combobox"
                                    variant="outline"
                                >
                                    {field.value
                                        ? options.find((option) => option.value === field.value)?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full min-w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder={placeholder} />
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => {
                                                field.onChange(option.value)
                                            }}
                                            value={option.value}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    option.value === field.value ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {(error || helperText) && (
                        <FormDescription className={cn(error && "text-destructive")}>
                            {error ? error.message : helperText}
                        </FormDescription>
                    )}
                </FormItem>
            )}
        />
    )
}
