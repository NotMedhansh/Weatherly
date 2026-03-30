import { useState } from 'react'

export default function ApiKeySetup({ onSave, hasKey }) {
  const [val, setVal]       = useState('')
  const [focused, setFocused] = useState(false)

  if (hasKey) return null

  return (
    <div style={{ animation: 'riseIn 0.6s var(--ease) forwards', animationDelay: '0.1s', opacity: 0, marginBottom: '20px' }}>
      {/* Banner */}
      <div style={{
        display: 'flex', gap: '12px', alignItems: 'flex-start',
        background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.2)',
        borderRadius: 'var(--r-lg)', padding: '16px 20px', marginBottom: '12px',
      }}>
        <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>⚡</span>
        <div style={{ fontSize: '0.82rem', color: 'rgba(245,200,66,0.85)', lineHeight: 1.65 }}>
          <strong style={{ color: '#f5c842' }}>RapidAPI Key Required. </strong>
          This app uses <strong style={{ color: '#f5c842' }}>WeatherAPI.com</strong> via RapidAPI.
          Get your free key at{' '}
          <a href="https://rapidapi.com/weatherapi/api/weatherapi-com" target="_blank" rel="noreferrer"
            style={{ color: '#f5c842', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            rapidapi.com
          </a>
          {' '}— free tier: 1M calls/month.
        </div>
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text" value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && val.trim() && onSave(val.trim())}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Paste your RapidAPI key here…"
          spellCheck={false} autoComplete="off"
          style={{
            flex: 1, background: 'var(--surface)',
            border: `1px solid ${focused ? 'rgba(245,200,66,0.5)' : 'var(--border)'}`,
            boxShadow: focused ? '0 0 0 3px rgba(245,200,66,0.1)' : 'none',
            borderRadius: 'var(--r-md)', padding: '13px 18px',
            fontFamily: 'var(--font-ui)', fontSize: '0.88rem',
            color: 'var(--text)', outline: 'none',
            backdropFilter: 'blur(12px)', transition: 'border-color .2s, box-shadow .2s',
          }}
        />
        <button
          onClick={() => val.trim() && onSave(val.trim())}
          style={{
            background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)',
            borderRadius: 'var(--r-md)', padding: '13px 22px',
            fontFamily: 'var(--font-ui)', fontSize: '0.84rem', fontWeight: 600,
            color: '#f5c842', cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'background .2s, transform .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,200,66,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,200,66,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Save Key
        </button>
      </div>
    </div>
  )
}
