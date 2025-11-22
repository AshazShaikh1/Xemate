import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnit } from "@/context/unit-provider"; // New import

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const { unitSymbol } = useUnit(); // Get unitSymbol

  const dailyForcasts = data.list.reduce((acc, forecast) => {
    // Exclude the current day's first entry from the forecast summary
    const isToday = format(new Date(forecast.dt * 1000), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
    if (isToday) return acc;

    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  // Take the next 5 days
  const nextDays = Object.values(dailyForcasts).slice(0, 5);
  
  const formatTemp = (temp: number) => `${Math.round(temp)}${unitSymbol}` // Use dynamic unitSymbol

  return (
    <Card className="flex-1">
      <CardHeader className="border-b">
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-3">
          {nextDays.map((day) => {
            const dateObj = new Date(day.date * 1000);
            return (
              <div
                key={day.date}
                className={cn(
                    "flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-secondary/50 bg-secondary/30" // Applied bg-secondary/30 here
                )}
              >
                {/* Day and Date */}
                <div className="shrink-0 w-[120px]">
                  <p className="font-medium">{format(dateObj, "EEE")}</p>
                  <p className="text-sm text-muted-foreground">{format(dateObj, "MMM d")}</p>
                </div>

                {/* Weather Icon and Description */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                    alt={day.weather.description}
                    className="h-8 w-8 shrink-0"
                  />
                  <p className="text-sm capitalize truncate hidden sm:block">
                    {day.weather.description}
                  </p>
                </div>

                {/* Min/Max Temperature */}
                <div className="flex justify-end gap-3 shrink-0 w-[120px]">
                  <span className="flex items-center text-blue-500 text-sm font-medium">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    {formatTemp (day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500 text-sm font-medium">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    {formatTemp (day.temp_max)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;