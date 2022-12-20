import Header from "./scenes/global/Header/Header";
import Sidebar from "./scenes/global/Sidebar/Sidebar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import {ColorModeContext, useToggleMode} from "./theme";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Register from "./scenes/auth/Register/Register";
import Login from "./scenes/auth/Login/Login";
import Home from "./scenes/home/Home";
import {setTokenInfo} from "./redux/slices/authSlice";
import Users from "./scenes/AdminSidebar/Users/Users";
import _ from 'underscore';

function App() {
    const [theme, colorMode] = useToggleMode();
    const dispatch = useDispatch();
    dispatch(setTokenInfo());
    const roles = useSelector((state) => state.auth.roles, _.isEqual);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                    <ProSidebarProvider>
                        <div>
                            <CssBaseline enableColorScheme />
                            <Header/>
                            <main className={"main"}>
                                {roles.includes("Admin") && <Sidebar/>}
                                <Box className={"content"} >
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/users" element={<Users/>}/>
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
