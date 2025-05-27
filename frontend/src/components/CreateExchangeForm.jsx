import { Typography, Box, Button, TextField, InputLabel, FormControl, Alert, Stack, Autocomplete, Paper } from '@mui/material';
import { useState } from 'react';
import exchangeRequestService from '../services/exchangerequests';

const CreateExchangeForm = ({ user, users }) => {
    const [toUser, setToUser] = useState("");
    const [skillsOffered, setSkillsOffered] = useState([]);
    const [skillsWanted, setSkillsWanted] = useState([]);

    const otherUsers = users.filter(u => u.username !== user.username)

    const handleSubmit = async () => {
        console.log('toUser:', toUser);
        console.log('skillsOffered:', skillsOffered);
        console.log('skillsWanted:', skillsWanted);

        if (!toUser || skillsOffered.length === 0 || skillsWanted.length === 0) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const newExchangeRequest = await exchangeRequestService.create({
                toUser,
                skillsOffered,
                skillsWanted,
            });
            alert("Exchange request sent!");
            setToUser('');
            setSkillsOffered([]);
            setSkillsWanted([]);
        } catch (error) {
            console.error(error);
            alert("Failed to send request.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Create a Skill Exchange
                </Typography>
                <Box mt={3} /> {/* Add vertical space */}
                <Stack spacing={3}>
                    <Autocomplete
                        options={otherUsers}
                        getOptionLabel={(option) => option.username}
                        value={users.find(u => u.id === toUser) || null}
                        onChange={(e, newValue) => setToUser(newValue?.id || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select User"
                                placeholder="Start typing a name..."
                                helperText="Choose the person you want to exchange skills with"
                            />
                        )}
                    />

                    <Autocomplete
                        multiple
                        options={skillsOffered}
                        value={skillsOffered}
                        onChange={(e, newValue) => setSkillsOffered(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Skills Offered"
                                placeholder="e.g. Python, Guitar, Design"
                                helperText="List the skills you're offering to teach or share"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        value={skillsWanted}
                        onChange={(e, newValue) => setSkillsWanted(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Skills Wanted"
                                placeholder="e.g. Public Speaking, Cooking"
                                helperText="List the skills you want to learn"
                            />
                        )}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        Send Exchange Request
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default CreateExchangeForm