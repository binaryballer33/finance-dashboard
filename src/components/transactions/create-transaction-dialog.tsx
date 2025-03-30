// "use client"

// import type { ElementType } from "react"

// import { useEffect } from "react"

// import { useForm } from "react-hook-form"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
// import * as z from "zod"

// import { cn } from "@/lib/utils"

// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import type { Transaction } from "./transactions-table"

// // TODO: fix this component, has issues
// // Define form schema with zod
// const formSchema = z.object({
//     amount: z
//         .string()
//         .min(1, "Amount is required")
//         .refine((val) => !Number.isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
//             message: "Amount must be a positive number",
//         }),
//     category: z.string().min(1, "Please select a category"),
//     date: z.date({
//         required_error: "Please select a date",
//     }),
//     description: z.string().min(1, "Description is required"),
//     type: z.enum(["Income", "Expense"]),
// })

// type FormValues = z.infer<typeof formSchema>

// interface AddTransactionDialogProps {
//     categoryOptions: { icon: ElementType; label: string; value: string }[]
//     onAddTransaction: (transaction: Omit<Transaction, "icon" | "id">) => void
//     onOpenChange: (open: boolean) => void
//     open: boolean
// }

// export default function AddTransactionDialog({
//     categoryOptions,
//     onAddTransaction,
//     onOpenChange,
//     open,
// }: AddTransactionDialogProps) {
//     // Initialize form with react-hook-form and zod validation
//     const form = useForm<FormValues>({
//         defaultValues: {
//             amount: "",
//             category: "",
//             date: new Date(),
//             description: "",
//             type: "Expense",
//         },
//         resolver: zodResolver(formSchema),
//     })

//     // Reset form when dialog opens/closes
//     useEffect(() => {
//         if (!open) {
//             // Small delay to avoid form reset during dialog animation
//             const timer = setTimeout(() => {
//                 form.reset({
//                     amount: "",
//                     category: "",
//                     date: new Date(),
//                     description: "",
//                     type: "Expense",
//                 })
//             }, 100)
//             return () => clearTimeout(timer)
//         }
//     }, [open, form])

//     // Handle form submission
//     function onSubmit(data: FormValues) {
//         try {
//             // Convert amount to number and apply sign based on type
//             const numericAmount = Number.parseFloat(data.amount)
//             const amount = data.type === "Expense" ? -Math.abs(numericAmount) : Math.abs(numericAmount)

//             // Format date as YYYY-MM-DD
//             const formattedDate = format(data.date, "yyyy-MM-dd")

//             // Add the transaction
//             onAddTransaction({
//                 amount,
//                 category: data.category,
//                 date: formattedDate,
//                 description: data.description,
//             })

//             // Close the dialog
//             onOpenChange(false)
//         } catch (error) {
//             console.error("Error submitting form:", error)
//         }
//     }

//     return (
//         <Dialog onOpenChange={onOpenChange} open={open}>
//             <DialogContent className="sm:max-w-[500px]">
//                 <DialogHeader>
//                     <DialogTitle>Add New Transaction</DialogTitle>
//                     <DialogDescription>Enter the details of your transaction below.</DialogDescription>
//                 </DialogHeader>

//                 <Form {...form}>
//                     <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
//                         <div className="grid grid-cols-2 gap-4">
//                             <FormField
//                                 control={form.control}
//                                 name="type"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Type</FormLabel>
//                                         <Select defaultValue={field.value} onValueChange={field.onChange}>
//                                             <FormControl>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select type" />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 <SelectItem value="Expense">Expense</SelectItem>
//                                                 <SelectItem value="Income">Income</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="amount"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Amount</FormLabel>
//                                         <FormControl>
//                                             <Input inputMode="decimal" placeholder="0.00" type="text" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>

//                         <FormField
//                             control={form.control}
//                             name="category"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Category</FormLabel>
//                                     <Select onValueChange={field.onChange} value={field.value}>
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select category" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {categoryOptions.map((category) => (
//                                                 <SelectItem key={category.value} value={category.value}>
//                                                     <div className="flex items-center gap-2">
//                                                         <category.icon className="h-4 w-4" />
//                                                         {category.label}
//                                                     </div>
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="description"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Description</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter description" {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="date"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Date</FormLabel>
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <FormControl>
//                                                 <Button
//                                                     className={cn(
//                                                         "w-full pl-3 text-left font-normal",
//                                                         !field.value && "text-muted-foreground",
//                                                     )}
//                                                     variant="outline"
//                                                 >
//                                                     {field.value ? (
//                                                         format(field.value, "MM/dd/yyyy")
//                                                     ) : (
//                                                         <span>Pick a date</span>
//                                                     )}
//                                                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                                 </Button>
//                                             </FormControl>
//                                         </PopoverTrigger>
//                                         <PopoverContent align="start" className="w-auto p-0">
//                                             <Calendar
//                                                 initialFocus
//                                                 mode="single"
//                                                 onSelect={field.onChange}
//                                                 selected={field.value}
//                                             />
//                                         </PopoverContent>
//                                     </Popover>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <DialogFooter>
//                             <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
//                                 Cancel
//                             </Button>
//                             <Button type="submit">Add Transaction</Button>
//                         </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     )
// }
