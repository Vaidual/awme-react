import {Box, IconButton, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import { useProSidebar} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useContext} from "react";
import {ColorModeContext} from "../../theme";

const Topbar = () => {
    const { collapseSidebar } = useProSidebar();

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box width={"100%"} top={0}>
            <Box px="8px" py="2px" display={"flex"} justifyContent={"space-between"}>
                <IconButton onClick={ () => collapseSidebar() }><MenuIcon/></IconButton>
                <Box>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <IconButton>
                        <LanguageIcon/>
                    </IconButton>
                    <IconButton>
                        <PersonIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Topbar