import {createTheme} from '@mui/material/styles';
import {createContext, useMemo, useState} from "react";
import {useMediaQuery} from "@mui/material";
import {enUS, ukUA, zhCN} from "@mui/x-data-grid";
import { ukUA as coreukUA, enUS as coreenUS } from '@mui/material/locale';
import {useTranslation} from "react-i18next";

export const tokens = (mode) => ({
    ...(mode === "dark"

            ? {
                background: {
                    paperHover: "#303030",
                },
                text: {
                    grey: '#a0a0a0'
                }
            }
            : {
                background: {
                    paperHover: "#eeeeee",
                },
                text: {
                    grey: '#a0a0a0'
                }
            }
    )
});


const themeOptions = (mode) => {
    return {
        palette: {
            mode,
            ...(mode === 'dark'
                    ? {
                        primary: {
                            main: '#7cb342',
                        },
                        secondary: {
                            main: '#ba68c8',
                        },
                        background: {
                            default: '#030303',
                            paper: '#1a1a1b',
                        }
                    }
                    : {
                        primary: {
                            main: '#8bc34a',
                        },
                        secondary: {
                            main: '#ba68c8',
                        },
                        background: {
                            paper: '#F5F5F5',
                        }
                    }
            ),
        },
        typography: {
            button: {
                textTransform: 'none'
            }
        }
    }
}
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useToggleMode = () => {
    let preferredMode = localStorage.getItem('mui-mode');
    const deviceTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    if (!preferredMode) preferredMode = deviceTheme;
    const [mode, setMode] = useState(preferredMode);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: (prevMode) => {
                let newMode = prevMode === 'light' ? 'dark' : 'light'
                setMode(newMode);
                localStorage.setItem('mui-mode', newMode);
            },
        }),
        [],
    );

    const {i18n} = useTranslation();
    let lang;
    switch (i18n.language) {
        case 'en':
            lang = [enUS, coreenUS]
            break;
        case 'ua':
            lang = [ukUA, coreukUA]
            break;
        default:
            lang = [enUS, coreenUS]
            break;
    }
    const theme = useMemo(
        () =>
            createTheme(themeOptions(mode), ...lang),
        [i18n.language, mode],
    );

    return [theme, colorMode];
};