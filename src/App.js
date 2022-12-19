import Topbar from "./scenes/global/Topbar/Topbar";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {Provider, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Register from "./scenes/auth/Register/Register";
import Login from "./scenes/auth/Login/Login";

function App() {
    const [theme, colorMode] = useToggleMode();
    const user = useSelector((state) => state.auth.user);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                    <ProSidebarProvider>
                        <div className="app">
                            <CssBaseline />
                            <header><Topbar/></header>
                            <main className={"main"}>
                                {user && <Sidebar/>}
                                <Box className={"content"} >
                                    <Routes>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                    </Routes>
                                </Box>
                            </main>
                        </div>
                    </ProSidebarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
