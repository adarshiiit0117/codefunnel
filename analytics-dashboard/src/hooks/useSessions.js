import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/sessions");
      setSessions(data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { sessions, loading, error, retry: fetch };
}
