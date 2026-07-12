import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getStatus() {
  const response = await api.get("/health");
  return response.data;
}