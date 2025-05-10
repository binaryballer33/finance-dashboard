import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { IconType } from "react-icons"

export type Category = (
    | {
          color: string
          icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
          label: string
          value: CategoryValue
      }
    | {
          color: string
          icon?: IconType
          label: string
          value: CategoryValue
      }
)[]

export type CategoryValue =
    | "Education"
    | "Entertainment"
    | "Food"
    | "Health"
    | "Housing"
    | "Other"
    | "Shopping"
    | "Subscriptions"
    | "Transportation"
    | "Travel"
    | "Utilities"
