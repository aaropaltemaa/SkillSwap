import { Typography, TextField, Button, Box } from '@mui/material';

const Profile = ({ user }) => {
    return (
        <Typography variant="body1">
            Hello, {user.username}
        </Typography>
    )
}

export default Profile