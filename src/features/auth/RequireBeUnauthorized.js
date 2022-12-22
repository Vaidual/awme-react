import {Navigate, Outlet, useLocation} from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import {Alert, Snackbar} from "@mui/material";

const RequireBeUnauthorized = () => {
    const location = useLocation()
    const {userId} = useAuth();

    if (userId == null) {
        return <Outlet/>;
    } else {
        return (
            <Navigate to="/" state={{from: location}} replace/>
        );
    }

}
export default RequireBeUnauthorized