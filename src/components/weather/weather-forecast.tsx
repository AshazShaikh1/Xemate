import type { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnit } from "@/context/unit-provider";

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
  const { unitSymbol } = useUnit();

  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const isToday =
      format(new Date(forecast.dt * 1000), "yyyy-MM-dd") ===
      format(new Date(), "yyyy-MM-dd");
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

  const nextDays = Object.values(dailyForecasts).slice(0, 5);

  const formatTemp = (temp: number) => `${Math.round(temp)}${unitSymbol}`;

  return (
    <Card className="flex-1 hover-lift group">
      <CardHeader className="border-b">
        <CardTitle className="animate-fade-in">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-3">
          {nextDays.map((day, index) => {
            const dateObj = new Date(day.date * 1000);
            return (
              <div
                key={day.date}
                className={cn(
                  "flex items-center justify-between rounded-lg p-3 transition-all duration-300 hover:bg-secondary/50 bg-secondary/30 hover:scale-[1.03] hover:shadow-lg hover:border-primary/20 border border-transparent group/forecast interactive-scale cursor-pointer"
                )}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="shrink-0 w-[120px]">
                  <p className="font-medium transition-colors group-hover/forecast:text-primary">
                    {format(dateObj, "EEE")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(dateObj, "MMM d")}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="relative">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                      alt={day.weather.description}
                      className="h-8 w-8 shrink-0 transition-all duration-300 group-hover/forecast:scale-125 group-hover/forecast:rotate-12 group-hover/forecast:drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover/forecast:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-sm capitalize truncate hidden sm:block transition-colors group-hover/forecast:text-foreground">
                    {day.weather.description}
                  </p>
                </div>

                <div className="flex justify-end gap-3 shrink-0 w-[120px]">
                  <span className="flex items-center text-blue-500 text-sm font-medium bg-blue-500/10 px-2 py-1 rounded-md transition-all hover:bg-blue-500/20 hover:scale-110 hover:shadow-md hover:shadow-blue-500/30 group-hover/forecast:scale-110">
                    <ArrowDown className="mr-1 h-3 w-3 transition-transform duration-300 group-hover/forecast:translate-y-0.5" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500 text-sm font-medium bg-red-500/10 px-2 py-1 rounded-md transition-all hover:bg-red-500/20 hover:scale-110 hover:shadow-md hover:shadow-red-500/30 group-hover/forecast:scale-110">
                    <ArrowUp className="mr-1 h-3 w-3 transition-transform duration-300 group-hover/forecast:-translate-y-0.5" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;

