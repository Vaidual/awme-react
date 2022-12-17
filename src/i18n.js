import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import Backend from 'i18next-http-backend';
import {useDispatch} from "react-redux";
import {setLanguage} from "./redux/reducers/global-reducer";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    /*.use(HttpApi)*/
    .use(Backend)
    .init({
        supportedLngs: ["en", 'ua'],
        fallback: "ua",
        detection: {
            order: ['localStorage', 'querystring', 'navigator', 'htmlTag', 'path'],
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json'
        },
        react: {useSuspense:false}
    })
export default i18n;