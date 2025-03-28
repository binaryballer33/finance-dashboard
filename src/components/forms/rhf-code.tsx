"use client"

import { Controller, useFormContext } from "react-hook-form"

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

type RHFCodesProps = {
    className?: string
    length?: number
    name: string
}

export default function RHFCode(props: RHFCodesProps) {
    const { name } = props
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className="flex h-12 w-full gap-2 sm:gap-4">
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={0} />
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={1} />
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={2} />
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={3} />
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={4} />
                                <InputOTPSlot className="h-full flex-1 bg-accent" index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription>Please Enter The One-Time Password Sent To Your Email.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
