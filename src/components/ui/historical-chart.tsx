import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { useUnit } from "@/context/unit-provider";
import type { HistoricalData } from "@/hooks/use-weather";

interface HistoricalChartProps {
  data: HistoricalData[];
}

const HistoricalChart = ({ data }: HistoricalChartProps) => {
  const { unitSymbol } = useUnit();

  const chartData = data.map((item) => ({
    date: format(new Date(item.dt * 1000), "MMM d"),
    min: Math.round(item.temp_min),
    max: Math.round(item.temp_max),
  }));

  const formatValue = (value: number) => `${value}${unitSymbol}`;

  return (
    <Card className="flex-1">
      <CardHeader className="border-b">
        <CardTitle>7-Day Historical Temperatures</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] w-full pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-popover text-popover-foreground p-3 shadow-lg flex flex-col gap-1">
                      <span className="text-sm font-semibold">{payload[0].payload.date}</span>
                      {payload.map((p) => (
                        <div key={p.dataKey} className="text-xs">
                          <span style={{ color: p.color }}>{p.name}: </span>
                          <span className="font-bold">{formatValue(p.value as number)}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="max"
              name="Max Temp"
              stroke="var(--color-chart-4)" // Reddish color
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="min"
              name="Min Temp"
              stroke="var(--color-chart-2)" // Bluish color
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;