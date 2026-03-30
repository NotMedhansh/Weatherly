import { useState, useEffect } from 'react'

export default function Toast({ message, type = 'error', onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 350)
    }, 3600)
    return () => clearTimeout(t)
  }, [message])

  if (!message) return null

  const isOk = type === 'success'
  const c = isOk
    ? { bg: 'rgba(62,207,142,0.1)', border: 'rgba(62,207,142,0.28)', text: '#6ee7b7', icon: '✓' }
    : { bg: 'rgba(245,101,101,0.1)', border: 'rgba(245,101,101,0.28)', text: '#fca5a5', icon: '⚠' }

  return (
    <div style={{
      position: 'fixed', bottom: '32px', left: '50%', zIndex: 999,
      animation: `${visible ? 'toastIn' : 'toastOut'} 0.32s var(--ease) forwards`,
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: c.bg, border: `1px solid ${c.border}`,
        borderRadius: 'var(--r-md)', padding: '12px 22px',
        backdropFilter: 'blur(18px)', color: c.text,
        fontSize: '0.87rem', whiteSpace: 'nowrap',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.icon}</span>
        {message}
      </div>
    </div>
  )
}
