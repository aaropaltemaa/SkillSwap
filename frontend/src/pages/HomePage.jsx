import { Alert } from "@mui/material"

const HomePage = ({ user, successMessage }) => (
    <>
        {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
            </Alert>
        )}
        {user && <h3>welcome {user.username}</h3>}
    </>
)
export default HomePage