import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton(){
  return (
    <div className="space-y-6">
      {/* Favorite Cities Skeleton */}
      <Skeleton className="h-[100px] w-full rounded-xl" /> 

      {/* Main Content Title */}
      <Skeleton className="h-8 w-1/3 rounded-md" /> 

      <div className="grid gap-6">
        
        {/* Row 1: Current Weather and Hourly Temp */}
        <div className="flex flex-col lg:flex-row gap-6">
          <Skeleton className="h-[300px] w-full lg:w-3/5 rounded-xl" />
          <Skeleton className="h-[300px] w-full lg:w-2/5 rounded-xl" />
        </div>

        {/* Row 2: Forecast and Details */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" /> 
            <Skeleton className="h-[300px] w-full rounded-xl" /> 
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" /> 
        </div>
      </div>
    </div>
  )
}

export default WeatherSkeleton;