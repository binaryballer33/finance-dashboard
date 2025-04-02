import type { Metadata } from "next"

const APP_NAME = "Next MUI Template"

type AppMetadata = {
    expenses: Metadata
    forgotPassword: Metadata
    homePage: Metadata
    income: Metadata
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

const icons = {
    auth: "/icons/auth.png",
    dashboard: "/icons/dashboard.png",
    // TODO: figure out why expenses image is not showing
    expenses: "/icons/expenses.png",
    income: "/icons/income.png",
    investments: "/icons/investments.png",
    savings: "/icons/savings.png",
    transactions: "/icons/transactions.png",
    userProfile: "/icons/profile.png",
    userSettings: "/icons/settings.png",
}

// eslint-disable-next-line import/prefer-default-export
export const appMetadata: AppMetadata = {
    expenses: {
        description: "Expenses Page For The App",
        icons: {
            icon: icons.expenses,
        },
        title: `Expenses | ${APP_NAME}`,
    },
    forgotPassword: {
        description: "User Forgot Password Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Forgot Password | ${APP_NAME}`,
    },
    homePage: {
        description: "Home Page For The App",
        icons: {
            icon: icons.dashboard,
        },
        title: `Home | ${APP_NAME}`,
    },
    income: {
        description: "Income Page For The App",
        icons: {
            icon: icons.income,
        },
        title: `Income | ${APP_NAME}`,
    },
    investments: {
        description: "Investments Page For The App",
        icons: {
            icon: icons.investments,
        },
        title: `Investments | ${APP_NAME}`,
    },
    login: {
        description: "User Login Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Login | ${APP_NAME}`,
    },
    register: {
        description: "User Account Registration Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Register | ${APP_NAME}`,
    },
    resetPassword: {
        description: "User Reset Password Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Reset Password | ${APP_NAME}`,
    },
    savings: {
        description: "Savings Page For The App",
        icons: {
            icon: icons.savings,
        },
        title: `Savings | ${APP_NAME}`,
    },
    signOut: {
        description: "User Sign Out Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Sign Out | ${APP_NAME}`,
    },
    transactions: {
        description: "Transactions Page For The App",
        icons: {
            icon: icons.transactions,
        },
        title: `Transactions | ${APP_NAME}`,
    },
    userProfile: {
        description: "User Profile Page For The App",
        icons: {
            icon: icons.userProfile,
        },
        title: `User Profile | ${APP_NAME}`,
    },
    userSettings: {
        description: "User Account Settings Page For The App",
        icons: {
            icon: icons.userSettings,
        },
        title: `Account Settings | ${APP_NAME}`,
    },
    verifyEmail: {
        description: "User Verify Email Page For The App",
        icons: {
            icon: icons.auth,
        },
        title: `Verify Email | ${APP_NAME}`,
    },
}
