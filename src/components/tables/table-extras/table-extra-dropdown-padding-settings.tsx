import type { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

type TableExtraDropdownPaddingSettingsProps = {
    table: Table<any>
}

export default function TableExtraDropdownPaddingSettings(props: TableExtraDropdownPaddingSettingsProps) {
    const { table } = props

    const handlePaddingChange = (padding: "lg" | "md" | "sm" | "xl") => {
        table.options.meta?.setTablePadding(padding)
    }

    return (
        <div className="flex w-full flex-col items-center gap-2">
            <h5 className="text-md font-medium hover:text-secondary">Padding</h5>
            <div className="flex items-center justify-between gap-2 max-sm:w-[150px] max-sm:overflow-scroll">
                <Button
                    className="text-sm hover:text-primary"
                    onClick={() => handlePaddingChange("sm")}
                    size="icon"
                    variant="default"
                >
                    Sm
                </Button>
                <Button
                    className="text-sm hover:text-primary"
                    onClick={() => handlePaddingChange("md")}
                    size="icon"
                    variant="default"
                >
                    Md
                </Button>
                <Button
                    className="text-sm hover:text-primary"
                    onClick={() => handlePaddingChange("lg")}
                    size="icon"
                    variant="default"
                >
                    Lg
                </Button>
                <Button
                    className="text-sm hover:text-primary"
                    onClick={() => handlePaddingChange("xl")}
                    size="icon"
                    variant="default"
                >
                    Xl
                </Button>
            </div>
        </div>
    )
}
