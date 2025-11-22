import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }))

  return (
    <Card className="w-full lg:w-2/5"> 
      <CardHeader className="border-b">
        <CardTitle>Hourly Temperature</CardTitle> 
      </CardHeader>
      <CardContent className="h-[250px] w-full pt-6"> 
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="temp"
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if(active && payload && payload.length){
                    return (
                      <div className="rounded-lg border bg-popover text-popover-foreground p-3 shadow-lg"> 
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold">{payload[0].payload.time}</span>
                            <div className="text-xs">
                              <span className="font-medium" style={{color: "var(--color-chart-2)"}}>Temp:</span> <span className="font-bold">{payload[0].value}°</span>
                            </div>
                            <div className="text-xs">
                              <span className="font-medium" style={{color: "var(--color-chart-4)"}}>Feels Like:</span> <span className="font-bold">{payload[1].value}°</span>
                            </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="var(--color-chart-4)" 
                strokeWidth={2}
                dot={false}
                strokeDasharray="3 3" 
              />
            </LineChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default HourlyTemperature