import Topbar from "./scenes/global/Topbar/Topbar";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {Provider} from "react-redux";
import store from "./redux/store";
import {Route, Routes} from "react-router-dom";
import Register from "./scenes/auth/Register/Register";
import Login from "./scenes/auth/Login/Login";

function App() {
    const [theme, colorMode] = useToggleMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ProSidebarProvider>
                        <div className="app">
                            <CssBaseline />
                            <header><Topbar/></header>
                            <main className={"main"}>
                                <Sidebar/>
                                <Box className={"content"} >
                                    <Routes>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                    </Routes>
                                </Box>
                            </main>
                        </div>
                    </ProSidebarProvider>
                </Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
