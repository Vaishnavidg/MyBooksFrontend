import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { AddAPhoto, AddBox, CatchingPokemon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <CatchingPokemon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            BOOK STORE
                        </Typography>
                        <Link to='/books/create'>
                            <Button color="info">
                                <AddBox />
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>

        </>

    );
}
