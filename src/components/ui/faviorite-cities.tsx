import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "./card"; // Import Card

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

// Renamed to use PascalCase for component name
const FavoriteCities = () => { 
  const { favorites, removeFavorite } = useFavorite();

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <Card className="p-0">
        <h1 className="text-xl font-bold tracking-tight px-6 pt-6 border-b pb-4">Favorite Cities</h1>
        {/* Use the shadcn ScrollArea component imported as ScrollArea */}
        <ScrollArea className="w-full pb-4">
            <div className="flex gap-4 p-6 overflow-x-auto">
            {favorites.map((city) => {
                return (
                <FavoriteCityTablet
                    key={city.id}
                    {...city}
                    onRemove={() => removeFavorite.mutate(city.id)}
                />
                );
            })}
            </div>
        </ScrollArea>
    </Card>
  );
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex min-w-[200px] cursor-pointer items-center gap-3 rounded-lg border bg-secondary/30 p-4 pr-8 shadow-sm transition-all hover:bg-secondary/70"
    >
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-between">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="h-8 w-8"
            />
          </div>

          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
          </div>

          <div className="ml-auto text-right">
            <p className="text-xl font-bold">{Math.round(weather.main.temp)}°</p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FavoriteCities;