import { apiGet } from "../api/client.js";

export function getCategories() {
  return apiGet("/categories");
}