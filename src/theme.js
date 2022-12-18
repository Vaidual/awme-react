import {createTheme} from '@mui/material/styles';
import {createContext, useMemo, useState} from "react";
import {useMediaQuery} from "@mui/material";

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
                    paperHover: "#f1f1f1",
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
                        },
                        common: {
                            paperHover: '#212121'
                        },
                        info: {
                            main: '#c9e7ff',
                            light: '#fcfeff',
                            dark: '#ffffff'
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
                        },
                        common: {
                            paperHover: '#212121'
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
    toggleColorMode: (prevMode) => {},
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

    const theme = useMemo(
        () =>
            createTheme(themeOptions(mode)),
        [mode],
    );

    return [theme, colorMode];
};