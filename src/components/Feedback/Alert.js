import React from "react";
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

export const Alert = (props) => {
    const {variant = "filled"} = props
    const MAlert = React.forwardRef(function MAlert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant={variant} {...props} />;
    });
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setAlert(null);
    }
    return (
        <Snackbar open={!!props.alert} autoHideDuration={6000} onClose={handleAlertClose}>
            <MAlert onClose={handleAlertClose} {...props.alert}>
            </MAlert>
        </Snackbar>
    )
}