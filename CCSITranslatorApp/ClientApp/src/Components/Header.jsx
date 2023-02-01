import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from "@mui/material";
import '@fontsource/roboto/700.css';


const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{justifyContent: "center"}}>
                    <Typography sx={{ py: 4 }} variant="h3">
                        CSSI Translator App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;