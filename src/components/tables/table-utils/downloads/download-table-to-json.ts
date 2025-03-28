export default function downloadTableToJSON(trades: any[]) {
    // Create a blob from the JSON data
    const fileName = "data.json"
    const jsonString = JSON.stringify(trades, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
