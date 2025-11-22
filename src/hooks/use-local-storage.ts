import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValuse: T){
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item?JSON.parse(item) : initialValuse
    } catch (error) {
      console.error(error)
      return initialValuse
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
  
}