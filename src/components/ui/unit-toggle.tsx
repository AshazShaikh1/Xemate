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
      className="h-9 w-9 text-xs font-semibold"
      onClick={handleToggle}
      aria-label="Toggle temperature unit between Celsius and Fahrenheit"
    >
      {unit === "metric" ? "°C" : "°F"}
    </Button>
  );
};

export default UnitToggle;