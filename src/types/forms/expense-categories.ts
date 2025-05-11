import type { TransactionType } from "@prisma/client"
import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { IconType } from "react-icons"

export type Category = (
    | {
          color: string
          icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
          label: string
          value: CategoryValue | TransactionType
      }
    | {
          color: string
          icon?: IconType
          label: string
          value: CategoryValue | TransactionType
      }
)[]

export type CategoryValue =
    | "Education"
    | "Entertainment"
    | "Food"
    | "Health"
    | "Housing"
    | "One Time"
    | "Other"
    | "Recurring"
    | "Shopping"
    | "Subscriptions"
    | "Transportation"
    | "Travel"
    | "Utilities"
