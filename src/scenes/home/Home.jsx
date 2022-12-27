import React from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import heroVideo from './hero.mp4'
import {useTranslation} from "react-i18next";

function Home() {
    const theme = useTheme();
    const {t} = useTranslation();

    return (
        <Box>
            <Box>
                <video style={{width: '100%', height: '100%', objectFit: 'cover'}} src={heroVideo} autoPlay={true} muted={true} playsInline={true} loop={true}>
                </video>
            </Box>
            <Box textAlign={"left"}
                sx={{
                    marginLeft: '100px',
                    position: 'absolute',
                    width: '28%',
                    height: '60%',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography fontWeight={'bold'} variant="h2" color='white'>{t('home.title')}</Typography>
                <Typography variant="h4" color='white'>{t('home.titleDescription')}</Typography>
            </Box>
        </Box>
    );
}

export default Home;