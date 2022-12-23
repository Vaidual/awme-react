import React, {useCallback, useEffect, useState} from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, List, ListItemButton, ListItemText,
    Paper,
    Popper, Typography,
    useTheme
} from "@mui/material";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import {getUsersData, patchUserRole} from "../../../redux/users/usersSlice";
import Loader from "../../../components/Loader/Loader";
import SectionHeader from "../../../components/Header/SectionHeader";
import {tokens} from "../../../theme";
import ReplayIcon from '@mui/icons-material/Replay';
import {ClickAwayListener} from "@mui/base";
import {useTranslation} from "react-i18next";
import {ROLES} from "../../../config/roles";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "../../../components/Feedback/Alert";
import useAuth from "../../../hooks/useAuth";
import {ModalContent} from "../../../components/Forms/Modals/ModalContent";
import CustomToolbar from "../../../components/Forms/Table/CustomToolbar";

const listComparator = (v1, v2) => {

    return v1.length - v2.length
};

const Users = () => {
    const {t} = useTranslation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const {roles} = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const [promiseArguments, setPromiseArguments] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

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
        {field: 'id', headerName: "ID", type: 'number', width: 60},
        {field: 'email', headerName: t('users.table.rows.email'), flex: 1, renderCell: renderCellExpand},
        {field: 'firstName', headerName: t('users.table.rows.firstName'), flex: 1},
        {field: 'lastName', headerName: t('users.table.rows.lastName'), flex: 1},
        {
            field: 'role',
            headerName: t('users.table.rows.roles'),
            flex: 1,
            type: 'singleSelect',
            valueOptions: Object.values(ROLES).filter(v => v !== ROLES.Admin),
            editable: roles.some(r => r === ROLES.Admin),
        },
        {
            field: 'animals',
            headerName: t('users.table.rows.animals'),
            flex: 1,
            type: 'number',
            headerAlign: 'left',
            valueFormatter: ({value}) => {
                return value.length;
            },
            renderCell: renderCellList,
            sortComparator: listComparator
        },
        {
            field: 'collars',
            type: 'number',
            headerName: t('users.table.rows.collars'),
            headerAlign: 'left',
            valueFormatter: ({value}) => {
                return value.length;
            },
            flex: 1, renderCell: renderCellList,
            sortComparator: listComparator
        },
    ];

    const processRowUpdate = useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                if (newRow.role !== oldRow.role) {
                    setPromiseArguments({resolve, reject, newRow, oldRow});
                } else {
                    resolve(oldRow);
                }
            }),
        [],
    );

    const RenderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const handleSubmit = () => {
            const { newRow, oldRow, reject, resolve } = promiseArguments;
            setIsFetching(true);
            dispatch(patchUserRole({id: newRow.id, data: newRow.role}))
                .unwrap()
                .then((data) => {
                    setAlert({severity: "success", children: t('global.modals.confirm.alert.success')});
                    resolve(newRow);
                    setPromiseArguments(null);
                })
                .catch((error) => {
                    setAlert({severity: "error", children: error.message});
                    reject(oldRow);
                    setPromiseArguments(null);
                }).finally(function () {
                setIsFetching(false);
            });
        }

        const handleModalClose = () => {
            const { oldRow, resolve } = promiseArguments;
            resolve(oldRow);
            setPromiseArguments(null);
        };

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog open={!!promiseArguments} onClose={handleModalClose}>
                <ModalContent title={t('global.modals.confirm.title')} description={t('global.modals.confirm.description', mutation)}/>
                <DialogActions>
                    <LoadingButton color={"primary"} loading={isFetching}
                                   onClick={handleSubmit}>{t('global.modals.confirm.confirm')}</LoadingButton>
                    <Button color={"inherit"} onClick={handleModalClose}>{t('global.modals.confirm.cancel')}</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Box m={'20px'}>
            <RenderConfirmDialog/>
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
                        experimentalFeatures={{ newEditingApi: true }}
                        editMode={"row"}
                        isCellEditable={(params) => params.row.role !== ROLES.Admin}
                        processRowUpdate={processRowUpdate}
                        components={{Toolbar: CustomToolbar}}
                        componentsProps={{toolbar: {updateTable: getUsers}}}
                        columns={columns}
                        rows={users}

                    />
                    : <Loader/>}
            </Box>
            <Alert alert={alert} setAlert={setAlert}/>
        </Box>
    );
}

function computeMutation(newRow, oldRow) {
    if (newRow.role !== oldRow.role) {
        return {field: "ROLE", from: oldRow.role, to: newRow.role};
    }
    return null;
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
                                                      sx={{backgroundColor: theme.palette.background.paper}}><ListItemText
                primary={item.name}/></ListItemButton>);
            break;
        case 'collars':
            items = value.map(item => <ListItemButton key={item.id}
                                                      sx={{backgroundColor: theme.palette.background.paper}}><ListItemText
                primary={item.id}/></ListItemButton>);
            break;
        default:
            items = value.map(item => <ListItemButton key={item.id}
                                                      sx={{backgroundColor: theme.palette.background.paper}}><ListItemText
                primary={item.id}/></ListItemButton>);
            break;
    }

    return value.length === 0 ?
        <Button disabled sx={{justifyContent: 'flex-start'}} fullWidth color={"inherit"}>{'0'}</Button> :
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