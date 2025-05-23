// src/components/HoverPopoverIconButton.jsx
import { Button, Popover, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HoverPopoverIconButton = ({ to, icon: IconComponent, label }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                color="inherit"
                component={Link}
                to={to}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <IconComponent sx={{ color: 'white' }} />
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                disableRestoreFocus
                sx={{ pointerEvents: 'none' }}
            >
                <Box sx={{ p: 1 }}>
                    <Typography variant="body2">{label}</Typography>
                </Box>
            </Popover>
        </>
    );
};

export default HoverPopoverIconButton;
