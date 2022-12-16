import Topbar from "./scenes/global/Topbar/Topbar";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {createTheme} from "@mui/material/styles";
import {useMemo} from "react";
import {Provider} from "react-redux";
import store from "./redux/store";

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
                <Provider store={store}>
                    <ProSidebarProvider>
                        <div className="app">
                            <CssBaseline />
                            <Sidebar/>
                            <main>
                                <Topbar/>
                            </main>
                        </div>
                    </ProSidebarProvider>
                </Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
