# Campus Notification App - Frontend

A responsive React application built for the campus notification platform where students receive real-time updates regarding Placements, Events, and Results.

## Features

- **All Notifications Page** - View all campus notifications with:
  - Filter by notification type (Placement, Result, Event)
  - New vs Read distinction (click to mark as read)
  - Pagination support
  - Refresh button to fetch latest notifications

- **Priority Inbox Page** - Smart priority ranking with:
  - Top N selector (10, 15, 20 notifications)
  - Priority ranking based on type weight and recency
  - Filter by notification type
  - Numbered ranking badges on each notification

- **Logging Middleware** - Every action is logged to the evaluation server including:
  - Page mounts
  - API calls
  - State changes
  - Errors

## Tech Stack

- **React** - Frontend framework
- **Material UI** - Component library for styling
- **React Router DOM** - Client side routing
- **Custom Logging Middleware** - Reusable logging package

## Project Structure
notification_app_fe/
src/
api/
notifications.js      - API calls, token management, priority algorithm
components/
Navbar.js             - Top navigation bar
NotificationCard.js   - Individual notification card component
logging_middleware/
index.js              - Logging middleware (reusable package)
pages/
AllNotifications.js   - All notifications page with filter and pagination
PriorityInbox.js      - Priority inbox page with Top N selector
state/
NotificationContext.js - Global state management using React Context
App.js                  - Root component with routing

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

App runs on http://localhost:3000

## Pages

### All Notifications (/)
Displays all notifications fetched from the evaluation server.
- Filter by type: Placement, Result, Event
- Blue left border = unread, Grey = already read
- NEW badge on unread notifications
- Pagination with 10 notifications per page

### Priority Inbox (/priority)
Displays top N notifications ranked by priority score.

**Priority Algorithm:**
- Placement weight = 3 (Highest)
- Result weight = 2 (Medium)  
- Event weight = 1 (Lowest)
- Score = type_weight × 10^13 + unix_timestamp_ms
- Higher score = higher priority

## Notification Types

| Type | Priority | Color |
|------|----------|-------|
| Placement | High | Green |
| Result | Medium | Orange |
| Event | Low | Blue |

## Logging

Every significant action is logged using the custom logging middleware:

```javascript
Log("frontend", "info", "page", "AllNotifications page mounted")
Log("frontend", "error", "api", "Failed to fetch notifications")
Log("frontend", "info", "component", "Notification marked as viewed")
```


