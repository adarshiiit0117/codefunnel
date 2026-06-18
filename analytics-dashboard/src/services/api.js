import axios from "axios";

// Base Axios instance — all requests go through here.
// Change VITE_API_URL in .env to point at a different backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
