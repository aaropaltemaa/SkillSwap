import { AppBar, Toolbar } from "@mui/material"
import { Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const NavBar = ({ user, handleLogout }) => {
    return (
        <AppBar position="static" sx={{ borderRadius: 6, mt: 4, boxShadow: 8, padding: 0.25 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <SwapHorizIcon />
                    <Typography
                        variant="h5"
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: 'secondary.main',
                            },
                        }}
                    >
                        SkillSwap
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/register" sx={{
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: 'secondary.main',
                        },
                        mr: 1,
                    }}>
                        Sign Up
                    </Button>
                    {user ? (
                        <>
                            <Button color="inherit" onClick={handleLogout} sx={{
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: 'secondary.main',
                                },
                            }}>
                                Log out
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/me"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <AccountBoxIcon sx={{ color: 'white' }} />
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login" sx={{
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: 'secondary.main',
                            },
                        }}>
                            Log in
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar