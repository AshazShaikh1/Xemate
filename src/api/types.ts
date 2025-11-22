export interface Coordinates {
  lat: number;
  lon: number;
}

/** Single weather condition (one element of the `weather` array) */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/** Current weather data (from /weather) */
export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[]; // array
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number; // Added visibility
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Added
  };
  clouds: { // Added clouds
    all: number;
  };
  rain?: { // Added
    "1h"?: number;
    "3h"?: number;
  };
  snow?: { // Added
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    message?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

/** Forecast response (from /forecast). `list` contains the repeated forecast items. */
export interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt?: string; // sometimes present
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: WeatherCondition[]; // array of weather conditions
    wind: {
      speed: number;
      deg?: number;
    };
    // optional fields that OpenWeather provides:
    visibility?: number;
    pop?: number; // probability of precipitation
  }>;
  city: {
    id?: number;
    name: string;
    country: string;
    sunrise?: number;
    sunset?: number;
    coord?: Coordinates;
  };
}

/** Geocoding response from e.g. OpenWeather / other providers.
 * Adjust fields to match the provider you use (some return `local_names` or `display_name`).
 */
export interface GeoCodingResponse {
  name: string;
  // if your provider returns multiple localized names, this may be an object:
  local_name?: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  // optional human-readable full name
  display_name?: string;
}

// --- AQI TYPES ---

export interface AirPollutionComponents {
  co: number; // Concentration of CO (Carbon monoxide) in μg/m3
  no: number; // Concentration of NO (Nitrogen monoxide) in μg/m3
  no2: number; // Concentration of NO2 (Nitrogen dioxide) in μg/m3
  o3: number; // Concentration of O3 (Ozone) in μg/m3
  so2: number; // Concentration of SO2 (Sulphur dioxide) in μg/m3
  pm2_5: number; // Concentration of PM2.5 (Fine particles matter) in μg/m3
  pm10: number; // Concentration of PM10 (Coarse particulate matter) in μg/m3
  nh3: number; // Concentration of NH3 (Ammonia) in μg/m3
}

export interface AirPollutionItem {
  dt: number; // Date and time, Unix, UTC
  main: {
    aqi: 1 | 2 | 3 | 4 | 5; // Air Quality Index. 1 = Good, 5 = Very Poor
  };
  components: AirPollutionComponents;
}

export interface AirPollutionData {
  coord: number[]; // [lon, lat]
  list: AirPollutionItem[];
}