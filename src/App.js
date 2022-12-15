import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import {CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {createTheme} from "@mui/material/styles";
import {useMemo} from "react";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const startTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    const [theme, colorMode] = useToggleMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <ProSidebarProvider>
                    <div className="app">
                        <CssBaseline />
                        <Sidebar/>
                        <main>
                            <Topbar/>
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
