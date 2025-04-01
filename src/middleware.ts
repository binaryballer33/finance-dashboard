import NextAuth from "next-auth"

import providers from "@/auth/auth-config/providers"

import routes from "@/routes/routes"

/*
 * Due to prisma not working on the edge, you need to instantiate the auth client without the adapter here
 * More Information in the docs: https://authjs.dev/guides/edge-compatibility
 */
const { auth: middleware } = NextAuth({
    providers,
})

export default middleware((req) => {
    const { nextUrl } = req
    const isAuthenticated = !!req.auth
    const isNextAuthApiRoute = nextUrl.pathname.startsWith(routes.nextAuth.nextAuthApiRoute) // DON'T PROTECT THIS ROUTE
    const isAuthRoute = routes.authRoutes.includes(nextUrl.pathname)
    const isPublicRoute = routes.publicRoutes.includes(nextUrl.pathname)

    if (isNextAuthApiRoute) return undefined // DON'T DO ANY ACTIONS ON THIS ROUTE

    // if the user is visiting a login/register/etc page and is already authenticated redirect them
    if (isAuthRoute) {
        if (isAuthenticated) return Response.redirect(new URL(routes.user.profile, nextUrl))

        // auth route and not authenticated, allow access to auth route
        return undefined
    }

    // if the user is visiting a private page and is not authenticated redirect them to the login page
    if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL(routes.auth.login, nextUrl))

    // user on a public route, let them access it
    return undefined
})

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
}
