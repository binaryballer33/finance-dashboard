import type { TwoFactorConfirmation, User, VerificationToken } from "@prisma/client"

type StatusSuccess = 200 | 201

type StatusClientError = 400 | 403 | 404

type StatusServerError = 500 | 503

type ServerSuccessResponse = {
    status: StatusSuccess
    success: string
}

type ServerErrorResponse = {
    error: string
    status: StatusClientError | StatusServerError
}

type ServerUserSuccessResponse = {
    user: User
} & ServerSuccessResponse

type ServerEmailSuccessResponse = {
    email: string
} & ServerSuccessResponse

type ServerTokenSuccessResponse = {
    token: VerificationToken
} & ServerSuccessResponse

type ServerTwoFactorConfirmationSuccessResponse = {
    confirmation: TwoFactorConfirmation
} & ServerSuccessResponse

export type ServerResponse =
    | ServerEmailSuccessResponse
    | ServerErrorResponse
    | ServerSuccessResponse
    | ServerTokenSuccessResponse
    | ServerTwoFactorConfirmationSuccessResponse
    | ServerUserSuccessResponse
