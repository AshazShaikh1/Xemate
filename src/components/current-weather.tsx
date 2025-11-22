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
    <Card className="overflow-hidden p-0 w-full hover-lift group relative bg-gradient-to-br from-card via-card to-card/50 border-2 transition-all duration-300 hover:border-primary/20 animate-breathe">
      
      <CardHeader className="border-b relative z-10 bg-card/50 backdrop-blur-sm">
          <CardTitle className="text-xl font-extrabold animate-fade-in">Current Conditions</CardTitle>
          <CardDescription className="animate-fade-in animate-delay-100">
            {locationName?.name}
            {locationName?.state && (
              <span className="text-muted-foreground">, {locationName.state}</span>
            )}
            , {locationName?.country}
          </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2 p-6 relative z-10">
        <div className="space-y-4">
          
          {/* MAIN TEMPERATURE - FOCAL POINT */}
          <div className="flex items-center gap-4 animate-scale-in">
            <p className="text-7xl sm:text-8xl font-light tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-glow-pulse">
              {formatTemp(temp)}
            </p>
            <div className="flex flex-col space-y-1 animate-fade-in animate-delay-200">
              <p className="text-lg font-semibold capitalize">
                {currentWeather.description}
              </p>
              
              {/* Feels Like */}
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 transition-colors group-hover:text-foreground/80">
                <Thermometer className="h-4 w-4 transition-transform group-hover:scale-110" /> 
                Feels like {formatTemp(feels_like)}
              </p>
            </div>
          </div>

          {/* MIN/MAX TEMP */}
          <div className="flex gap-4 pt-2 animate-fade-in animate-delay-300">
            <div className="flex items-center gap-1 text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg transition-all hover:bg-blue-500/20 hover:scale-110 hover:shadow-md hover:shadow-blue-500/30 group/temp interactive-scale">
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover/temp:translate-y-1" />
              <p className="text-sm font-medium">Min: {formatTemp(temp_min)}</p>
            </div>
            <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg transition-all hover:bg-red-500/20 hover:scale-110 hover:shadow-md hover:shadow-red-500/30 group/temp interactive-scale">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover/temp:-translate-y-1" />
              <p className="text-sm font-medium">Max: {formatTemp(temp_max)}</p>
            </div>
          </div>
          
        </div>

        {/* WEATHER ICON AND DETAILS */}
        <div className="flex flex-col items-center justify-center border-l dark:border-l-border/50 pl-4 md:pl-6 animate-fade-in animate-delay-400">
          <div className="relative">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className="h-28 w-28 sm:h-32 sm:w-32 object-contain animate-float transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glow-pulse" />
            {/* Rotating glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-rotate-slow" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 w-full">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all hover:scale-110 hover:shadow-md group/detail interactive-scale">
              <Droplets className="h-4 w-4 text-blue-500 transition-all duration-300 hover:scale-125 group-hover/detail:animate-wiggle" />
              <div>
                <p className="text-xs sm:text-sm font-medium transition-colors group-hover/detail:text-foreground">Humidity</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-semibold transition-all group-hover/detail:scale-110">{humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all hover:scale-110 hover:shadow-md group/detail interactive-scale">
              <Wind className="h-4 w-4 text-cyan-500 transition-all duration-300 hover:scale-125 group-hover/detail:animate-rotate-slow" />
              <div>
                <p className="text-xs sm:text-sm font-medium transition-colors group-hover/detail:text-foreground">Wind Speed</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-semibold transition-all group-hover/detail:scale-110">{speed} {windUnit}</p> 
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather