import { AppBar, Toolbar } from "@mui/material"
import { Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HoverPopoverIconButton from '../components/HoverPopoverIconButton';

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
                            <HoverPopoverIconButton
                                to="/me"
                                icon={AccountBoxIcon}
                                label="Your Profile"
                            />
                            <HoverPopoverIconButton
                                to="/dashboard"
                                icon={DashboardIcon}
                                label="Dashboard"
                            />
                            <Button color="inherit" sx={{
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: 'secondary.main',
                                },
                            }}> <NotificationsIcon />
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