import { apiClient } from "../api/client.js";

export function getProducts() {
  return apiClient.get("/products");
}

export function getProductById(id) {
  return apiClient.get(`/products/${id}`);
}
export function loadMoreProductsService(){
  return apiClient.get(`/products/loadProducts`);
}