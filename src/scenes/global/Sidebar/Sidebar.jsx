import {Sidebar as ProSidebar, Menu, MenuItem, menuClasses} from "react-pro-sidebar";
import {Box, SvgIcon, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
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
                            icon={<AccessibilityNewIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title={t('global.sidebar.collars')}
                            to={"/collars"}
                            icon={<CollarIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title={t('global.sidebar.profiles')}
                            to={"/profiles"}
                            icon={<PeopleIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Menu>
                </ProSidebar>
            </Box>
    )
}

export const CollarIcon = () => {
    return (
        <SvgIcon viewBox={"0 0 512 512"}><path d="M477.311,101.023c-99.138-134.615-343.36-134.781-442.619,0c-2.178,2.957-3.48,6.707-3.48,10.594V250.06
	c0,3.812,1.219,7.524,3.48,10.593c35.822,48.641,92.842,80.778,154.276,93.998c-16.059,16.721-25.962,39.397-25.962,64.355
	C163.006,470.283,204.723,512,256,512s92.994-41.718,92.994-92.994c0-24.959-9.902-47.635-25.962-64.355
	c61.355-13.203,118.438-45.333,154.276-93.998c2.26-3.069,3.48-6.781,3.48-10.593V111.617
	C480.79,107.735,479.49,103.983,477.311,101.023z M440.091,111.606c-14.05,16.313-31.991,31.279-54.168,43.707
	c-75.434-60.81-183.881-61.239-259.843,0.002c-22.096-12.385-40.108-27.382-54.167-43.71
	C159.052,10.446,352.825,10.302,440.091,111.606z M163.643,172.224c55.931-35.799,128.332-36.077,184.711-0.002
	C291.761,192.1,222.854,193.037,163.643,172.224z M256.001,476.274c-31.579,0-57.269-25.691-57.269-57.269
	c0-25.341,16.552-46.877,39.406-54.401v27.244c0,9.865,7.998,17.863,17.863,17.863s17.863-7.998,17.863-17.863v-27.244
	c22.856,7.524,39.406,29.06,39.406,54.401C313.27,450.583,287.58,476.274,256.001,476.274z M445.065,244.026
	c-36.973,46.766-100.944,76.988-171.201,81.404v-29.53c0-9.865-7.998-17.863-17.863-17.863c-9.865,0-17.863,7.998-17.863,17.863
	v29.53c-70.256-4.416-134.227-34.638-171.201-81.404v-86.868c100.902,88.264,277.651,87.922,378.127,0v86.868H445.065z"/></SvgIcon>
    );
}

export default Sidebar;