import type { Metadata } from "next"

const APP_NAME = "Next MUI Template"

type AppMetadata = {
    about: Metadata
    contact: Metadata
    faq: Metadata
    forgotPassword: Metadata
    homePage: Metadata
    login: Metadata
    register: Metadata
    resetPassword: Metadata
    signOut: Metadata
    userProfile: Metadata
    userSettings: Metadata
    verifyEmail: Metadata
}

// eslint-disable-next-line import/prefer-default-export
export const appMetadata: AppMetadata = {
    about: {
        description: "About Page For The App",
        title: `About | ${APP_NAME}`,
    },
    contact: {
        description: "Contact Page For The App",
        title: `Contact | ${APP_NAME}`,
    },
    faq: {
        description: "Frequently Asked Questions Page For The App",
        title: `FAQ | ${APP_NAME}`,
    },
    forgotPassword: {
        description: "User Forgot Password Page For The App",
        title: `Forgot Password | ${APP_NAME}`,
    },
    homePage: {
        description: "Home Page For The App",
        title: `Home | ${APP_NAME}`,
    },
    login: {
        description: "User Login Page For The App",
        title: `Login | ${APP_NAME}`,
    },
    register: {
        description: "User Account Registration Page For The App",
        title: `Register | ${APP_NAME}`,
    },
    resetPassword: {
        description: "User Reset Password Page For The App",
        title: `Reset Password | ${APP_NAME}`,
    },
    signOut: {
        description: "User Sign Out Page For The App",
        title: `Sign Out | ${APP_NAME}`,
    },
    userProfile: {
        description: "User Profile Page For The App",
        title: `User Profile | ${APP_NAME}`,
    },
    userSettings: {
        description: "User Account Settings Page For The App",
        title: `Account Settings | ${APP_NAME}`,
    },
    verifyEmail: {
        description: "User Verify Email Page For The App",
        title: `Verify Email | ${APP_NAME}`,
    },
}
