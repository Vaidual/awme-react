import {Box, Stack, useTheme} from "@mui/material";
import styles from './Loader.module.css'

const Loader = () => {
    const theme = useTheme();

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                height: '100%'
            }}>
            <Box sx={{'div:after':{background: theme.palette.secondary.main}}} className={styles.ldsRoller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </Box>
        </Stack>
    );
}

export default Loader;