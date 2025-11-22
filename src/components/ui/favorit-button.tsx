import type { WeatherData } from "@/api/types"
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  // call the hook (was missing parentheses)
  const { addFavorite, isFavorite, removeFavorite, favorites } = useFavorite()

  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      // find the favorite id matching this lat/lon and remove it
      const fav = (favorites ?? []).find(
        (f) => f.lat === data.coord.lat && f.lon === data.coord.lon
      )
      if (fav) {
        removeFavorite.mutate(fav.id)
        toast.error(`Removed ${data.name} from Favorites`)
      } else {
        // fallback: no matching favorite found
        toast.error(`Could not find ${data.name} in favorites`)
      }
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      })
      toast.success(`Added ${data.name} to Favorites`)
    }
  }

  return (
    <Button
      onClick={handleToggleFavorite}
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size={"icon"}
      className={`transition-all duration-300 hover:scale-110 ripple interactive-glow ${
        isCurrentlyFavorite 
          ? "bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 animate-pulse-glow" 
          : "hover:bg-yellow-500/10 hover:border-yellow-500/30"
      }`}
    >
      <Star className={`h-4 w-4 transition-all duration-300 ${isCurrentlyFavorite ? "fill-current animate-scale-in" : ""} cursor-pointer hover:rotate-12 hover:scale-125 group-hover/btn:animate-wiggle`} />
    </Button>
  )
}

export default FavoriteButton
