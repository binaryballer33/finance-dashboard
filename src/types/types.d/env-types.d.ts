export interface Env {
    // Facebook OAuth
    AUTH_FACEBOOK_ID?: string
    AUTH_FACEBOOK_SECRET?: string

    // Google OAuth
    AUTH_GOOGLE_ID?: string
    AUTH_GOOGLE_SECRET?: string

    // Next Auth
    AUTH_SECRET?: string
    AUTH_URL?: string

    // Database
    DATABASE_URL?: string

    // AWS
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID?: string
    NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME?: string
    NEXT_PUBLIC_AWS_REGION?: string
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY?: string

    // Backend Web Server
    NEXT_PUBLIC_BACKEND_BASE_URL?: string

    // APIS
    NEXT_PUBLIC_RAPID_API_KEY?: string

    // Supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
    NEXT_PUBLIC_SUPABASE_REF_ID?: string
    NEXT_PUBLIC_SUPABASE_URL?: string

    NODE_ENV?: "development" | "production"
    RESEND_API_KEY?: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}
