import { BACKEND_BASE_URL } from "@/lib/secrets" // API URLs

const user = {
    expenses: "/expenses",
    home: "/",
    income: "/income",
    investments: "/investments",
    profile: `/user/profile`,
    savings: "/savings",
    settings: `/user/settings`,
}

const nextAuth = {
    defaultLoginRedirect: user.profile,
    defaultRegisterRedirect: "/login",
    nextAuthApiRoute: "/api/auth", // next api auth stores all auth routes here
}

const auth = {
    forgotPassword: "/emails/forgot-password",
    login: "/login",
    register: "/register",
    resetPassword: "/emails/reset-password",
    signOut: "/sign-out",
    verifyEmail: "/emails/verify-email",
}

const publicRoutes = {
    403: "/error/403",
    404: "/error/404",
    500: "/error/500",
    comingSoon: "/coming-soon",
    dummy: "",
    error: "/error",
    faq: "/faq",
    maintenance: "/maintenance",
    resetPassword: "/forgot-password",
}

const routes = {
    // routes that the app needs
    ...publicRoutes,

    // used for making api calls
    api: {
        test: { "example ..transactionsApi": "" },
    },

    // routes used for user authentication
    auth,

    // routes that can't be visited if user is already authenticated
    authRoutes: Object.values(auth),

    // routes that next auth needs
    nextAuth,

    // used for handling access to routes via middleware
    publicRoutes: Object.values(publicRoutes),

    user,

    // user routes
    userRoutes: Object.values(user),
}

export default routes

/*
 * Combines backend url with any route you want and can append query params to this full url
 *
 * getFullRoute("/emails/reset-password", "token=12345", "code=12345")
 *
 * https://example.com/emails/reset-password?token=12345&code=12345
 */
export function getFullRoute(route: string, ...queryParams: string[]) {
    const queryString = queryParams.join("&")
    const queryParamsNotEmpty = queryParams.length > 0
    return `${BACKEND_BASE_URL}${route}${queryParamsNotEmpty ? `?${queryString}` : ""}`
}
