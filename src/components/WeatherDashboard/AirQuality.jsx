import { aqiInfo } from '../../utils/weatherHelpers'

const POLLUTANTS = [
  { key: 'co',    label: 'CO',    unit: 'μg/m³', decimals: 1 },
  { key: 'no2',   label: 'NO₂',  unit: 'μg/m³', decimals: 1 },
  { key: 'o3',    label: 'O₃',   unit: 'μg/m³', decimals: 1 },
  { key: 'pm2_5', label: 'PM2.5',unit: 'μg/m³', decimals: 1 },
  { key: 'pm10',  label: 'PM10', unit: 'μg/m³', decimals: 1 },
  { key: 'so2',   label: 'SO₂',  unit: 'μg/m³', decimals: 1 },
]

export default function AirQuality({ aq }) {
  if (!aq) return null

  const aqiNum  = aq['us-epa-index'] || 1
  const info    = aqiInfo(aqiNum)
  const percent = (aqiNum / 6) * 100

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '24px 28px',
      backdropFilter: 'blur(18px)', marginBottom: '18px',
      animation: 'riseIn 0.55s var(--ease) forwards',
      animationDelay: '0.18s', opacity: 0,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
          Air Quality Index
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {aqiNum}
          </span>
          <span style={{ fontSize: '0.85rem', color: info.color, fontWeight: 600 }}>
            {info.text}
          </span>
        </div>
      </div>

      {/* Bar */}
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '22px' }}>
        <div style={{
          height: '100%', width: `${percent}%`,
          background: info.color, borderRadius: '3px',
          boxShadow: `0 0 12px ${info.color}55`,
          transition: 'width 1.2s var(--ease)',
        }} />
      </div>

      {/* Pollutants */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
        {POLLUTANTS.map(p => (
          <div key={p.key} style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-sm)', padding: '12px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              {p.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              {aq[p.key] != null ? aq[p.key].toFixed(p.decimals) : '—'}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '3px' }}>{p.unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
