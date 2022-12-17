import Topbar from "./scenes/global/Topbar/Topbar";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
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
