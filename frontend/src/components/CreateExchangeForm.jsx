import { Typography, Box, Button, TextField, Stack, Autocomplete, Paper } from '@mui/material';
import { useState } from 'react';
import exchangeRequestService from '../services/exchangerequests';

const CreateExchangeForm = ({ user, users, setRequests, requests }) => {
    const [toUser, setToUser] = useState(null);
    const [skillsOffered, setSkillsOffered] = useState([]);
    const [skillsWanted, setSkillsWanted] = useState([]);

    const otherUsers = users.filter(u => u.username !== user.username);

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("skills offered:", skillsOffered)
        console.log("skills wanted:", skillsWanted)
        console.log("to user", toUser);

        const newExchangeRequest = await exchangeRequestService.create({
            toUser: toUser.id,
            skillsOffered,
            skillsWanted
        })
        setRequests(requests.concat(newExchangeRequest))
        setToUser(null)
        setSkillsOffered([])
        setSkillsWanted([])
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Create a Skill Exchange
                </Typography>

                <Stack spacing={3} mt={3}>
                    {/* User Selector */}
                    <Autocomplete
                        options={otherUsers}
                        getOptionLabel={(option) => option.username}
                        value={toUser}
                        onChange={(e, newValue) => setToUser(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select User"
                                placeholder="Start typing a name..."
                                helperText="Choose the person you want to exchange skills with"
                            />
                        )}
                    />

                    {/* Skills Offered */}
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]} // Add predefined skills if you want
                        value={skillsOffered}
                        onChange={(e, newValue) => setSkillsOffered(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Skills Offered"
                                placeholder="e.g. Python, Guitar, Design"
                                helperText="List the skills you're offering to teach or share"
                            />
                        )}
                    />

                    {/* Skills Wanted */}
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        value={skillsWanted}
                        onChange={(e, newValue) => setSkillsWanted(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Skills Wanted"
                                placeholder="e.g. Public Speaking, Cooking"
                                helperText="List the skills you want to learn"
                            />
                        )}
                    />

                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Send Exchange Request
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default CreateExchangeForm;
