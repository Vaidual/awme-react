import {Box, Button, IconButton, List, ListItem, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import {useProSidebar} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import {useContext, useState} from "react";
import {useDispatch} from "react-redux";

import {ColorModeContext, tokens} from "../../../theme";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../../redux/slices/authSlice";
import _ from "underscore";

const OptionMenu = (props) => {
    const {width = "10em"} = props;
    const theme = useTheme();
    return (
        <Box sx={{
            position: 'absolute',
            opacity: props.isOpened ? 1 : 0,
            display: props.isOpened ? 'block' : 'none',
            transition: '0.2s',
            transform: `translateX(${props.translate}%)`
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
                width: width,
                top: '8px'
            }}
            >{props.children}</List>
        </Box>
    )
}

const LangDropDown = () => {
    // const currentLanguage = useSelector((state) => state.sidebar.selectedLanguage);
    const theme = useTheme();
    const {i18n} = useTranslation();

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpened(prevState => {
            return !prevState;
        });
    }

    const onLangChange = (lang) => {
        i18n.changeLanguage(lang);
        toggleMenu();
    }

    let languages = useSelector((state) => state.sidebar.languages)
        .map((lang) => {
            return (
            <ListItem
                sx={{
                    cursor: 'pointer',
                    padding: '0.7em 0.5em',
                    margin: '0.3em 0',
                    ":hover": {color: theme.palette.text.primary},
                    ".active": {color: 'deepskyblue'},
                    color: lang.key === i18n.language ? theme.palette.primary.main : tokens().text.grey
                }}
                key={lang.key}
                onClick={() => {
                    onLangChange(lang.key)
                }}
                className={`${lang.key === i18n.language && 'active'}`}>
                {lang.name}</ListItem>
            )
        })

    return (
        <Box sx={{boxSizing: 'border-box'}}>
            <Box>
                <IconButton onClick={() => toggleMenu()}>
                    <LanguageIcon/>
                </IconButton>
            </Box>
            <OptionMenu isOpened={isMenuOpened} translate={-60} width={'12em'}>{languages}</OptionMenu>
        </Box>
    )
}

function UserMenu() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpened(prevState => {
            return !prevState;
        });
    }

    let [isDisabled, setIsDisabled] = useState(false);
    const onLogoutClick = async () => {
        await dispatch(logout());
        navigate("login");
    }

    let menuItems = [{label: 'logout', icon: <LogoutIcon/>, onClick: onLogoutClick}]
        .map((item) => {
            return (
                <Button
                    fullWidth
                    sx={{
                        justifyContent: "flex-start",
                        ":hover": {backgroundColor: tokens(theme.palette.mode).background.paperHover},
                        color: theme.palette.text.primary
                    }}

                    disabled={isDisabled}
                    variant="text"
                    startIcon={item.icon}
                    key={item.label}
                    onClick={async () => {
                        setIsDisabled(prevState => !prevState);
                        await item.onClick();
                        setIsDisabled(prevState => !prevState);
                    }}
                    /*className={`${item.key === i18n.language && 'active'}`}*/>
                    {item.label}</Button>
            )
        })

    return (
        <Box sx={{boxSizing: 'border-box'}}>
            <Box>
                <IconButton onClick={() => toggleMenu()}>
                    <PersonIcon/>
                </IconButton>
            </Box>
            <OptionMenu isOpened={isMenuOpened} translate={-72}>{menuItems} </OptionMenu>
        </Box>
    );
}

const Header = () => {
    const userId = useSelector((state) => state.auth.userId, _.isEqual);

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
                    }} alt={'logo'}/></Link>
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
                    {userId ?
                        <UserMenu/> :
                        <Button variant="contained"
                                onClick={() => navigate('/login')}>{t('global.topbar.log_in')}</Button>}
                </Box>
            </Box>
        </Box>
    )
}

export default Header