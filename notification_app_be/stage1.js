const { Log, refreshToken, getToken } = require('../logging_middleware');

const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };

async function fetchNotifications() {
  await Log("frontend", "info", "api", "Fetching notifications from server");
  const res = await fetch(
    "http://20.207.122.201/evaluation-service/notifications",
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  const data = await res.json();
  await Log("frontend", "info", "api", `Fetched ${data.notifications.length} notifications`);
  return data.notifications;
}

function getPriorityScore(notification) {
  const weight = TYPE_WEIGHT[notification.Type] || 0;
  const recency = new Date(notification.Timestamp).getTime();
  return weight * 1e13 + recency;
}

async function getTopNPriorityNotifications(n = 10) {
  await refreshToken();
  await Log("frontend", "info", "utils", `Getting top ${n} priority notifications`);
  const notifications = await fetchNotifications();

  const sorted = [...notifications].sort(
    (a, b) => getPriorityScore(b) - getPriorityScore(a)
  );

  const topN = sorted.slice(0, n);
  await Log("frontend", "info", "utils", `Top ${n} notifications selected successfully`);
  return topN;
}

getTopNPriorityNotifications(10).then(result => {
  console.log(JSON.stringify(result, null, 2));
});