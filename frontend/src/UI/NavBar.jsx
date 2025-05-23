import { AppBar, Toolbar } from "@mui/material"
import { Container, Typography, Box, Stack, Button } from '@mui/material';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

                    <Box>
                        <Button color="inherit" component={Link} to="/register" sx={{
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: 'secondary.main',
                            },
                            mr: 1,
                        }}>
                            Sign Up
                        </Button>
                        <Button color="inherit" component={Link} to="/login" sx={{
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: 'secondary.main',
                            },
                        }}>
                            Log in
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar