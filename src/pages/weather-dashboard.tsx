import CurrentWeather from "@/components/weather/current-weather";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FavoriteCities from "@/components/weather/favorite-cities";
import HourlyTemperature from "@/components/weather/hourly-temperature";
import AirQuality from "@/components/weather/air-quality";
import WeatherDetails from "@/components/weather/weather-details";
import WeatherForecast from "@/components/weather/weather-forecast";
import HistoricalChart from "@/components/weather/historical-chart";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useAqiQuery, useForecastQuery, useHistoricalWeatherQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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
  const historicalQuery = useHistoricalWeatherQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
      aqiQuery.refetch()
      historicalQuery.refetch()
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

  if (weatherQuery.error || forecastQuery.error || aqiQuery.error || historicalQuery.error) {
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

  if (!weatherQuery.data || !forecastQuery.data) {
     return <WeatherSkeleton />
  }
  
  const isFetching = weatherQuery.isFetching || forecastQuery.isFetching || aqiQuery.isFetching || historicalQuery.isFetching;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-in animate-delay-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Your Weather Dashboard
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isFetching}
          className="h-9 w-9 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary/30 hover:shadow-md interactive-scale ripple group/refresh"
        >
          <RefreshCw
            className={`h-4 w-4 transition-all duration-300 ${
              isFetching ? "animate-spin" : "group-hover/refresh:rotate-180"
            } group-hover/refresh:scale-110`}
          />
        </Button>
      </div>

      <div className="animate-fade-in">
        <FavoriteCities />
      </div>

      <div className="animate-fade-in animate-delay-200">
        <CurrentWeather data={weatherQuery.data} locationName={locationName} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in animate-delay-300">
        <div className="lg:col-span-7 animate-fade-in animate-delay-400">
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="lg:col-span-5 animate-fade-in animate-delay-500">
          <WeatherDetails data={weatherQuery.data} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in animate-delay-400">
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <WeatherForecast data={forecastQuery.data} />
          {historicalQuery.isLoading ? (
            <Skeleton className="h-[300px] w-full rounded-xl animate-pulse" />
          ) : (
            historicalQuery.data &&
            historicalQuery.data.length > 0 && (
              <div className="animate-fade-in animate-delay-600">
                <HistoricalChart data={historicalQuery.data} />
              </div>
            )
          )}
        </div>
        <div className="lg:col-span-5 animate-fade-in animate-delay-500">
          {aqiQuery.data && (
            <AirQuality data={aqiQuery.data} locationName={aqiLocationName} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard