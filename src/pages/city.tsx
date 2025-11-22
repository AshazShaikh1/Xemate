import CurrentWeather from "@/components/current-weather";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FavoriteButton from "@/components/ui/favorit-button";
import HourlyTemperature from "@/components/ui/hourly-temperature";
import AirQuality from "@/components/ui/air-quality";
import WeatherDetails from "@/components/ui/weather-details";
import WeatherForecast from "@/components/ui/weather-forecast";
import { useAqiQuery, useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const cityName = params.cityName || "City";

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const aqiQuery = useAqiQuery(coordinates); // New AQI query

  if (weatherQuery.error || forecastQuery.error || aqiQuery.error) {
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

  // Only proceed if core data is present, let the fetch state handle the skeleton
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }
  
  const aqiLocationName = `${cityName}, ${weatherQuery.data.sys.country}`;

  return (
    <div className="space-y-6"> 
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">{cityName}, {weatherQuery.data.sys.country}</h1>
        <div className="flex items-center gap-2">
            <FavoriteButton data={{...weatherQuery.data, name: params.cityName }} />
        </div>
      </div>

      <div className="grid gap-6">
        
        {/* Row 1: Current Weather (3/5) and Hourly Temp (2/5) */}
        <div className="flex flex-col lg:flex-row gap-6"> 
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        {/* Row 2: Forecast and Details */}
        <div className="grid gap-6 lg:grid-cols-3 items-start"> 
          <div className="lg:col-span-2 space-y-6">
            <WeatherForecast data={forecastQuery.data} />
            {/* CORRECTED: use aqiQuery.data here */}
            {aqiQuery.data && <AirQuality data={aqiQuery.data} locationName={aqiLocationName} />}
          </div>
          <WeatherDetails data={weatherQuery.data} />
        </div>

      </div>
    </div>
  );
};

export default CityPage;