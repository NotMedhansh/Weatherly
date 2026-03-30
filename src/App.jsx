import { useState, useEffect }   from 'react'
import AtmosphericBackground      from './components/Background/AtmosphericBackground'
import Header                     from './components/Header/Header'
import SearchBar                  from './components/SearchBar/SearchBar'
import WeatherDashboard           from './components/WeatherDashboard/WeatherDashboard'
import EmptyState                 from './components/EmptyState/EmptyState'
import Loader                     from './components/Loader/Loader'
import Toast                      from './components/Toast/Toast'
import { useWeather }             from './hooks/useWeather'
import { getWeatherTheme }        from './utils/weatherHelpers'

export default function App() {
  const [toast, setToast] = useState(null)
  const { data, loading, error, fetchWeather, fetchByCoords } = useWeather()

  // Surface API errors as toasts
  useEffect(() => {
    if (error) setToast({ message: error, type: 'error' })
  }, [error])

  const handleSearch = (query) => {
    fetchWeather(query)
  }

  const handleGeo = (lat, lon) => {
    fetchByCoords(lat, lon)
  }

  const theme = data ? getWeatherTheme(data.current.condition.code) : 'clear'

  return (
    <>
      <AtmosphericBackground theme={theme} />

      <div style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        maxWidth: '980px',
        margin: '0 auto',
        padding: 'clamp(24px, 4vw, 44px) clamp(16px, 3vw, 28px) 80px',
      }}>
        <Header />
        <SearchBar onSearch={handleSearch} onGeo={handleGeo} loading={loading} />

        {loading           && <Loader />}
        {!loading && !data && <EmptyState />}
        {!loading && data  && <WeatherDashboard data={data} />}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  )
}
