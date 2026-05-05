import {BASE_URL} from "../../config/index.js"


// Default headers
const defaultHeaders = {
  "Content-Type": "application/json",
};

// Generic request handler
async function request(endpoint, options = {}) {
  const {
    method = "GET",
    headers = {},
    body = null,
    token = null,
  } = options;

  try {
    const config = {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };

    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw {
        status: response.status,
        message: errorData?.message || "Something went wrong",
      };
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error; 
  }
}

export const apiClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PUT", body }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PATCH", body }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" }),
};