import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // change to 'dark' if you want a dark theme
        primary: {
            main: '#1976d2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff4081',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f9f9fb',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#4f4f4f',
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.2rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.8rem',
        },
        h3: {
            fontWeight: 500,
            fontSize: '1.5rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 20px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;
