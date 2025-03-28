import { initReactI18next } from "react-i18next"

import i18n from "i18next"

import ae from "./translations/ae"
import de from "./translations/de"
import es from "./translations/es"
import fr from "./translations/fr"
import pt from "./translations/pt"
import zh from "./translations/zh"

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    lng: "en",
    resources: {
        ae: { translation: ae },
        br: { translation: pt },
        de: { translation: de },
        es: { translation: es },
        fr: { translation: fr },
        pt: { translation: pt },
        zh: { translation: zh },
    },
})
