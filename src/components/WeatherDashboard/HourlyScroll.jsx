import { useState } from 'react'
import { getWeatherEmoji, formatTemp, hourLabel } from '../../utils/weatherHelpers'

export default function HourlyScroll({ data, isCelsius }) {
  const [hovered, setHovered] = useState(null)

  const nowH     = new Date().getHours()
  const today    = data.forecast.forecastday[0].hour
  const tomorrow = data.forecast.forecastday[1]?.hour ?? []
  const hours    = [...today.filter(h => new Date(h.time).getHours() >= nowH), ...tomorrow].slice(0, 24)

  return (
    <div style={{
      marginBottom: '18px',
      animation: 'riseIn 0.55s var(--ease) forwards',
      animationDelay: '0.14s', opacity: 0,
    }}>
      <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)', marginBottom: '12px' }}>
        Hourly (next 24h)
      </p>
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
        {hours.map((h, i) => {
          const temp  = formatTemp(h.temp_c, isCelsius)
          const emoji = getWeatherEmoji(h.condition.code, h.is_day)
          const isNow = i === 0
          const pop   = h.chance_of_rain

          return (
            <div key={h.time}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flexShrink: 0, minWidth: '74px',
                background: isNow ? 'rgba(79,156,249,0.09)' : hovered === i ? 'var(--surface-hov)' : 'var(--surface)',
                border: `1px solid ${isNow ? 'rgba(79,156,249,0.35)' : hovered === i ? 'var(--border-lit)' : 'var(--border)'}`,
                borderRadius: 'var(--r-md)', padding: '14px 10px',
                textAlign: 'center', backdropFilter: 'blur(14px)',
                transition: 'background .2s, border-color .2s, transform .2s',
                transform: hovered === i && !isNow ? 'translateY(-3px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              <div style={{
                fontSize: '0.62rem', marginBottom: '7px',
                fontWeight: isNow ? 600 : 400,
                color: isNow ? 'var(--blue)' : 'var(--text-muted)',
              }}>
                {hourLabel(h.time, isNow)}
              </div>
              <div style={{ fontSize: '1.2rem', marginBottom: '7px' }}>{emoji}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem' }}>{temp}°</div>
              {pop > 0 && (
                <div style={{ fontSize: '0.6rem', color: 'var(--blue)', marginTop: '5px', opacity: 0.8 }}>
                  💧{pop}%
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
