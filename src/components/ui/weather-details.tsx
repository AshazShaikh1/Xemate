import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset, Droplets, Cloud, SunDim, Wind } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { useUnit } from "@/context/unit-provider"; // New import

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { windUnit } = useUnit(); // Get windUnit
  const { wind, main, sys, visibility = 0, clouds = { all: 0 } } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-amber-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-indigo-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-cyan-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
    {
        title: "Humidity",
        value: `${main.humidity}%`,
        icon: Droplets,
        color: "text-blue-500",
    },
    {
        title: "Cloudiness",
        value: `${clouds.all}%`,
        icon: Cloud,
        color: "text-gray-500",
    },
    {
        title: "Wind Speed", // New wind speed detail (optional, since already in CurrentWeather)
        value: `${wind.speed} ${windUnit}`, // Use dynamic windUnit
        icon: Wind,
        color: "text-cyan-500",
    },
    {
        title: "Visibility",
        value: `${(visibility / 1000).toFixed(1)} km`, // Keeping in km as the base unit is meters
        icon: SunDim,
        color: "text-pink-500",
    }
  ].filter(d => d.value !== undefined);

  return (
    <Card className="flex-1 hover-lift group">
      <CardHeader className="border-b">
        <CardTitle className="animate-fade-in">Additional Details</CardTitle> 
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((detail, index) => {
            return (
              <div
              key={detail.title}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-primary/20 border border-transparent animate-fade-in group/item interactive-scale cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <detail.icon className={`h-5 w-5 shrink-0 ${detail.color} transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12 group-hover/item:drop-shadow-lg`} />
                  <div className={`absolute inset-0 ${detail.color.replace('text-', 'bg-')} rounded-full blur-md opacity-0 group-hover/item:opacity-30 transition-opacity duration-300`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none text-muted-foreground group-hover/item:text-foreground transition-colors">{detail.title}</p>
                  <p className="text-lg font-semibold text-foreground transition-all group-hover/item:scale-110 group-hover/item:translate-x-1">{detail.value}</p> 
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;