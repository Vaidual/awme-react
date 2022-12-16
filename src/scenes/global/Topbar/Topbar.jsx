import {Box, Button, IconButton, ListItem, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import { useProSidebar} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useContext, useState} from "react";
import styles from "./Topbar.module.css"

import {ColorModeContext} from "../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../../../redux/reducers/global-reducer";
import globalSlicer from "../../../redux/reducers/global-reducer";

const LangDropDown = (props) => {
    const currentLanguage = useSelector((state) => state.sidebar.selectedLanguage);
    const dispatch = useDispatch()
    let languages = useSelector((state) => state.sidebar.languages)
        .map((lang) =>
            <ListItem
                onClick={() => dispatch(setLanguage(lang.key))}
                value={lang.key}
                className={`${lang.key === currentLanguage && styles.active}`}>
                {lang.name}</ListItem>)


    return (
        <Box className={styles.dropdown}>
            <Box className={styles.select}>
                <IconButton onClick={() => props.toggle(!props.open)}>
                    <LanguageIcon/>
                </IconButton>
            </Box>
            <ul className={`${styles.menu} ${props.open === true && styles.menuOpen}`}>{languages}</ul>
        </Box>
    )
}

const Topbar = () => {
    const { collapseSidebar } = useProSidebar();

    let [isLangMenuOpen, toggleLangMenu] = useState(false);

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box width={"100%"} top={0}>
            <Box px="12px" py="10px" display={"flex"} justifyContent={"space-between"}>
                <IconButton onClick={ () => collapseSidebar() }><MenuIcon/></IconButton>
                <Box>
                    <Button variant="text">How it works</Button>
                    <Button variant="text">Collar</Button>
                    <Button variant="text">App</Button>
                    <Button variant="contained">Get now</Button>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <LangDropDown open={isLangMenuOpen} toggle={toggleLangMenu}/>
                    <IconButton>
                        <PersonIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Topbar