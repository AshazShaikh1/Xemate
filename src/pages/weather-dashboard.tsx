import CurrentWeather from "@/components/current-weather"
import WeatherSkeleton from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import FavoriteCities from "@/components/ui/faviorite-cities"
import HourlyTemperature from "@/components/ui/hourly-temperature"
import AirQuality from "@/components/ui/air-quality"
import WeatherDetails from "@/components/ui/weather-details"
import WeatherForecast from "@/components/ui/weather-forecast"
import { useGeolocation } from "@/hooks/use-geoloaction"
import { useAqiQuery, useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"

const WeatherDashboard = () => {
  const { coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation()

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)
  const aqiQuery = useAqiQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
      aqiQuery.refetch()
    }
  }

  if (locationLoading) {
    return <WeatherSkeleton />
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0]
  const aqiLocationName = locationName ? `${locationName.name}${locationName.state ? `, ${locationName.state}` : ''}, ${locationName.country}` : 'Your Current Location';

  if (weatherQuery.error || forecastQuery.error || aqiQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // Use a logical check for data presence, but allow fetching state to return the skeleton
  if (!weatherQuery.data || !forecastQuery.data) {
     return <WeatherSkeleton />
  }
  
  const isFetching = weatherQuery.isFetching || forecastQuery.isFetching || aqiQuery.isFetching;

  return (
    <div className="space-y-6"> 
      <FavoriteCities /> 
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Your Weather Dashboard</h1>
        <Button variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={isFetching}
          className="h-9 w-9" 
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        
        {/* Row 1: Current Weather (3/5) and Hourly Temp (2/5) */}
        <div className="flex flex-col lg:flex-row gap-6"> 
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        {/* Row 2: Forecast and Details */}
        <div className="grid gap-6 lg:grid-cols-3 items-start"> 
          <div className="lg:col-span-2 space-y-6">
            <WeatherForecast data={forecastQuery.data} />
            {aqiQuery.data && <AirQuality data={aqiQuery.data} locationName={aqiLocationName} />}
          </div>
          <WeatherDetails data={weatherQuery.data} />
        </div>

      </div>
    </div>
  )
}

export default WeatherDashboard