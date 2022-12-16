import {Sidebar as ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import {useTranslation} from "react-i18next";

const Item = ({title, icon, to}) => {
    return (
        <MenuItem icon={icon} routerLink={<Link to={to}/>}>
            <Typography>{title}</Typography>
        </MenuItem>
    )
}

const Sidebar = () => {
    const {t} = useTranslation('global', {keyPrefix: 'sidebar'});

    return (
            <Box position={"fixed"} left={0} top={44}>
                <ProSidebar>
                    <Menu>

                        <Item
                            title={t('users')}
                            to={"/"}
                            icon={<PeopleIcon/>}/>
                    </Menu>
                </ProSidebar>
            </Box>
    )
}

export default Sidebar;