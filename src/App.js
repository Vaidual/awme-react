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
import {setTokenInfo} from "./redux/auth/authSlice";
import Users from "./scenes/AdminSidebar/Users/Users";
import _ from 'underscore';
import {selectRoles} from "./redux/auth/authSelector";
import RequireAuth from "./features/auth/RequireAuth";
import {ROLES} from "./config/roles";
import RequireBeUnauthorized from "./features/auth/RequireBeUnauthorized";
import Collars from "./scenes/AdminSidebar/Collars/Collars";
import {useEffect} from "react";
import Profiles from "./scenes/AdminSidebar/Profiles/Profiles";

function App() {
    const [theme, colorMode] = useToggleMode();
    const dispatch = useDispatch();
    dispatch(setTokenInfo());
    const roles = useSelector(selectRoles, _.isEqual);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                    <ProSidebarProvider>
                        <div>
                            <CssBaseline enableColorScheme />
                            <Header/>
                            <main className={"main"}>
                                {roles.some(role => [ROLES.Manager, ROLES.Admin].includes(role)) && <Sidebar/>}
                                <Box className={"content"} >
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
                                        <Route element={<RequireBeUnauthorized/> }>
                                            <Route path="/register" element={<Register/>}/>
                                            <Route path="/login" element={<Login/>}/>
                                        </Route>
                                        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/> }>
                                            <Route path="/users" element={<Users/>}/>
                                            <Route path="/collars" element={<Collars/>}/>
                                            <Route path="/profiles" element={<Profiles/>}/>
                                        </Route>
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
