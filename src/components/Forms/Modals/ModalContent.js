import {DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

export const ModalContent = (props) => {
    return (
        <>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.description}</DialogContentText>
                {props.children}
            </DialogContent>
        </>
    )
}