import {Sidebar as ProSidebar, Menu, MenuItem, menuClasses} from "react-pro-sidebar";
import {Box, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {tokens} from "../../../theme";

const Item = ({title, icon, to, selected, setSelected}) => {
    return (
        <MenuItem icon={icon} routerLink={<Link to={to}/>} active={selected === to} onClick={() => setSelected(to)}>
            <Typography>{title}</Typography>
        </MenuItem>
    )
}

const Sidebar = () => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState('/1');
    const theme = useTheme();
    return (
            <Box height={'100%'}>
                <ProSidebar style={{borderRightWidth: 0}} rootStyles={{
                    [`.${menuClasses.button}:hover`]: {
                        backgroundColor: tokens(theme.palette.mode).background.paperHover
                    },
                    [`.${menuClasses.button}`]: {
                        backgroundColor: theme.palette.background.paper,
                    },
                    [`.${menuClasses.active}`]: {
                        color: theme.palette.primary.main,
                    },
                }}>
                    <Menu
/*                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                // only apply styles on first level elements of the tree
                                if (level === 0)
                                    return {
                                        color: active ? theme.palette.primary.main : theme.palette.text.primary,
                                        backgroundColor: theme.palette.background.paper,
                                    };
                            },
                        }}*/
                    >
                        <Item
                            title={t('global.sidebar.users')}
                            to={"/users"}
                            icon={<PeopleIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Menu>
                </ProSidebar>
            </Box>
    )
}

export default Sidebar;