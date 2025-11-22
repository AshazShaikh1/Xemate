import { useTheme } from "@/context/theme-provider"
import { Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import CitySearch from "./city-search"
import UnitToggle from "./unit-toggle"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <header className="sticky top-0 z-50 w-full border-b glass backdrop-blur-xl bg-background/80 supports-backdrop-filter:bg-background/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="group relative">
          <img 
            src={theme === "dark" ? "/logo.png" : "/logo2.png"} 
            alt="logo" 
            className="h-14 transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <CitySearch />
          </div>
          <div className="sm:hidden">
            <CitySearch />
          </div>
          <UnitToggle />
          
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")} 
            className="relative flex items-center justify-center cursor-pointer p-2 rounded-lg hover:bg-accent transition-all duration-300 group interactive-scale ripple overflow-hidden"
            aria-label="Toggle theme"
          >
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-slow`} />
            <div className={`relative transition-all duration-500 ${isDark ? "rotate-0" : "rotate-180"} group-hover:scale-110`}>
              {isDark ? (
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg animate-glow-pulse" />
              ) : (
                <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-lg animate-glow-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header