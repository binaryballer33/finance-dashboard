/*
 * @param {unknown} value - The value to get the column type of
 * @returns {string} - The column type
 */
export default function getColumnType(value: unknown): string {
    // Check if value is a Date object
    if (value instanceof Date) return "date"

    // check if the value is a string
    if (typeof value === "string") {
        // check if the value is string that can be parsed as a date
        const dateValue = Date.parse(value)
        if (!Number.isNaN(dateValue)) return "date"

        // check if the value is a number and if it is not a decimal
        const numberValue = Number(value)
        if (!Number.isNaN(numberValue) && !value.includes(".")) return "number"

        // if the value is not a date or a number, return a string
        return "string"
    }

    // check if the value is a number
    if (typeof value === "number") return "number"

    // if the value is not a date, number, or string, return a string
    return "string"
}
