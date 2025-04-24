import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { IconType } from "react-icons"

export type Category = (
    | {
          color: string
          icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
          label: string
          value: string
      }
    | {
          color: string
          icon?: IconType
          label: string
          value: string
      }
)[]
