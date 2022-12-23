import React, {useEffect, useState} from 'react';
import {
    Box, Button, Dialog, DialogActions, MenuItem, Select, useTheme
} from "@mui/material";
import {
    DataGrid, GridActionsCellItem
} from "@mui/x-data-grid";
import {useDispatch} from "react-redux";
import Loader from "../../../components/Loader/Loader";
import SectionHeader from "../../../components/Header/SectionHeader";
import {tokens} from "../../../theme";
import {useTranslation} from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import {Alert} from "../../../components/Feedback/Alert";
import {getProfilesData, patchProfileBan} from "../../../redux/profiles/profilesSlice";
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import GppGoodIcon from '@mui/icons-material/GppGood';
import {lightBlue, red} from "@mui/material/colors";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import {ModalContent} from "../../../components/Forms/Modals/ModalContent";
import CustomToolbar from "../../../components/Forms/Table/CustomToolbar";
import {addDays, addHours, format} from 'date-fns';

const Profiles = () => {
    const {t} = useTranslation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState();
    const [unbanArguments, setUnbanArguments] = useState(null);
    const [banArguments, setBanArguments] = useState(null);
    const [alert, setAlert] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getProfiles = async () => {
        setLoading(true);
        const data = await dispatch(getProfilesData()).unwrap();
        setLoading(false);
        setProfiles(await data);
    }

    useEffect(() => {
        getProfiles();
    }, []);

    const columns = [
        {field: 'id', headerName: "ID", type: 'number', width: 60},
        {
            field: 'username',
            headerName: t('profiles.table.rows.username'),
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'nickname',
            headerName: t('profiles.table.rows.nickname'),
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {field: 'gender', headerName: t('profiles.table.rows.gender'), flex: 1, headerAlign: 'center', align: 'center'},
        {
            field: 'location',
            headerName: t('profiles.table.rows.location'),
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'userId',
            headerName: t('profiles.table.rows.userId'),
            type: 'number',
            width: 60,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'followers',
            headerName: t('profiles.table.rows.followers'),
            type: 'number',
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'isBanned',
            headerName: t('profiles.table.rows.isBanned'),
            type: 'bool',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({value}) => {
                return (
                    value === true ?
                        <RemoveModeratorIcon sx={{color: red[300]}}/> :
                        <GppGoodIcon sx={{color: lightBlue[300]}}/>
                )
            }
        },
        {
            field: 'banEnd',
            headerName: t('profiles.table.rows.banEnd'),
            type: 'dateTime',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: ({value}) => {
                return Date.parse(value) || 0;
            },

            valueFormatter: ({value}) => {
                return value ? new Date(value).toLocaleString('de-DE') : '-';
            },
        },
        {
            field: 'actions',
            type: 'actions',
            getActions: ({row, id}) => {
                return row.isBanned ?
                    [<GridActionsCellItem color={"error"} icon={<DoNotDisturbOffIcon/>}
                                          onClick={() => handleUnban(id)} label={t('profiles.modals.unban.unbanBtn')} showInMenu/>,
                        <GridActionsCellItem icon={<DoDisturbOnIcon/>} onClick={() => handleBan(id, row)}
                                             label={t('profiles.modals.ban.extendBanBtn')} showInMenu/>] :
                    [<GridActionsCellItem icon={<DoDisturbOnIcon/>} onClick={() => handleBan(id, row)} label={t('profiles.modals.ban.banBtn')}
                                          showInMenu/>]
            }
        }
    ];

    const handleBan = (id, row) => {
        setBanArguments({id, row})
    }

    const handleUnban = (id) => {
        setUnbanArguments({id})
    }

    const RenderUnbanDialog = () => {
        if (!unbanArguments) {
            return null;
        }
        const handleSubmit = () => {
            const {id} = unbanArguments;
            setIsFetching(true);
            dispatch(patchProfileBan({id: id, data: {isBanned: false, banEnd: null}}))
                .unwrap()
                .then((data) => {
                    getProfiles();
                    setAlert({severity: "success", children: t('global.modals.confirm.alert.success')});
                    setUnbanArguments(null);
                })
                .catch((error) => {
                    setAlert({severity: "error", children: error.message});
                    setUnbanArguments(null);
                }).finally(function () {
                setIsFetching(false);
            });
        }

        const handleModalClose = () => {
            setUnbanArguments(null);
        };

        return (
            <Dialog open={!!unbanArguments} onClose={handleModalClose}>
                <ModalContent title={t('profiles.modals.unban.title')}
                              description={t('profiles.modals.unban.description')}/>
                <DialogActions>
                    <LoadingButton color={"warning"} loading={isFetching}
                                   onClick={handleSubmit}>{t('global.modals.confirm.confirm')}</LoadingButton>
                    <Button color={"inherit"} onClick={handleModalClose}>{t('global.modals.confirm.cancel')}</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const RenderBanDialog = () => {
        if (!banArguments) {
            return null;
        }

        const options = [
            {value: 1, label: t('profiles.modals.ban.periods.day')},
            {value: 7, label: t('profiles.modals.ban.periods.week')},
            {value: 30, label: t('profiles.modals.ban.periods.month')},
            {value: 365, label: t('profiles.modals.ban.periods.year')},
        ]
        const defaultValue = options[0].value
        const menuItems = options.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [banDays, setBanDays] = useState(defaultValue);

        const handleSubmit = () => {
            const {id, row} = banArguments;
            const initialDate = row.banEnd ? new Date(Date.parse(row.banEnd)) : new Date();
            const newDate = addDays(initialDate, banDays);
            setIsFetching(true);
            dispatch(patchProfileBan({
                id: id,
                data: {isBanned: true, banEnd: format(newDate, "yyyy/MM/dd'T'HH:mm:ss.SSS")}
            }))
                .unwrap()
                .then((data) => {
                    getProfiles();
                    setAlert({severity: "success", children: t('global.modals.confirm.alert.success')});
                    setBanArguments(null);
                })
                .catch((error) => {
                    setAlert({severity: "error", children: error.message});
                    setBanArguments(null);
                }).finally(function () {
                setIsFetching(false);
            });
        }

        const handleModalClose = () => {
            setBanArguments(null);
        };


        return (
            <Dialog open={!!banArguments} onClose={handleModalClose}>
                <ModalContent title={t('profiles.modals.ban.title')}
                              description={t('profiles.modals.ban.description')}>
                    <Select
                        sx={{marginTop: '10px'}}
                        onChange={(event) => setBanDays(event.target.value)}
                        fullWidth
                        value={banDays}
                    >
                        {menuItems}
                    </Select>
                </ModalContent>
                <DialogActions>
                    <LoadingButton color={"warning"} loading={isFetching}
                                   onClick={handleSubmit}>{t('profiles.modals.ban.banBtn')}</LoadingButton>
                    <Button color={"inherit"}
                            onClick={handleModalClose}>{t('profiles.modals.ban.canselBtn')}</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Box m={'20px'}>
            <RenderUnbanDialog/>
            <RenderBanDialog/>
            <SectionHeader title={t('profiles.title.main')} subtitle={t('profiles.title.sub')}/>
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
                        componentsProps={{toolbar: {updateTable: getProfiles}}}
                        columns={columns}
                        rows={profiles}
                    />
                    : <Loader/>}
            </Box>
            <Alert alert={alert} setAlert={setAlert}/>
        </Box>
    );
}

export default Profiles;