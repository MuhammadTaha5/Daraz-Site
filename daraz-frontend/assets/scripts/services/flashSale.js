import { apiClient } from "../api/client.js";

export function getFlashSaleProducts() {
  return apiClient.get("/products/flash-sale");
}