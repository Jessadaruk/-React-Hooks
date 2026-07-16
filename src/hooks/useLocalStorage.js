import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue, validator = () => true) {
  const [storedValue, setStoredValue] = useState(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedValue = window.localStorage.getItem(key)

      if (savedValue !== null) {
        const parsedValue = JSON.parse(savedValue)
        setStoredValue(validator(parsedValue) ? parsedValue : initialValue)
      }
    } catch {
      setStoredValue(initialValue)
    } finally {
      setIsHydrated(true)
    }
  }, [initialValue, key, validator])

  useEffect(() => {
    if (!isHydrated) return

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // The app remains usable when storage is unavailable or full.
    }
  }, [isHydrated, key, storedValue])

  const updateStoredValue = useCallback((nextValue) => {
    setStoredValue(nextValue)
  }, [])

  return [storedValue, updateStoredValue, isHydrated]
}
