import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { useNotifications } from '../state/NotificationContext';
import { Log } from '../logging_middleware/index.js';

const TYPE_COLORS = {
  Placement: 'success',
  Result: 'warning',
  Event: 'info'
};

function NotificationCard({ notification }) {
  const { markAsViewed, isViewed } = useNotifications();
  const viewed = isViewed(notification.ID);

  async function handleClick() {
    if (!viewed) {
      markAsViewed(notification.ID);
      await Log("frontend", "info", "component", `Notification viewed: ${notification.ID}`);
    }
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: 'pointer',
        backgroundColor: viewed ? '#f5f5f5' : '#ffffff',
        borderLeft: viewed ? '4px solid #ccc' : '4px solid #1976d2',
        boxShadow: viewed ? 1 : 3,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 5,
          transform: 'scale(1.01)'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Typography variant="h6" fontWeight={viewed ? 'normal' : 'bold'} sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
            {notification.Message}
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Chip
              label={notification.Type}
              color={TYPE_COLORS[notification.Type] || 'default'}
              size="small"
            />
            {!viewed && (
              <Chip label="NEW" color="primary" size="small" />
            )}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;