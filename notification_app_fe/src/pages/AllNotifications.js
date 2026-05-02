import React, { useEffect } from 'react';
import {
  Container, Typography, Box, FormControl,
  InputLabel, Select, MenuItem, Button,
  CircularProgress, Alert, Pagination
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { useNotifications } from '../state/NotificationContext';
import { Log } from '../logging_middleware/index.js';

function AllNotifications() {
  const {
    notifications,
    loading,
    error,
    filterType,
    setFilterType,
    page,
    setPage,
    loadNotifications
  } = useNotifications();

  useEffect(() => {
    async function onMount() {
      await Log("frontend", "info", "page", "AllNotifications page mounted");
    }
    onMount();
  }, []);

  function handleFilterChange(e) {
    setFilterType(e.target.value);
    setPage(1);
  }

  function handlePageChange(e, value) {
    setPage(value);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        All Notifications
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Click a notification to mark it as read
      </Typography>

      <Box sx={{ height: 24 }} />

      <Box display="flex" gap={3} mb={4} flexWrap="wrap" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType} label="Filter by Type" onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" size="medium" onClick={loadNotifications} sx={{ px: 3 }}>
          Refresh
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
      )}

      {!loading && !error && notifications.map(notification => (
        <NotificationCard key={notification.ID} notification={notification} />
      ))}

      {!loading && notifications.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

export default AllNotifications;