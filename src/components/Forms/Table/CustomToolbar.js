import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {Box, IconButton} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React from "react";

export default function CustomToolbar({updateTable, actions}) {
    return (
        <GridToolbarContainer sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{
                "> *": {
                    marginRight: '10px'
                }
            }}>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarDensitySelector/>
            </Box>
            <Box sx={{
                "> *": {
                    marginLeft: '10px'
                }
            }}>
                {actions}
                <GridToolbarExport/>
                <IconButton onClick={() => updateTable()}><ReplayIcon color={"primary"}/></IconButton>
            </Box>
        </GridToolbarContainer>
    );
}