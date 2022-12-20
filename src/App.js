import Topbar from "./scenes/global/Topbar/Topbar";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {useDispatch} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Register from "./scenes/auth/Register/Register";
import Login from "./scenes/auth/Login/Login";
import Home from "./scenes/home/Home";
import {setTokenInfo} from "./redux/slices/authSlice";

function App() {
    const [theme, colorMode] = useToggleMode();
    const dispatch = useDispatch();
    dispatch(setTokenInfo());
    console.log(1111)

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                    <ProSidebarProvider>
                        <div className="app">
                            <CssBaseline />
                            <header><Topbar/></header>
                            <main className={"main"}>
                                <Sidebar/>
                                <Box className={"content"} >
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
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
