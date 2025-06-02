import { Card, CardContent, Typography, Stack, Chip, Box, Avatar, Divider, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import exchangeRequestService from '../services/exchangerequests';

const statusColors = {
    pending: 'warning.main',
    accepted: 'success.main',
    rejected: 'error.main',
};

const ExchangeRequestsPage = ({ requests, setRequests, currentUserId }) => {
    const receivedRequests = requests.filter(req => req.toUser.id === currentUserId);

    if (receivedRequests.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
                <Typography variant="h6" color="text.secondary">
                    No exchange requests found.
                </Typography>
            </Box>
        );
    }

    const handleRespond = async (requestId, newStatus) => {
        try {
            const updatedRequest = await exchangeRequestService.updateStatus(requestId, newStatus);
            const updatedRequests = requests.map((r) =>
                r.id === requestId ? updatedRequest : r
            );
            setRequests(updatedRequests);
        } catch (error) {
            console.error("Failed to update request status:", error);
        }
    };


    return (
        <Stack spacing={3} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            {receivedRequests.map((req) => {
                const isSent = req.fromUser.id === currentUserId;
                const user = isSent ? req.toUser : req.fromUser;
                const statusColor = statusColors[req.status] || 'grey.500';

                return (
                    <Card
                        key={req.id}
                        variant="outlined"
                        sx={{
                            borderRadius: 4,
                            boxShadow: 2,
                            transition: 'box-shadow 0.2s',
                            '&:hover': { boxShadow: 6 },
                            borderColor: statusColor,
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {isSent ? 'To' : 'From'}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {user.username}
                                    </Typography>
                                </Box>
                                <Box flexGrow={1} />
                                <Chip
                                    label={req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    size="small"
                                    sx={{
                                        bgcolor: statusColor,
                                        color: 'white',
                                        fontWeight: 600,
                                        letterSpacing: 0.5,
                                    }}
                                />
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Box flex={1}>
                                    <Typography variant="body2" fontWeight={600} color="primary.main" mb={0.5}>
                                        Skills Offered
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {req.skillsOffered.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                color="primary"
                                                variant="filled"
                                                sx={{ mb: 0.5 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                                <Box flex={1}>
                                    <Typography variant="body2" fontWeight={600} color="secondary.main" mb={0.5}>
                                        Skills Wanted
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {req.skillsWanted.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                color="secondary"
                                                variant="filled"
                                                sx={{ mb: 0.5 }}
                                            />
                                        ))}
                                    </Stack>
                                    <Stack direction="row" spacing={2} mt={2}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleRespond(req.id, 'accepted')}
                                            sx={{ flex: 1 }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRespond(req.id, 'rejected')}
                                            sx={{ flex: 1 }}
                                        >
                                            Decline
                                        </Button>
                                    </Stack>

                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                );
            })}
        </Stack>
    );
};

export default ExchangeRequestsPage;
