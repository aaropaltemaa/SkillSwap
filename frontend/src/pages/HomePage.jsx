import { Alert } from "@mui/material"

const HomePage = ({ user, successMessage }) => (
    <>
        {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
            </Alert>
        )}
        {user && <h2>Welcome, {user.username}</h2>}
    </>
)
export default HomePage