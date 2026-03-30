import { useState } from 'react'
import HeroCard      from './HeroCard'
import SunTimeline   from './SunTimeline'
import ForecastRow   from './ForecastRow'
import HourlyScroll  from './HourlyScroll'
import AirQuality    from './AirQuality'

export default function WeatherDashboard({ data }) {
  const [isCelsius, setIsCelsius] = useState(true)

  return (
    <div>
      <HeroCard
        data={data}
        isCelsius={isCelsius}
        onToggleUnit={() => setIsCelsius(prev => !prev)}
      />
      <SunTimeline  data={data} />
      <ForecastRow  data={data} isCelsius={isCelsius} />
      <HourlyScroll data={data} isCelsius={isCelsius} />
      <AirQuality   aq={data.current.air_quality} />
    </div>
  )
}
