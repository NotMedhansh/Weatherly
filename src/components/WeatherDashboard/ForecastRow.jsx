import { useState } from 'react'
import { getWeatherEmoji, formatTemp, dayLabel } from '../../utils/weatherHelpers'

export default function ForecastRow({ data, isCelsius }) {
  const [hovered, setHovered] = useState(null)
  const days = data.forecast.forecastday

  return (
    <div style={{
      marginBottom: '18px',
      animation: 'riseIn 0.55s var(--ease) forwards',
      animationDelay: '0.1s', opacity: 0,
    }}>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: '12px' }}>
        7-Day Forecast
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {days.map((day, i) => {
          const hi    = formatTemp(day.day.maxtemp_c, isCelsius)
          const lo    = formatTemp(day.day.mintemp_c, isCelsius)
          const emoji = getWeatherEmoji(day.day.condition.code, true)
          const pop   = day.day.daily_chance_of_rain
          const isToday = i === 0

          return (
            <div key={day.date}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isToday ? 'rgba(79,156,249,0.08)' : hovered === i ? 'var(--surface-hov)' : 'var(--surface)',
                border: `1px solid ${isToday ? 'rgba(79,156,249,0.32)' : hovered === i ? 'var(--border-lit)' : 'var(--border)'}`,
                borderRadius: 'var(--r-md)', padding: '16px 8px',
                textAlign: 'center', backdropFilter: 'blur(14px)',
                transition: 'background .2s, border-color .2s, transform .2s',
                transform: hovered === i && !isToday ? 'translateY(-4px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>
                {dayLabel(day.date, i)}
              </div>
              <div style={{ fontSize: '1.6rem', marginBottom: '10px', lineHeight: 1 }}>{emoji}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>{hi}°</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>{lo}°</div>
              <div style={{ fontSize: '0.63rem', color: 'var(--blue)', marginTop: '8px', opacity: pop > 0 ? 0.85 : 0 }}>
                💧 {pop}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
