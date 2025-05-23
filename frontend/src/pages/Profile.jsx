import { Typography, TextField, Button, Box } from '@mui/material';

const Profile = ({ user }) => {
    return (
        <Typography>
            {user.username}
        </Typography>
    )
}

export default Profile