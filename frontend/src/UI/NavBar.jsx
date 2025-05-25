import { AppBar, Toolbar } from "@mui/material"
import { Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HoverPopoverIconButton from '../components/HoverPopoverIconButton';
import { useState } from "react";

const NavBar = ({ user, handleLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                                to="/exchange-requests"
                                icon={AddCircleIcon}
                                label="Create Exchange Request"
                            />
                            <Button color="inherit" sx={{
                                transition: 'color 0.3s ease',
                                '&:hover': {
                                    color: 'secondary.main',
                                },
                            }}> <NotificationsIcon />
                            </Button>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                            >
                                <MenuItem component={Link} to="/my-requests" onClick={handleMenuClose}>
                                    My Requests
                                </MenuItem>
                                <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
                                    About
                                </MenuItem>
                            </Menu>
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