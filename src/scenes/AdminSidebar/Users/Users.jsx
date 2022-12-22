import React, {useEffect, useMemo, useState} from 'react';
import {
    Box, Button,
    IconButton, List, ListItem, ListItemButton, ListItemText,
    Paper,
    Popper,
    Typography,
    useTheme
} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {getUsersData} from "../../../redux/users/usersSlice";
import Loader from "../../../components/Loader/Loader";
import SectionHeader from "../../../components/Header/SectionHeader";
import {tokens} from "../../../theme";
import ReplayIcon from '@mui/icons-material/Replay';
import {ClickAwayListener} from "@mui/base";
import {useTranslation} from "react-i18next";

const listComparator = (v1, v2) => {

    return v1.length - v2.length
};

const Users = () => {
    const {t} = useTranslation();
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
    const columns = useMemo(
        () => [
            {field: 'id', headerName: "ID", type: 'number', width: 60},
            {field: 'email', headerName: t('users.table.rows.email'), flex: 1, renderCell: renderCellExpand},
            {field: 'firstName', headerName: t('users.table.rows.firstName'), flex: 1},
            {field: 'lastName', headerName: t('users.table.rows.lastName'), flex: 1},
            {field: 'role', headerName: t('users.table.rows.roles'), flex: 1},
            {field: 'animals', headerName: t('users.table.rows.animals'), flex: 1, renderCell: renderCellList, sortComparator: listComparator},
            {field: 'collars', headerName: t('users.table.rows.collars'), flex: 1, renderCell: renderCellList, sortComparator: listComparator},
            /*            {
                            field: 'collars', headerName: "Collars", flex: 1, renderCell: ({row: {collars}}) => {
                                return (
                                    collars.length === 0 ?
                                        <Typography>none</Typography>
                                        : <Typography>{collars.map(a => a.id).join(', ')}</Typography>
                                );
                            }
                        },*/
        ], []
    )

    return (
        <Box m={'20px'}>
            <SectionHeader title={t('users.title.main')} subtitle={t('users.title.sub')}/>
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
                        components={{Toolbar: CustomToolbar}}
                        componentsProps={{toolbar: {getUsers}}}
                        columns={columns}
                        rows={users}
                    />
                    : <Loader/>}
            </Box>
        </Box>
    );
}

function renderCellList(params) {
    return (
        <GridCellList value={params.value} field={params.field} width={params.colDef.computedWidth}/>
    );
}

const GridCellList = React.memo(function GridCellList(props) {
    const {width, value, field} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    let items;

    switch (field) {
        case 'animals':
            items = value.map(item => <ListItemButton key={item.id}
                sx={{backgroundColor: theme.palette.background.paper}}><ListItemText primary={item.name}/></ListItemButton>);
            break;
        case 'collars':
            items = value.map(item => <ListItemButton key={item.id}
                sx={{backgroundColor: theme.palette.background.paper}}><ListItemText primary={item.id}/></ListItemButton>);
            break;
        default:
            items = value.map(item => <ListItemButton key={item.id}
                sx={{backgroundColor: theme.palette.background.paper}}><ListItemText primary={item.id}/></ListItemButton>);
            break;
    }

    return value.length === 0 ?
        <Button disabled sx={{justifyContent: 'flex-start'}} fullWidth color={"inherit"}>{'0'}</Button>:
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box width={'100%'}>
                <Button sx={{justifyContent: 'flex-start'}} fullWidth color={"inherit"}
                        onClick={handleClick}>{value.length}</Button>
                <Popper sx={{maxHeight: '5px', width: width}} id={id} open={open} anchorEl={anchorEl}>
                    <List sx={{
                        maxHeight: '5px',
                        backgroundColor: theme.palette.background.paper
                    }}>{items}</List>
                </Popper>
            </Box>
        </ClickAwayListener>
});

function CustomToolbar(props) {
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
                <GridToolbarExport/>
                <IconButton onClick={() => props.getUsers()}><ReplayIcon color={"primary"}/></IconButton>
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
    const {width, value, field} = props;
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
                sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
            >
                {field === 'email' ? <u>{value}</u> : value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{width, marginLeft: -17}}
                >
                    <Paper
                        elevation={1}
                        style={{minHeight: wrapper.current.offsetHeight - 3}}
                    >
                        <Typography variant="body2" style={{padding: 8}}>
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
        <GridCellExpand field={params.field} value={params.value || ''} width={params.colDef.computedWidth}/>
    );
}

export default Users;