import { useState, useCallback } from 'react'

export function useWeather() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const fetchWeather = useCallback(async (query) => {
    setLoading(true)
    setError(null)

    try {
      // Calls our Vercel serverless proxy — API key is hidden on the server
      const url = `/api/weather?q=${encodeURIComponent(query)}`
      const response = await fetch(url, { method: 'GET' })
      const json = await response.json()

      if (!response.ok) {
        throw new Error(
          json?.error?.message ||
          (response.status === 404 ? 'City not found — try a different name' :
           response.status === 500 ? 'Server error — check Vercel environment variable' :
           `Request failed (${response.status})`)
        )
      }

      setData(json)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchByCoords = useCallback((lat, lon) => {
    fetchWeather(`${lat},${lon}`)
  }, [fetchWeather])

  return { data, loading, error, fetchWeather, fetchByCoords }
}
