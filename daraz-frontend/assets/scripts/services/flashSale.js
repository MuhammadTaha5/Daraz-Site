import { apiGet } from "../api/client.js";

export function getFlashSaleProducts() {
  return apiGet("/products/flash-sale");
}