const ENV = {
  development: {
    BASE_URL: "http://localhost:5000/api",
  },
  production: {
    BASE_URL: "https://yourdomain.com/api",
  },
};

const currentEnv = "development";

export const BASE_URL = ENV[currentEnv].BASE_URL;