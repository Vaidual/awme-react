import { createTheme } from '@mui/material/styles';
import {createContext, useMemo, useState} from "react";
import {useMediaQuery} from "@mui/material";


export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useToggleMode = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return [theme, colorMode];
};