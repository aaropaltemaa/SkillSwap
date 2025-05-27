import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';
import loginService from '../services/login';
import exchangeRequestService from '../services/exchangerequests';

const LoginForm = ({ setUser, setSuccessMessage, setErrorMessage, errorMessage }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem("loggedSkillSwapUser", JSON.stringify(user))
            setSuccessMessage("Login successful!");
            setUsername("")
            setPassword("")
            setUser(user)
            exchangeRequestService.setToken(user.token)
            navigate('/')
        } catch (exception) {
            setErrorMessage("wrong username or password")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Log in
            </Typography>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={handleLogin}
                autoComplete="off"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fff',
                }}
            >
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />

                <Button type="submit" variant="contained" size="large">
                    Log in
                </Button>
            </Box>
        </>
    );
}

export default LoginForm