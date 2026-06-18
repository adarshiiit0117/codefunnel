import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export function useHeatmap(pageUrl) {
  const [points, setPoints] = useState([]);
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available pages for the dropdown
  const fetchPages = useCallback(async () => {
    setLoadingPages(true);
    setError(null);
    try {
      const { data } = await api.get("/pages");
      setPages(data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load pages.");
    } finally {
      setLoadingPages(false);
    }
  }, []);

  // Fetch heatmap click data for a specific page
  const fetchPoints = useCallback(async () => {
    if (!pageUrl) {
      setPoints([]);
      return;
    }
    setLoadingPoints(true);
    setError(null);
    try {
      const { data } = await api.get("/heatmap", { params: { pageUrl } });
      setPoints(data.data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to load heatmap.");
    } finally {
      setLoadingPoints(false);
    }
  }, [pageUrl]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return {
    points,
    pages,
    loadingPages,
    loadingPoints,
    error,
    retryPages: fetchPages,
    retryPoints: fetchPoints,
  };
}
