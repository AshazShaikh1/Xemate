import type { GeoCodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind, Thermometer } from "lucide-react";
import { useUnit } from "@/context/unit-provider"; // New import

interface CurrentWeatherProps {
  data: WeatherData,
  locationName?: GeoCodingResponse,
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const { unitSymbol, windUnit } = useUnit(); // Get unit details

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}${unitSymbol}` // Use dynamic unitSymbol

  return (
    <Card className="overflow-hidden p-0 w-full lg:w-3/5">
      <CardHeader className="border-b">
          <CardTitle className="text-xl font-extrabold">Current Conditions</CardTitle>
          <CardDescription>
            {locationName?.name}
            {locationName?.state && (
              <span className="text-muted-foreground">, {locationName.state}</span>
            )}
            , {locationName?.country}
          </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2 p-6">
        <div className="space-y-4">
          
          {/* MAIN TEMPERATURE - FOCAL POINT */}
          <div className="flex items-center gap-4">
            <p className="text-8xl font-light tracking-tighter">
              {formatTemp(temp)}
            </p>
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-semibold capitalize">
                {currentWeather.description}
              </p>
              
              {/* Feels Like */}
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Thermometer className="h-4 w-4" /> 
                Feels like {formatTemp(feels_like)}
              </p>
            </div>
          </div>

          {/* MIN/MAX TEMP */}
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-1 text-blue-500">
              <ArrowDown className="h-4 w-4" />
              <p className="text-sm font-medium">Min: {formatTemp(temp_min)}</p>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <ArrowUp className="h-4 w-4" />
              <p className="text-sm font-medium">Max: {formatTemp(temp_max)}</p>
            </div>
          </div>
          
        </div>

        {/* WEATHER ICON AND DETAILS */}
        <div className="flex flex-col items-center justify-center border-l pl-4">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.description}
            className="h-32 w-32 object-contain"
          />
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-sm text-muted-foreground">{humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyan-500" />
              <div>
                <p className="text-sm font-medium">Wind Speed</p>
                {/* Use dynamic windUnit */}
                <p className="text-sm text-muted-foreground">{speed} {windUnit}</p> 
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather