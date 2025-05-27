import { useEffect, useState } from 'react';
import exchangeRequestService from '../services/exchangerequests';
import { Typography, Box, Paper, Stack } from '@mui/material';

const ExchangeRequestsPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await exchangeRequestService.getAll();
                setRequests(data);
            } catch (error) {
                console.error('Failed to fetch exchange requests:', error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Exchange Requests
            </Typography>
            <Stack spacing={2}>
                {requests.map((req) => (
                    <Paper key={req._id} sx={{ p: 2 }}>
                        <Typography>
                            <strong>From:</strong> {req.fromUser.username}
                        </Typography>
                        <Typography>
                            <strong>To:</strong> {req.toUser.username}
                        </Typography>
                        <Typography>
                            <strong>Offering:</strong> {req.skillsOffered.join(', ')}
                        </Typography>
                        <Typography>
                            <strong>Wanting:</strong> {req.skillsWanted.join(', ')}
                        </Typography>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default ExchangeRequestsPage;
