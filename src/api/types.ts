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
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
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
