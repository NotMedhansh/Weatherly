export default function Header() {
  const date = new Date().toLocaleDateString('en', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: '36px',
      animation: 'riseIn 0.6s var(--ease) forwards',
      animationDelay: '0.05s', opacity: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '9px', height: '9px', borderRadius: '50%',
          background: 'var(--blue)', boxShadow: '0 0 10px var(--blue)',
          animation: 'pulseDot 2.8s ease-in-out infinite', flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.95rem',
          fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          Weath<span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>erly</span>
        </span>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
          {date}
        </div>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: '3px' }}>
          Live Weather Intelligence
        </div>
      </div>
    </header>
  )
}
