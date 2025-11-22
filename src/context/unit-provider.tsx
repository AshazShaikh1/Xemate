import { createContext, useContext, useState } from "react"

export type Unit = "metric" | "imperial"

type UnitProviderProps = {
  children: React.ReactNode
  defaultUnit?: Unit
  storageKey?: string
}

type UnitProviderState = {
  unit: Unit
  setUnit: (unit: Unit) => void
  unitSymbol: "°C" | "°F"
  windUnit: "m/s" | "mph"
}

const initialState: UnitProviderState = {
  unit: "metric",
  setUnit: () => null,
  unitSymbol: "°C",
  windUnit: "m/s",
}

const UnitProviderContext = createContext<UnitProviderState>(initialState)

export function UnitProvider({
  children,
  defaultUnit = "metric",
  storageKey = "weather-unit",
  ...props
}: UnitProviderProps) {
  const [unit, setUnit] = useState<Unit>(
    () => (localStorage.getItem(storageKey) as Unit) || defaultUnit
  )
  
  const unitSymbol = unit === "metric" ? "°C" : "°F"
  const windUnit = unit === "metric" ? "m/s" : "mph"

  const value = {
    unit,
    setUnit: (newUnit: Unit) => {
      localStorage.setItem(storageKey, newUnit)
      setUnit(newUnit)
    },
    unitSymbol,
    windUnit
  }

  return (
    <UnitProviderContext.Provider {...props} value={value}>
      {children}
    </UnitProviderContext.Provider>
  )
}

export const useUnit = () => {
  const context = useContext(UnitProviderContext)

  if (context === undefined)
    throw new Error("useUnit must be used within a UnitProvider")

  return context
}