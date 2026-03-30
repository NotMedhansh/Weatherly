import { useState } from 'react'

export default function SearchBar({ onSearch, onGeo, loading }) {
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(false)

  const go  = () => { if (query.trim()) onSearch(query.trim()) }
  const geo = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos => onGeo(pos.coords.latitude, pos.coords.longitude),
      ()  => onSearch('__geo_error__')
    )
  }

  return (
    <div style={{
      display: 'flex', gap: '10px', marginBottom: '28px',
      animation: 'riseIn 0.6s var(--ease) forwards',
      animationDelay: '0.18s', opacity: 0,
    }}>
      {/* Input */}
      <div style={{ flex: 1, position: 'relative' }}>
        <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.95rem', opacity: 0.38, pointerEvents: 'none' }}>
          🔍
        </span>
        <input
          type="text" value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && go()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search city, country…"
          autoComplete="off"
          style={{
            width: '100%', background: 'var(--surface)',
            border: `1px solid ${focused ? 'rgba(79,156,249,0.55)' : 'var(--border)'}`,
            boxShadow: focused ? '0 0 0 3px var(--blue-glow)' : 'none',
            borderRadius: 'var(--r-lg)', padding: '15px 20px 15px 46px',
            fontFamily: 'var(--font-ui)', fontSize: '0.95rem',
            color: 'var(--text)', outline: 'none',
            backdropFilter: 'blur(18px)', transition: 'border-color .2s, box-shadow .2s',
          }}
        />
      </div>

      {/* Geo */}
      <button onClick={geo} title="Use my location" style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: '15px 17px', fontSize: '1.05rem',
        color: 'var(--text-muted)', cursor: 'pointer',
        backdropFilter: 'blur(18px)', flexShrink: 0,
        transition: 'color .2s, border-color .2s, background .2s, transform .15s',
      }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.borderColor = 'rgba(79,156,249,0.45)'; e.currentTarget.style.background = 'var(--blue-soft)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >📍</button>

      {/* Search */}
      <button onClick={go} disabled={loading} style={{
        background: 'var(--blue)', border: 'none', borderRadius: 'var(--r-lg)',
        padding: '15px 28px', fontFamily: 'var(--font-ui)', fontSize: '0.9rem',
        fontWeight: 600, color: '#060c14', cursor: loading ? 'not-allowed' : 'pointer',
        flexShrink: 0, opacity: loading ? 0.7 : 1, letterSpacing: '0.02em',
        transition: 'transform .15s, box-shadow .2s',
      }}
        onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(79,156,249,0.38)' } }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        {loading ? '…' : 'Search'}
      </button>
    </div>
  )
}
