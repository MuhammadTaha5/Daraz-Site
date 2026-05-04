import { apiGet } from "../api/client.js";

export function getProducts() {
  return apiGet("/products");
}

export function getProductById(id) {
  return apiGet(`/products/${id}`);
}