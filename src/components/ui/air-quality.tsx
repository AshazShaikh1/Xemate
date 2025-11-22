import type { AirPollutionData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface AirQualityProps {
  data: AirPollutionData;
  locationName: string; // Added location name prop
}

const AirQuality = ({ data, locationName }: AirQualityProps) => {
  const currentAqi = data.list[0];
  // Check if AQI data is available and list is not empty
  if (!currentAqi || !data.list.length) return null;

  const aqiIndex = currentAqi.main.aqi;
  const components = currentAqi.components;

  // Detailed descriptions for each AQI level (OpenWeatherMap's own scale 1-5)
  const aqiMap: Record<1 | 2 | 3 | 4 | 5, { name: string; description: string; color: string }> = {
    1: { name: "Good", description: "Air quality is considered satisfactory, and air pollution poses little or no risk.", color: "text-green-500 bg-green-500/10 border-green-500/30" },
    2: { name: "Fair", description: "Air quality is acceptable. However, there may be a moderate health concern for a very small number of people who are unusually sensitive.", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30" },
    3: { name: "Moderate", description: "Air quality is moderate. Sensitive groups may experience health effects. The general public is not likely to be affected.", color: "text-orange-500 bg-orange-500/10 border-orange-500/30" },
    4: { name: "Poor", description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.", color: "text-red-500 bg-red-500/10 border-red-500/30" },
    5: { name: "Very Poor", description: "Health warnings of emergency conditions. The entire population is more likely to be affected.", color: "text-purple-500 bg-purple-500/10 border-purple-500/30" },
  };

  const aqiInfo = aqiMap[aqiIndex] || {
    name: "Unknown",
    description: "Air Quality information is currently unavailable.",
    color: "text-gray-500 bg-gray-500/10 border-gray-500/30",
  };
  
  // Define pollutants with full names and units, filtering out zero values
  const pollutants = [
    { name: "PM2.5", value: components.pm2_5, unit: "μg/m³", description: "Fine Particulate Matter" },
    { name: "PM10", value: components.pm10, unit: "μg/m³", description: "Coarse Particulate Matter" },
    { name: "CO", value: components.co, unit: "μg/m³", description: "Carbon Monoxide" },
    { name: "O3", value: components.o3, unit: "μg/m³", description: "Ozone" },
    { name: "NO2", value: components.no2, unit: "μg/m³", description: "Nitrogen Dioxide" },
    { name: "SO2", value: components.so2, unit: "μg/m³", description: "Sulphur Dioxide" },
    { name: "NH3", value: components.nh3, unit: "μg/m³", description: "Ammonia" },
    { name: "NO", value: components.no, unit: "μg/m³", description: "Nitrogen Monoxide" },
  ].filter(p => p.value > 0.01).sort((a, b) => b.value - a.value); // Filter out near-zero values and sort

  // Limit to top 4 most prominent pollutants for display simplicity
  const prominentPollutants = pollutants.slice(0, 4);

  return (
    <Card className="flex-1">
      <CardHeader className="border-b">
        <CardTitle>Air Quality Index (AQI) for {locationName}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          {/* AQI Indicator and Description */}
          <div className="flex flex-col gap-4 p-4 rounded-lg border border-dashed">
            <div className="flex items-center gap-4">
              {/* Colored circle with the AQI number */}
              <div className={cn("size-12 rounded-full border flex items-center justify-center font-bold text-xl text-white", aqiInfo.color.replace('text-', 'bg-').replace('/10', '').replace('border-', ''))}>
                {aqiIndex}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">OpenWeather AQI Scale (1-5)</p>
                {/* Colored AQI name */}
                <h2 className={cn("text-2xl font-bold", aqiInfo.color)}>{aqiInfo.name}</h2>
              </div>
            </div>
            {/* Detailed description */}
            <p className="text-sm text-muted-foreground">{aqiInfo.description}</p>
          </div>

          {/* Pollutant Details */}
          <h3 className="text-lg font-semibold border-b pb-2">Key Pollutant Concentrations</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {prominentPollutants.length > 0 ? (
                prominentPollutants.map((pollutant) => (
                    <div key={pollutant.name} className="flex flex-col items-start rounded-lg border p-3 bg-secondary/30">
                        <p className="text-xs font-medium text-muted-foreground truncate">{pollutant.description}</p>
                        <p className="text-xl font-semibold">{pollutant.value.toFixed(2)}</p>
                        <p className="text-xs font-semibold text-muted-foreground">{pollutant.name} ({pollutant.unit})</p>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground col-span-full">All major pollutant levels are currently at zero or trace amounts.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQuality;