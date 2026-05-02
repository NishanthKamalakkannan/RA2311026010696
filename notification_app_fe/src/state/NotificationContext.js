import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNotifications, getTopN } from '../api/notifications';
import { Log } from '../logging_middleware/index.js';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewedIds, setViewedIds] = useState(() => {
    return new Set(JSON.parse(localStorage.getItem("viewedIds") || "[]"));
  });
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    loadNotifications();
  }, [filterType, page]);

  async function loadNotifications() {
    try {
      setLoading(true);
      await Log("frontend", "info", "state", "Loading notifications into context");
      const data = await fetchNotifications({
        page,
        limit,
        notification_type: filterType || undefined
      });
      setNotifications(data);
      setError(null);
    } catch (err) {
      await Log("frontend", "error", "state", `Error loading notifications: ${err.message}`);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  function markAsViewed(id) {
    setViewedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem("viewedIds", JSON.stringify([...next]));
      return next;
    });
  }

  function isViewed(id) {
    return viewedIds.has(id);
  }

  function getPriorityNotifications() {
    return getTopN(notifications, topN);
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      loading,
      error,
      filterType,
      setFilterType,
      page,
      setPage,
      topN,
      setTopN,
      markAsViewed,
      isViewed,
      getPriorityNotifications,
      loadNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}