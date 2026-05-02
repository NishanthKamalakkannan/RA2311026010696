import { Log } from '../logging_middleware/index.js';

const BASE_URL = "/evaluation-service";

const AUTH_PAYLOAD = {
  email: "nk8644@srmist.edu.in",
  name: "nishanth",
  rollNo: "ra2311026010696",
  accessCode: "QkbpxH",
  clientID: "40a85ffd-0bf0-44e6-9149-8ea75ff39c4d",
  clientSecret: "usbbpNryNGNrrbaC"
};

let authToken = null;

export async function refreshToken() {
  const res = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(AUTH_PAYLOAD)
  });
  const data = await res.json();
  authToken = data.access_token;
  await Log("frontend", "info", "auth", "Token refreshed successfully");
}

export async function fetchNotifications({ page, limit, notification_type } = {}) {
  if (!authToken) await refreshToken();

  await Log("frontend", "info", "api", "Fetching notifications");

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (notification_type) params.append("notification_type", notification_type);

  const res = await fetch(`${BASE_URL}/notifications?${params}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  });

  if (res.status === 401) {
    await refreshToken();
    return fetchNotifications({ page, limit, notification_type });
  }

  if (!res.ok) {
    await Log("frontend", "error", "api", `Failed to fetch notifications: ${res.status}`);
    throw new Error("Failed to fetch notifications");
  }

  const data = await res.json();
  await Log("frontend", "info", "api", `Fetched ${data.notifications.length} notifications successfully`);
  return data.notifications;
}

export function getPriorityScore(notification) {
  const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };
  const weight = TYPE_WEIGHT[notification.Type] || 0;
  const recency = new Date(notification.Timestamp).getTime();
  return weight * 1e13 + recency;
}

export function getTopN(notifications, n) {
  return [...notifications]
    .sort((a, b) => getPriorityScore(b) - getPriorityScore(a))
    .slice(0, n);
}