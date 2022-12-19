import {Box, Button, IconButton, List, ListItem, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import {useProSidebar} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useContext, useState} from "react";

import {ColorModeContext, tokens} from "../../../theme";
import {useSelector, useStore} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {Image} from "@mui/icons-material";

const LangDropDown = () => {
    /*    const dispatch = useDispatch();
        dispatch(setLanguage(lang));
        const currentLanguage = useSelector((state) => state.sidebar.selectedLanguage);*/
    const toggleLangMenu = (isOpened) => {
        if (isOpened)
            setLangMenuOptions({opacity: 1, display: 'block'});
        else
            setLangMenuOptions({opacity: 0, display: 'none'});
    }
    const [langMenuOptions, setLangMenuOptions] = useState({opacity: 0, display: 'none'});
    const {i18n} = useTranslation();
    const onLangChange = (lang) => {
        i18n.changeLanguage(lang);
        toggleLangMenu(false);
    }
    const theme = useTheme();

    let languages = useSelector((state) => state.sidebar.languages)
        .map((lang) =>
            <ListItem
                sx={{
                    cursor: 'pointer',
                    padding: '0.7em 0.5em',
                    margin: '0.3em 0',
                    borderRadius: '0.5em',
                    ":hover": {color: theme.palette.text.primary},
                    ".active": {color: 'deepskyblue'},
                    color: lang.key === i18n.language ? theme.palette.primary.main : tokens().text.grey
                }}
                key={lang.key}
                onClick={() => {
                    onLangChange(lang.key)
                }}
                value={lang.key}
                className={`${lang.key === i18n.language && 'active'}`}>
                {lang.name}</ListItem>)

    return (
        <Box sx={{boxSizing: 'border-box'}}>
            <Box>
                <IconButton onClick={() => toggleLangMenu(+!langMenuOptions.opacity)}>
                    <LanguageIcon/>
                </IconButton>
            </Box>
            <Box sx={{
                position: 'absolute',
                opacity: langMenuOptions.opacity,
                display: langMenuOptions.display,
                transition: '0.2s',
                transform: 'translateX(-60%)'
            }}
            >
                <Box sx={{
                    height: 0,
                    position: 'absolute',
                    width: 0,
                    top: '-12px',
                    left: '125px',
                    border: '10px solid transparent',
                    borderBottomColor: theme.palette.background.paper
                }}
                />
                <List sx={{
                    listStyle: 'none',
                    boxShadow: '0px 4px 16px 0px rgb(0 0 0 / 14%)',
                    padding: '0.2em 0.5em',
                    background: theme.palette.background.paper,
                    borderRadius: '0.5em',
                    color: '#a0a0a0',
                    width: '12em',
                    top: '8px'
                }}
                >{languages}</List>
            </Box>
        </Box>
    )
}

const Topbar = () => {
    const user = useSelector((state) => state.user.user);

    const {collapseSidebar} = useProSidebar();

    const {t} = useTranslation();

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();

    return (
        <Box width={"100%"} top={0}>
            <Box px="12px" py="10px" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box display={"flex"}>
                    <IconButton onClick={() => collapseSidebar()}><MenuIcon/></IconButton>
                    <Link to={"/"}><img src={process.env.PUBLIC_URL + 'assets/images/logo.png'} style={{
                        objectFit: 'scale-down',
                        width: '100px'
                    }}/></Link>
                </Box>
                <Box>
                    <Button variant="text">{t('global.topbar.how_its_works')}</Button>
                    <Button variant="text">{t('global.topbar.collar')}</Button>
                    <Button variant="text">{t('global.topbar.app')}</Button>
                    <Button variant="contained">{t('global.topbar.get_now')}</Button>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <IconButton onClick={() => colorMode.toggleColorMode(theme.palette.mode)}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                    <LangDropDown/>
                    {user ?
                        <IconButton><PersonIcon/></IconButton> :
                        <Button variant="contained"
                                onClick={() => navigate('/login')}>{t('global.topbar.log_in')}</Button>}
                </Box>
            </Box>
        </Box>
    )
}

export default Topbar