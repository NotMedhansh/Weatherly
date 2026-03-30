import { useState } from 'react'
import { getWeatherEmoji, formatTemp, uvLabel, formatLocalTime } from '../../utils/weatherHelpers'

export default function HeroCard({ data, isCelsius, onToggleUnit }) {
  const [hovered, setHovered] = useState(null)
  const { current: cur, location: loc } = data

  const isDay  = cur.is_day === 1
  const code   = cur.condition.code
  const emoji  = getWeatherEmoji(code, isDay)
  const temp   = formatTemp(cur.temp_c, isCelsius)
  const feels  = formatTemp(cur.feelslike_c, isCelsius)
  const unit   = isCelsius ? '°C' : '°F'
  const uv     = uvLabel(cur.uv)
  const isSunny = code === 1000

  const stats = [
    { label: 'Humidity',    value: `${cur.humidity}%`,                          note: 'relative'                 },
    { label: 'Wind',        value: `${cur.wind_kph.toFixed(0)}`,                note: `km/h · ${cur.wind_dir}`   },
    { label: 'Visibility',  value: `${cur.vis_km.toFixed(1)}`,                  note: 'km'                       },
    { label: 'Pressure',    value: `${Math.round(cur.pressure_mb)}`,            note: 'hPa'                      },
    { label: 'UV Index',    value: `${cur.uv}`,                                 note: uv.text, noteColor: uv.color },
    { label: 'Dew Point',   value: `${formatTemp(cur.dewpoint_c, isCelsius)}°`, note: 'dew point'                },
    { label: 'Cloud Cover', value: `${cur.cloud}%`,                             note: 'cloud cover'              },
    { label: 'Gust',        value: `${cur.gust_kph.toFixed(0)}`,                note: 'km/h gust'                },
  ]

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-xl)', padding: '40px 44px 36px',
      backdropFilter: 'blur(28px)', marginBottom: '18px',
      position: 'relative', overflow: 'hidden',
      animation: 'riseIn 0.55s var(--ease) forwards', opacity: 0,
    }}>
      {/* Inner glow */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: isSunny ? 'rgba(245,200,66,0.1)' : 'rgba(79,156,249,0.1)',
        filter: 'blur(80px)', pointerEvents: 'none', transition: 'background 2s',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', gap: '16px' }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '8px', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {loc.name}
          </h1>
          <p style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--text-muted)' }}>
            {loc.region ? `${loc.region}, ` : ''}{loc.country} · {formatLocalTime(loc.localtime)}
          </p>
        </div>
        <div style={{
          fontSize: 'clamp(3.5rem, 8vw, 5.8rem)', lineHeight: 1, flexShrink: 0,
          animation: 'floatIcon 6s ease-in-out infinite',
          filter: `drop-shadow(0 0 28px ${isSunny ? 'rgba(245,200,66,0.35)' : 'rgba(79,156,249,0.2)'})`,
        }}>
          {emoji}
        </div>
      </div>

      {/* Temperature */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '6px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          lineHeight: 1, letterSpacing: '-0.05em', fontWeight: 300,
          background: isSunny
            ? 'linear-gradient(135deg, var(--text) 30%, var(--amber) 100%)'
            : 'linear-gradient(135deg, var(--text) 30%, var(--blue) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          transition: 'background 0.5s',
        }}>
          {temp}
        </span>
        <button onClick={onToggleUnit} title={`Switch to ${isCelsius ? '°F' : '°C'}`} style={{
          fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300,
          color: 'var(--text-muted)', background: 'none', border: 'none',
          cursor: 'pointer', paddingBottom: '18px',
          transition: 'color .2s, transform .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          {unit}
        </button>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
        Feels like <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{feels}{unit}</strong>
      </p>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '1.45rem', color: 'var(--text-muted)',
        marginBottom: '32px', letterSpacing: '-0.01em',
      }}>
        {cur.condition.text}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '28px' }} />

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
        {stats.map((s, i) => (
          <div key={s.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'var(--surface-hov)' : 'rgba(255,255,255,0.025)',
              border: `1px solid ${hovered === i ? 'var(--border-lit)' : 'var(--border)'}`,
              borderRadius: 'var(--r-md)', padding: '16px 15px',
              transition: 'background .2s, border-color .2s, transform .2s',
              transform: hovered === i ? 'translateY(-3px)' : 'translateY(0)',
              cursor: 'default',
              animation: 'riseIn 0.5s var(--ease) forwards',
              animationDelay: `${i * 0.04}s`, opacity: 0,
            }}
          >
            <div style={{ fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--text-muted)', marginBottom: '10px' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.7rem', marginTop: '4px', color: s.noteColor || 'var(--text-muted)' }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
