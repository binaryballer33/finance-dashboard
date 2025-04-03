import type { Table } from "@tanstack/react-table"

import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

import TableExtraDropdownPaddingSettings from "./table-extra-dropdown-padding-settings"
import TableExtraExportButtons from "./table-extra-export-buttons"

type TableExtraDropdownSettingsProps = {
    table: Table<any>
}

export default function TableExtraDropdownMenuSettings(props: TableExtraDropdownSettingsProps) {
    const { table } = props

    return (
        <NavigationMenu className="z-50 w-auto hover:border-b-2 hover:border-primary">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="!p-0">
                        <Info className="h-5 w-5 max-sm:!w-4" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[120px] p-4">
                        <div className="flex flex-col items-center gap-4">
                            <TableExtraDropdownPaddingSettings table={table} />
                            <Separator className="w-full border-t border-secondary" />
                            <TableExtraExportButtons table={table} />
                            <Separator className="w-full border-t border-secondary" />
                            <Button onClick={() => table.resetColumnFilters()}>X All Filters</Button>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
