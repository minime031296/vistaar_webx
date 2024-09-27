import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#1976d2', 
                color: 'white',
                boxShadow: 1,
            }}
        >
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                MyApp
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button component={Link} to="/signup" variant="contained" sx={{ color: 'white' }}>
                    Sign Up
                </Button>
                <Button component={Link} to="/login" variant="contained" sx={{ color: 'white' }}>
                    Login
                </Button>
                <Button component={Link} to="/" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                    Home
                </Button>
            </Box>
        </Box>
    );
};

export default Navbar;
