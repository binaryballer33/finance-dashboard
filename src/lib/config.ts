import type { Metadata } from "next"

const APP_NAME = "Next MUI Template"

type AppMetadata = {
    forgotPassword: Metadata
    homePage: Metadata
    investments: Metadata
    login: Metadata
    register: Metadata
    resetPassword: Metadata
    savings: Metadata
    signOut: Metadata
    transactions: Metadata
    userProfile: Metadata
    userSettings: Metadata
    verifyEmail: Metadata
}

// eslint-disable-next-line import/prefer-default-export
export const appMetadata: AppMetadata = {
    forgotPassword: {
        description: "User Forgot Password Page For The App",
        title: `Forgot Password | ${APP_NAME}`,
    },
    homePage: {
        description: "Home Page For The App",
        title: `Home | ${APP_NAME}`,
    },
    investments: {
        description: "Investments Page For The App",
        title: `Investments | ${APP_NAME}`,
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
    savings: {
        description: "Savings Page For The App",
        title: `Savings | ${APP_NAME}`,
    },
    signOut: {
        description: "User Sign Out Page For The App",
        title: `Sign Out | ${APP_NAME}`,
    },
    transactions: {
        description: "Transactions Page For The App",
        title: `Transactions | ${APP_NAME}`,
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
