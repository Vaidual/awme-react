import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
    Icon,
    IconButton, Snackbar,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {tokens} from "../../../theme";
import {useDispatch} from "react-redux";
import SectionHeader from "../../../components/Header/SectionHeader";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import Loader from "../../../components/Loader/Loader";
import {deleteCollar, getCollarsData, postCollar} from "../../../redux/collars/collarsSlice";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {lightBlue, lightGreen} from "@mui/material/colors";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";

function Collars() {
    const {t} = useTranslation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [selectedRows, setSelectedRows] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [collars, setCollars] = useState();
    const getCollars = async () => {
        setLoading(true);
        const data = await dispatch(getCollarsData()).unwrap();
        setLoading(false);
        setCollars(await data);
    }

    useEffect(() => {
        getCollars();
    }, []);
    const columns = [
        {field: 'id', headerName: "ID", type: 'number', width: 80},
        {
            field: 'isUse',
            headerName: t('collars.table.rows.inUse'),
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({row: {inUse}}) => {
                return (
                    <Box p={'5px'} borderRadius={4} border={`1px solid`}
                         color={inUse ? lightGreen[400] : lightBlue[400]} display={"flex"}>
                        <Icon>{inUse ? <CheckCircleIcon/> : <HourglassBottomIcon/>}</Icon>
                        <Typography ml={'10px'}>{inUse ? 'In use' : 'Available'}</Typography>
                    </Box>
                )
            }
        },
        {
            field: 'user', headerName: t('collars.table.rows.userId'), headerAlign: 'center',
            align: 'center', valueFormatter: (params) => {
                return params.value ? params.value.id : '';
            },
        },
        {
            field: 'animal', headerName: t('collars.table.rows.animal'), flex: 1, headerAlign: 'center',
            align: 'center', valueFormatter: (params) => {
                return params.value ? params.value.name : '';
            },
        },
    ]

    const [showAlert, setShowAlert] = useState({severity: "", message: '', show: false});

    return (
        <Box m={'20px'} position={"relative"}>
            <Box >
                <SectionHeader title={t('collars.title.main')} subtitle={t('collars.title.sub')}/>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Box display={"flex"} justifyContent={"center"} height={'70vh'} width={1000} sx={{
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
                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRows = collars.filter(c =>
                                    selectedIDs.has(c.id),
                                );
                                setSelectedRows(selectedRows);
                            }}
                            checkboxSelection
                            components={{Toolbar: CustomToolbar}}
                            componentsProps={{toolbar: {getCollars: getCollars, selectedCollars: selectedRows, setShowAlert}}}
                            columns={columns}
                            rows={collars}
                        />
                        : <Loader/>}
                </Box>
            </Box>
            <Alert showAlert={showAlert} setShowAlert={setShowAlert}/>
        </Box>
    );
}

export const Alert = (props) => {
    const MAlert = React.forwardRef(function MAlert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setShowAlert(0);
    }
    return (
        <Snackbar open={props.showAlert.show} autoHideDuration={6000} onClose={handleAlertClose}>
            <MAlert onClose={handleAlertClose} severity={props.showAlert.severity} sx={{width: '100%'}}>
                {props.showAlert.message}
            </MAlert>
        </Snackbar>
    )
}

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
                <AddCollarModal setShowAlert={props.setShowAlert} getCollars={props.getCollars}/>
                <DeleteCollarModal setShowAlert={props.setShowAlert} selectedCollars={props.selectedCollars} getCollars={props.getCollars}/>
                <GridToolbarExport/>
                <IconButton onClick={() => props.getCollars()}><ReplayIcon color={"primary"}/></IconButton>
            </Box>

        </GridToolbarContainer>
    );
}

const AddCollarModal = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [newCollarValue, setNewCollarValue] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (newCollarValue === "") {
            props.setShowAlert({show: true, severity: "error", message: t('collars.modals.add.alerts.minLength')});
            return;
        }
        setIsFetching(true);
        dispatch(postCollar(newCollarValue))
            .unwrap()
            .then((data) => {
                props.setShowAlert({show: true, severity: "success", message: t('collars.modals.add.alerts.success')});
                props.getCollars();
                setOpen(false);
                setNewCollarValue("");
            })
            .catch((error) => {
                props.setShowAlert({show: true, severity: "error", message: error.message})
            }).finally(function () {
            setIsFetching(false);
        });
    }

    const handleModalClose = () => {
        setOpen(false);
        setNewCollarValue("");
    };

    const handleValueChange = (newValue) => {
        setNewCollarValue(newValue.target.value);
    }

    return (
        <>
            <Button onClick={handleClickOpen} startIcon={<AddIcon color={"primary"}/>}>{t('global.table.actions.add')}</Button>
            <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle>{t('collars.modals.add.title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('collars.modals.add.description')}
                    </DialogContentText>
                    <TextField
                        value={newCollarValue}
                        onChange={handleValueChange}
                        autoFocus
                        margin="dense"
                        label={t('collars.modals.add.field')}
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={isFetching} variant={"contained"}
                                   onClick={handleSubmit}>{t('collars.modals.add.addBtn')}</LoadingButton>
                    <Button onClick={handleModalClose}>{t('collars.modals.add.close')}</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

const DeleteCollarModal = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const handleClickOpen = () => {
        if (props.selectedCollars.some(c => c.inUse === true)) {
            props.setShowAlert({show: true, severity: "error", message: t('collars.modals.delete.alerts.inUseError')});
            return;
        } else if (props.selectedCollars.length === 0) {
            props.setShowAlert({show: true, severity: "error", message: t('collars.modals.delete.alerts.zeroSelected')});
            return;
        }
        setOpen(true);
    };

    const handleSubmit = () => {
        setIsFetching(true);
        for (let i = 0; i < props.selectedCollars.length; i++) {
            dispatch(deleteCollar(props.selectedCollars[i].id))
                .unwrap()
                .then((data) => {
                    props.setShowAlert({show: true, severity: "success", message: t('collars.modals.delete.alerts.success')});
                    props.getCollars()
                    setOpen(false);
                })
                .catch((error) => {
                    props.setShowAlert({show: true, severity: "error", message: error.message})
                }).finally(function () {
            });
        }
        setIsFetching(false);
    }

    const handleModalClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button onClick={handleClickOpen} startIcon={<DeleteIcon color={"primary"}/>}>{t('global.table.actions.delete')}</Button>
            <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle>{t('collars.modals.delete.title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('collars.modals.delete.description')}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <LoadingButton color={"warning"} loading={isFetching}
                                   onClick={handleSubmit}>{t('collars.modals.delete.deleteBtn')}</LoadingButton>
                    <Button color={"inherit"} onClick={handleModalClose}>{t('collars.modals.delete.cancelBtn')}</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Collars;