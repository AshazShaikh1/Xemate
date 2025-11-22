import { API_CONFIG } from "./config"
import type { Coordinates, ForecastData, GeoCodingResponse, WeatherData, AirPollutionData } from "./types"
import type { Unit } from "@/context/unit-provider" //from "./types"

class WeatherAPI {
  private createUrl(
    endpoint: string,
    params: Record<string, string>
  ): string {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    })
    return `${endpoint}?${searchParams.toString()}`
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      // Improved error message to check the actual response text if available
      let errorDetail = response.statusText;
      try {
        const errorJson = await response.json();
        if (errorJson.message) {
          errorDetail = errorJson.message;
        }
      } catch (e) {
        // ignore JSON parsing errors, use statusText
      }
      throw new Error(`Weather API Error: ${response.status} - ${errorDetail}`)
    }

    const data = await response.json()
    return data as T
  }

  async getCurrentWeather(
    { lat, lon }: Coordinates,
    unit: Unit // Added unit parameter
  ): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: unit, // Use dynamic unit
    })

    return this.fetchData<WeatherData>(url)
  }

  async getForecast(
    { lat, lon }: Coordinates,
    unit: Unit // Added unit parameter
  ): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: unit, // Use dynamic unit
    })

    return this.fetchData<ForecastData>(url)
  }

  async getCurrentAirQuality({ lat, lon }: Coordinates): Promise<AirPollutionData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/air_pollution`, {
      lat: lat.toString(),
      lon: lon.toString(),
    })
    
    return this.fetchData<AirPollutionData>(url)
  }

  async reverseGeocode({ lat, lon }: Coordinates): Promise<GeoCodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    })

    return this.fetchData<GeoCodingResponse[]>(url)
  }

  async searchLocation(query: string): Promise<GeoCodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "1",
    })

    return this.fetchData<GeoCodingResponse[]>(url)
  }
}

export const weatherAPI = new WeatherAPI()