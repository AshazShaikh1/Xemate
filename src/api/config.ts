export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO: "https://api.openweathermap.org/geo/1.0",
  API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || "",
  DEFAULT_PARAMS: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY || "",
  },
};

if (!API_CONFIG.API_KEY) {
  console.warn(
    "VITE_OPENWEATHER_API_KEY is not set. Please add it to your environment variables."
  );
}