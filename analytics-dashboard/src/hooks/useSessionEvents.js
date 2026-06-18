import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export function useSessionEvents(sessionId) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/sessions/${sessionId}/events`);
      // Sort chronologically by timestamp
      const sorted = (data.data ?? []).sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setEvents(sorted);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { events, loading, error, retry: fetch };
}
