import type { Coordinates, AirPollutionData } from "@/api/types"
import { weatherAPI } from "@/api/weather"
import { useQuery } from "@tanstack/react-query"
import { useUnit } from "@/context/unit-provider"
import { subDays } from "date-fns"

export interface HistoricalData {
  dt: number; // Unix timestamp
  temp_min: number;
  temp_max: number;
}

// Function to generate deterministic mock data based on coordinates
const generateMockHistoricalData = (coords: Coordinates, unit: "metric" | "imperial"): HistoricalData[] => {
  const { lat, lon } = coords;
  
  // Generate a "base temperature" derived from latitude (warmer near equator, colder near poles)
  // Simple approximation: 30 degrees at equator, dropping as latitude increases.
  // We also use longitude to add some variation so cities at same latitude look different.
  const baseTempMetric = 30 - (Math.abs(lat) * 0.8) + (Math.sin(lon / 10) * 5);

  return Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 7 - i);
    const timestamp = date.getTime() / 1000;
    
    // Add daily variation using sine waves based on time and index
    // This ensures the chart isn't a flat line
    const dailyVariation = Math.sin((timestamp / 86400) + i) * 5;
    
    // Random-ish fluctuation that is stable for the same day/location
    const fluctuation = Math.cos(lat + i) * 2;

    let tempMin = baseTempMetric + dailyVariation + fluctuation - 5;
    let tempMax = baseTempMetric + dailyVariation + fluctuation + 5;

    // Convert to Imperial if necessary
    if (unit === "imperial") {
      tempMin = (tempMin * 9/5) + 32;
      tempMax = (tempMax * 9/5) + 32;
    }

    return {
      dt: timestamp,
      temp_min: Math.round(tempMin),
      temp_max: Math.round(tempMax),
    };
  });
};

export const WEATHER_KEYS = {
  weather: (coords: Coordinates, unit: string) => ["weather", coords, unit] as const,
  forecast: (coords: Coordinates, unit: string) => ["forecast", coords, unit] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
  aqi: (coords: Coordinates) => ["aqi", coords] as const,
  historical: (coords: Coordinates, unit: string) => ["historical", coords, unit] as const,
} as const

export function useWeatherQuery(coordinates: Coordinates | null){
  const { unit } = useUnit()
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates??{lat: 0, lon: 0}, unit),
    queryFn: () => coordinates?weatherAPI.getCurrentWeather(coordinates, unit):null,
    enabled: !!coordinates,
  })
}

export function useForecastQuery(coordinates: Coordinates | null){
  const { unit } = useUnit()
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates??{lat: 0, lon: 0}, unit),
    queryFn: () => coordinates?weatherAPI.getForecast(coordinates, unit):null,
    enabled: !!coordinates,
  })
}

export function useAqiQuery(coordinates: Coordinates | null){
  return useQuery<AirPollutionData | null>({
    queryKey: WEATHER_KEYS.aqi(coordinates??{lat: 0, lon: 0}),
    queryFn: () => coordinates?weatherAPI.getCurrentAirQuality(coordinates):null,
    enabled: !!coordinates,
    staleTime: 5 * 60 * 1000, 
  })
}

export function useHistoricalWeatherQuery(coordinates: Coordinates | null){
  const { unit } = useUnit() 
  return useQuery<HistoricalData[] | null>({
    queryKey: WEATHER_KEYS.historical(coordinates??{lat: 0, lon: 0}, unit),
    queryFn: async () => {
        if (!coordinates) return null;
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500)); 
        // Generate data specific to these coordinates
        return generateMockHistoricalData(coordinates, unit);
    },
    enabled: !!coordinates,
    staleTime: 5 * 60 * 1000, // Cache the mock data for 5 minutes
  })
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null){
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates??{lat: 0, lon: 0}),
    queryFn: () => coordinates?weatherAPI.reverseGeocode(coordinates):null,
    enabled: !!coordinates,
  })
}

export function useLocationSearch(query: string){
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  })
}