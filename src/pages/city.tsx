import CurrentWeather from "@/components/current-weather";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FavoriteButton from "@/components/ui/favorit-button";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import AirQuality from "@/components/ui/air-quality";
import WeatherDetails from "@/components/ui/weather-details";
import WeatherForecast from "@/components/ui/weather-forecast";
import { useAqiQuery, useForecastQuery, useHistoricalWeatherQuery, useWeatherQuery } from "@/hooks/use-weather"; 
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import HistoricalChart from "@/components/ui/historical-chart";
import { Skeleton } from "@/components/ui/skeleton";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const cityName = params.cityName || "City";

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const aqiQuery = useAqiQuery(coordinates);
  const historicalQuery = useHistoricalWeatherQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error || aqiQuery.error || historicalQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Failed to load weather data. Please try again
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }
  
  const aqiLocationName = `${cityName}, ${weatherQuery.data.sys.country}`;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in"> 
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex items-center gap-2 animate-fade-in animate-delay-100">
            <FavoriteButton data={{...weatherQuery.data, name: params.cityName }} />
        </div>
      </div>

      {/* Hero Section - Current Weather Large */}
      <div className="animate-fade-in animate-delay-200">
        <CurrentWeather data={weatherQuery.data} />
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in animate-delay-300">
        
        {/* Left Column - Hourly Chart (spans 7 columns) */}
        <div className="lg:col-span-7 animate-fade-in animate-delay-400">
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        {/* Right Column - Weather Details (spans 5 columns) */}
        <div className="lg:col-span-5 animate-fade-in animate-delay-500">
          <WeatherDetails data={weatherQuery.data} />
        </div>

      </div>

      {/* Bottom Section - Forecast and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in animate-delay-400">
        
        {/* Forecast Section (spans 7 columns) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <WeatherForecast data={forecastQuery.data} />
          
          {/* Historical Chart */}
          {historicalQuery.isLoading ? (
            <Skeleton className="h-[300px] w-full rounded-xl animate-pulse" />
          ) : (
            historicalQuery.data && historicalQuery.data.length > 0 && (
              <div className="animate-fade-in animate-delay-600">
                <HistoricalChart data={historicalQuery.data} />
              </div>
            )
          )}
        </div>

        {/* Right Column - Air Quality (spans 5 columns) */}
        <div className="lg:col-span-5 animate-fade-in animate-delay-500">
          {aqiQuery.data && (
            <AirQuality data={aqiQuery.data} locationName={aqiLocationName} />
          )}
        </div>

      </div>

    </div>
  );
};

export default CityPage;