import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [justRegistered, setJustRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (justRegistered) {
            navigate('/');
        }
    }, [justRegistered, navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();
        setJustRegistered(true)
        console.log("test")
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleRegister}
                autoComplete="off" // Prevents the whole form from being auto-filled
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
        </Container>

    );
}

export default RegisterForm;