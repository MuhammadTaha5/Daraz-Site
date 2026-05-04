const BASE_URL = "http://localhost:5000/api";

export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("API Error: " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}