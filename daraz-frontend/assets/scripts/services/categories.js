import { apiClient } from "../api/client.js";

export function getCategories() {
  return apiClient.get("/categories");
}