"use client"

import { useState } from "react"

import { useFormContext } from "react-hook-form"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type RHFCalendarProps = {
    className?: string
    label?: string
    name: string
}

export default function RHFCalendar(props: RHFCalendarProps) {
    const { className, label, name } = props

    const { control } = useFormContext()

    const [datePopoverOpen, setDatePopoverOpen] = useState(false)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && <FormLabel htmlFor={`calendar-${name}`}>{label}</FormLabel>}

                    <Popover modal onOpenChange={setDatePopoverOpen} open={datePopoverOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    aria-expanded={datePopoverOpen}
                                    aria-haspopup="dialog"
                                    aria-label={label || `Select date for ${name}`}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                    )}
                                    id={`calendar-${name}`}
                                    type="button"
                                    variant="outline"
                                >
                                    {field.value ? format(field.value, "MM/dd/yyyy") : <span>Pick A Date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="w-auto p-0"
                            onPointerDownOutside={(e) => e.preventDefault()}
                        >
                            <Calendar
                                initialFocus
                                mode="single"
                                onSelect={(date) => {
                                    if (date) {
                                        field.onChange(date)
                                        setDatePopoverOpen(false)
                                    }
                                }}
                                selected={field.value}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
