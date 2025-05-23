import { Alert, Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom";

const HeroSection = () => (
    <Box
        sx={{
            py: 8,
            px: 2,
            borderRadius: 2,
            mb: 4,
        }}
    >
        <Typography variant="h3" fontWeight={600} gutterBottom>
            Trade skills. Learn together.
        </Typography>
        <Typography variant="h6" color="inherit" maxWidth={600} mx="auto" mb={4}>
            SkillSwap connects people who want to teach and learn — from coding to cooking, design to dancing.
        </Typography>
        <Button
            variant="contained"
            size="large"
            component={Link}
            to="/register"
        >
            Get Started
        </Button>
    </Box>
);

const HomePage = ({ successMessage }) => (
    <>
        <HeroSection />
        {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
            </Alert>
        )}
    </>
)
export default HomePage