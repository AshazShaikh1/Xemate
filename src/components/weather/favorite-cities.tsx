import { useFavorite } from "@/hooks/use-favorite";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorite();

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <Card className="p-0 hover-lift group">
      <h1 className="text-xl font-bold tracking-tight px-6 pt-6 border-b pb-4 animate-fade-in">
        Favorite Cities
      </h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 p-6 overflow-x-auto">
          {favorites.map((city, index) => (
            <div
              key={city.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FavoriteCityTablet
                {...city}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            </div>
          ))}
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
      className="relative flex min-w-[200px] cursor-pointer items-center gap-3 rounded-lg border bg-secondary/30 p-4 pr-8 shadow-sm transition-all duration-300 hover:bg-secondary/70 hover:scale-110 hover:shadow-xl hover:border-primary/40 group/item interactive-scale"
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
            <div className="relative">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="h-8 w-8 transition-all duration-300 group-hover/item:scale-125 group-hover/item:rotate-12 group-hover/item:drop-shadow-lg z-10 relative"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 animate-glow-pulse" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-medium transition-colors group-hover/item:text-primary truncate">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
          </div>

          <div className="ml-auto text-right z-10 relative">
            <p className="text-xl font-bold transition-all duration-300 group-hover/item:scale-125 group-hover/item:text-primary">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground truncate max-w-[100px] transition-colors group-hover/item:text-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FavoriteCities;

