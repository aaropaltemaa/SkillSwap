import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import registerService from '../services/register';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        await registerService.register({
            username,
            password,
            name,
            email
        })
        navigate('/')
        setUsername("")
        setPassword("")
        setName("")
        setEmail("")
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleRegister}
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
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                />
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
                    Sign Up
                </Button>
                <Typography variant="body2" textAlign="center">
                    Already have an account? <Link to="/login">Log in</Link>
                </Typography>
            </Box>
        </>
    );
}

export default RegisterForm;