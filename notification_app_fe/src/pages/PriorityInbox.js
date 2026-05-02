import React, { useEffect } from 'react';
import {
  Container, Typography, Box, FormControl,
  InputLabel, Select, MenuItem, Alert,
  CircularProgress, Chip
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { useNotifications } from '../state/NotificationContext';
import { Log } from '../logging_middleware/index.js';

function PriorityInbox() {
  const {
    loading,
    error,
    topN,
    setTopN,
    filterType,
    setFilterType,
    getPriorityNotifications
  } = useNotifications();

  useEffect(() => {
    async function onMount() {
      await Log("frontend", "info", "page", "PriorityInbox page mounted");
    }
    onMount();
  }, []);

  const priorityNotifications = getPriorityNotifications();

  const filtered = filterType
    ? priorityNotifications.filter(n => n.Type === filterType)
    : priorityNotifications;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Priority Inbox
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Top {topN} notifications ranked by importance and recency
      </Typography>

      <Box sx={{ height: 24 }} />

      <Box display="flex" gap={3} mb={3} flexWrap="wrap" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Top N</InputLabel>
          <Select
            value={topN}
            label="Top N"
            onChange={(e) => setTopN(e.target.value)}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={filterType}
            label="Filter by Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={1} mb={4} flexWrap="wrap" alignItems="center">
        <Typography variant="body2" color="text.secondary" mr={1}>Priority:</Typography>
        <Chip label="Placement (High)" color="success" size="small" />
        <Chip label="Result (Medium)" color="warning" size="small" />
        <Chip label="Event (Low)" color="info" size="small" />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      {!loading && !error && filtered.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
      )}

      {!loading && !error && filtered.map((notification, index) => (
        <Box key={notification.ID} position="relative">
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              zIndex: 1
            }}
          >
            {index + 1}
          </Typography>
          <NotificationCard notification={notification} />
        </Box>
      ))}
    </Container>
  );
}

export default PriorityInbox;