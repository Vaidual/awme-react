import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Paper, Popper, Typography, useTheme} from "@mui/material";
import {
    DataGrid,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {getUsersData} from "../../../redux/slices/usersSlice";
import Loader from "../../../components/Loader/Loader";
import SectionHeader from "../../../components/Header/SectionHeader";
import {tokens} from "../../../theme";
import ReplayIcon from '@mui/icons-material/Replay';

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const getUsers = async () => {
        setLoading(true);
        const data = await dispatch(getUsersData()).unwrap();
        setLoading(false);
        setUsers(await data);
    }

    useEffect(() => {
        getUsers();
    }, []);


    const columns = [
        {field: 'id', headerName: "ID"},
        {field: 'email', headerName: "Email", flex: 1, renderCell: renderCellExpand},
        {field: 'firstName', headerName: "Name", flex: 1},
        {field: 'lastName', headerName: "Surname", flex: 1},
        {field: 'role', headerName: "Role", flex: 1},
        {
            field: 'animals', headerName: "Animals", flex: 1, renderCell: ({row: {animals}}) => {
                return (
                    animals.length === 0 ?
                        <Typography>none</Typography>
                        : <Typography>{animals.map(a=>a.name).join(', ')}</Typography>
                );
            }
        },
        {
            field: 'collars', headerName: "Collars", flex: 1, renderCell: ({row: {collars}}) => {
                return (
                    collars.length === 0 ?
                        <Typography>none</Typography>
                        : <Typography>{collars.map(c=>c.id).join(', ')}</Typography>
                );
            }
        },
        {field: 'profile', headerName: "Profile username", flex: 1, valueFormatter: (params) => {
                return (
                    params.value === null ? 'none' : params.value.username
                );
            }},
    ]
    return (
        <Box m={'20px'}>
            <SectionHeader title={'Users'} subtitle={'Manage all registered AWME users'}/>
            <Box height={'70vh'} sx={{
                "& .MuiDataGrid-root": {
                    border: 'none'
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.background.paperHover
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: colors.background.paperHover
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.background.paper
                },
            }}>
                {!isLoading ?
                    <DataGrid
                        components={{ Toolbar: CustomToolbar}}
                        componentsProps={{toolbar: {getUsers}}}
                        columns={columns}
                        rows={users}
                    />
                    : <Loader/>}
            </Box>
        </Box>
    );
}

const dropDown = {
    type: 'singleSelect',
    flex: 1,
    valueFormatter: ( value ) => value.id,
    cellClassName: 'font-tabular-nums',
};

function CustomToolbar(props) {
    return (
        <GridToolbarContainer sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{"> *": {
                    marginRight: '10px'
                }
            }}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </Box>
            <Box sx={{"> *": {
                    marginLeft: '10px'
                }
            }}>
                <GridToolbarExport/>
                <IconButton onClick={()=>props.getUsers()}><ReplayIcon color={"primary"}/></IconButton>
            </Box>
        </GridToolbarContainer>
    );
}

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

export default Users;