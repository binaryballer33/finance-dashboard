import type { ServerResponse } from "@/types/auth/server-response"
import type { toast as sonnerReeactHotToast } from "sonner"

import delay from "@/lib/helper-functions/delay"
import delayAndCloseTab from "@/lib/helper-functions/delay-and-close-tab"

type HandleServerResponseParams = {
    closeTab?: boolean
    delay?: number
    redirectTo?: string
    response: ServerResponse
    toast: typeof sonnerReeactHotToast
}

export default async function handleServerResponse(params: HandleServerResponseParams) {
    const { closeTab, delay: propsDelay, redirectTo, response, toast } = params
    const delayInMilliseconds = propsDelay || 2000

    switch (response.status) {
        case 400: // error
        case 403: // unauthorized
        case 404: // page not found
        case 500: // internal server error
        case 503: // service unavailable
            toast.error(response.error, { duration: 5000 })
            break
        case 200: // success
        case 201: // created successfully
            toast.success(response.success)

            // TODO: temporary fix for refreshing session
            // doing the redirect in order to force all components to recognize the change in auth status
            if (redirectTo) {
                // the delay allows time for the toast to display before hard refreshing the page and doing the redirect
                await delay(delayInMilliseconds)
                window.location.href = redirectTo
            }

            if (closeTab) delayAndCloseTab(delayInMilliseconds)

            break
        default:
            console.error("Unknown HTTP Status Code From Login")
            break
    }
}
