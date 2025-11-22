import { useUnit } from "@/context/unit-provider";
import { Button } from "./button";

const UnitToggle = () => {
  const { unit, setUnit } = useUnit();

  const handleToggle = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 text-xs font-semibold transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:border-primary/30 hover:shadow-md interactive-scale ripple group/unit"
      onClick={handleToggle}
      aria-label="Toggle temperature unit between Celsius and Fahrenheit"
    >
      <span className="transition-all duration-300 group-hover/unit:scale-125 group-hover/unit:text-primary">
        {unit === "metric" ? "°C" : "°F"}
      </span>
    </Button>
  );
};

export default UnitToggle;