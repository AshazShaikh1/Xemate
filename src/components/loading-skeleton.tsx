import { Skeleton } from "./ui/skeleton";

function WeatherSkeleton(){
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header Skeleton */}
      <Skeleton className="h-10 w-1/3 rounded-md animate-pulse" /> 

      {/* Favorite Cities Skeleton */}
      <Skeleton className="h-[100px] w-full rounded-xl animate-pulse animate-delay-100" /> 

      {/* Hero Section - Current Weather */}
      <Skeleton className="h-[300px] w-full rounded-xl animate-pulse animate-delay-200" />

      {/* Grid Layout - Hourly and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <Skeleton className="h-[250px] lg:col-span-7 rounded-xl animate-pulse animate-delay-300" />
        <Skeleton className="h-[400px] lg:col-span-5 rounded-xl animate-pulse animate-delay-400" />
      </div>

      {/* Bottom Section - Forecast and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <Skeleton className="h-[400px] w-full rounded-xl animate-pulse animate-delay-500" /> 
          <Skeleton className="h-[300px] w-full rounded-xl animate-pulse animate-delay-600" /> 
        </div>
        <Skeleton className="h-[400px] lg:col-span-5 rounded-xl animate-pulse animate-delay-500" /> 
      </div>
    </div>
  )
}

export default WeatherSkeleton;