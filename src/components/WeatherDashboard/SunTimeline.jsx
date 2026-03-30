import { sunProgress } from '../../utils/weatherHelpers'

export default function SunTimeline({ data }) {
  const astro    = data.forecast.forecastday[0].astro
  const progress = sunProgress(data.location.localtime, astro)

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '20px',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '22px 28px',
      backdropFilter: 'blur(18px)', marginBottom: '18px',
      animation: 'riseIn 0.55s var(--ease) forwards',
      animationDelay: '0.06s', opacity: 0,
    }}>
      {/* Sunrise */}
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div style={{ fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--text-muted)', marginBottom: '6px' }}>
          ☀️ Sunrise
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
          {astro.sunrise}
        </div>
      </div>

      {/* Progress track */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '3px', width: `${progress}%`,
            background: 'linear-gradient(to right, #f59e0b, #fbbf24, #fde68a)',
            transition: 'width 1.2s var(--ease)',
            boxShadow: '0 0 12px rgba(251,191,36,0.5)',
          }} />
        </div>
        {/* Sun dot */}
        <div style={{
          position: 'absolute', top: '50%', left: `${progress}%`,
          transform: 'translate(-50%, -50%)',
          width: '14px', height: '14px', borderRadius: '50%',
          background: '#fbbf24',
          boxShadow: '0 0 10px rgba(251,191,36,0.8), 0 0 24px rgba(251,191,36,0.4)',
          transition: 'left 1.2s var(--ease)',
        }} />
        {/* Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Dawn</span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {progress}% of day
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Dusk</span>
        </div>
      </div>

      {/* Sunset */}
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div style={{ fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.13em', color: 'var(--text-muted)', marginBottom: '6px' }}>
          🌅 Sunset
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
          {astro.sunset}
        </div>
      </div>
    </div>
  )
}
