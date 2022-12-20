import { Typography, Box, useTheme } from "@mui/material";

const SectionHeader = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box mb="30px">
            <Typography
                variant="h3"
                color={theme.palette.text.primary}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h6" color={theme.palette.secondary.main}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default SectionHeader;