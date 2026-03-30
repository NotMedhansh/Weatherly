export default function EmptyState() {
  const features = [
    { icon: '🌡️', label: 'Live Temperature' },
    { icon: '📅', label: '7-Day Forecast' },
    { icon: '⏱️', label: '24h Hourly' },
    { icon: '🌬️', label: 'Wind & Humidity' },
    { icon: '🌿', label: 'Air Quality' },
    { icon: '🌅', label: 'Sun Timeline' },
  ]

  return (
    <div style={{
      textAlign: 'center', padding: '80px 40px',
      animation: 'riseIn 0.65s var(--ease) forwards',
      animationDelay: '0.3s', opacity: 0,
    }}>
      <div style={{
        fontSize: '4.5rem', marginBottom: '24px',
        filter: 'drop-shadow(0 0 30px rgba(79,156,249,0.25))',
        animation: 'floatIcon 6s ease-in-out infinite',
      }}>
        🌍
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
        fontWeight: 300, letterSpacing: '-0.04em',
        marginBottom: '14px', opacity: 0.55, lineHeight: 1.1,
      }}>
        Where in the world?
      </h2>

      <p style={{
        color: 'var(--text-muted)', fontSize: '0.9rem',
        lineHeight: 1.75, maxWidth: '320px',
        margin: '0 auto 36px',
      }}>
        Search any city to get live weather, 7-day forecasts,
        hourly breakdowns and air quality data.
      </p>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', maxWidth: '460px', margin: '0 auto',
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '99px', padding: '7px 14px',
            fontSize: '0.78rem', color: 'var(--text-muted)',
            backdropFilter: 'blur(12px)',
          }}>
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
