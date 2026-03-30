const THEMES = {
  sunny:  { g: 'radial-gradient(ellipse 90% 60% at 50% -5%,rgba(245,200,66,0.22) 0%,transparent 55%),radial-gradient(ellipse 60% 45% at 90% 95%,rgba(234,88,12,0.1) 0%,transparent 55%),#070710', o1: 'rgba(245,200,66,0.09)', o2: 'rgba(234,88,12,0.06)' },
  clear:  { g: 'radial-gradient(ellipse 75% 55% at 15% 0%,rgba(37,99,235,0.32) 0%,transparent 58%),radial-gradient(ellipse 55% 40% at 85% 100%,rgba(15,35,100,0.35) 0%,transparent 55%),#080c14', o1: 'rgba(79,156,249,0.08)', o2: 'rgba(37,99,235,0.05)' },
  cloudy: { g: 'radial-gradient(ellipse 100% 55% at 50% 0%,rgba(71,85,105,0.45) 0%,transparent 65%),radial-gradient(ellipse 60% 40% at 20% 100%,rgba(30,41,59,0.3) 0%,transparent 55%),#07090e', o1: 'rgba(100,116,139,0.07)', o2: 'rgba(71,85,105,0.05)' },
  foggy:  { g: 'radial-gradient(ellipse 100% 70% at 50% 30%,rgba(148,163,184,0.12) 0%,transparent 70%),#08090f', o1: 'rgba(148,163,184,0.06)', o2: 'rgba(100,116,139,0.04)' },
  rainy:  { g: 'radial-gradient(ellipse 85% 60% at 25% 0%,rgba(23,37,84,0.55) 0%,transparent 62%),radial-gradient(ellipse 65% 50% at 80% 100%,rgba(12,25,65,0.45) 0%,transparent 58%),#040610', o1: 'rgba(30,58,138,0.08)', o2: 'rgba(23,37,84,0.06)' },
  snowy:  { g: 'radial-gradient(ellipse 80% 55% at 40% 0%,rgba(148,163,184,0.14) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 70% 100%,rgba(100,116,139,0.1) 0%,transparent 55%),#08090f', o1: 'rgba(148,163,184,0.07)', o2: 'rgba(226,232,240,0.04)' },
  stormy: { g: 'radial-gradient(ellipse 80% 60% at 30% 0%,rgba(15,23,42,0.8) 0%,transparent 65%),radial-gradient(ellipse 60% 50% at 80% 100%,rgba(10,10,30,0.6) 0%,transparent 60%),#020408', o1: 'rgba(167,139,250,0.07)', o2: 'rgba(79,156,249,0.05)' },
}

const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  top:  `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 1.8 + 0.4,
  dur:  `${2.5 + Math.random() * 4}s`,
  del:  `${-Math.random() * 5}s`,
  min:  0.05 + Math.random() * 0.12,
  max:  0.3  + Math.random() * 0.5,
}))

const RAIN = Array.from({ length: 75 }, (_, i) => ({
  id:   i,
  left: `${Math.random() * 110}%`,
  h:    `${14 + Math.random() * 22}px`,
  dur:  `${0.42 + Math.random() * 0.48}s`,
  del:  `${-Math.random() * 2}s`,
  op:   0.28 + Math.random() * 0.48,
}))

const SNOW = Array.from({ length: 50 }, (_, i) => ({
  id:    i,
  left:  `${Math.random() * 100}%`,
  sz:    `${2.5 + Math.random() * 4}px`,
  dur:   `${4 + Math.random() * 6}s`,
  del:   `${-Math.random() * 8}s`,
  drift: `${(Math.random() - 0.5) * 70}px`,
  op:    0.5 + Math.random() * 0.4,
}))

export default function AtmosphericBackground({ theme = 'clear' }) {
  const s = THEMES[theme] || THEMES.clear
  const isRainy  = theme === 'rainy'  || theme === 'stormy'
  const isSnowy  = theme === 'snowy'
  const isCloudy = theme === 'cloudy' || theme === 'foggy'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Gradient base */}
      <div style={{ position: 'absolute', inset: 0, background: s.g, transition: 'background 2s ease' }} />

      {/* Orbs */}
      <div style={{ position: 'absolute', top: '-180px', right: '-180px', width: '600px', height: '600px', borderRadius: '50%', background: s.o1, filter: 'blur(90px)', transition: 'background 2s' }} />
      <div style={{ position: 'absolute', bottom: '-120px', left: '-120px', width: '450px', height: '450px', borderRadius: '50%', background: s.o2, filter: 'blur(80px)', transition: 'background 2s' }} />

      {/* Stars */}
      {STARS.map(st => (
        <div key={st.id} style={{
          position: 'absolute', top: st.top, left: st.left,
          width: `${st.size}px`, height: `${st.size}px`,
          borderRadius: '50%', background: '#fff',
          '--star-min': st.min, '--star-max': st.max,
          animation: `twinkle ${st.dur} ease-in-out ${st.del} infinite alternate`,
        }} />
      ))}

      {/* Cloud shapes */}
      {isCloudy && [
        { w: 500, h: 200, top: '8%',  dur: '44s', del: '0s'   },
        { w: 350, h: 150, top: '35%', dur: '58s', del: '-22s' },
        { w: 280, h: 120, top: '62%', dur: '50s', del: '-10s' },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: c.top, left: '-280px',
          width: `${c.w}px`, height: `${c.h}px`, borderRadius: '50%',
          background: 'rgba(255,255,255,0.025)', filter: 'blur(50px)',
          animation: `driftCloud ${c.dur} linear ${c.del} infinite`,
        }} />
      ))}

      {/* Rain */}
      {isRainy && RAIN.map(r => (
        <div key={r.id} style={{
          position: 'absolute', top: '-30px', left: r.left,
          width: '1.2px', height: r.h,
          background: 'linear-gradient(to bottom,transparent,rgba(147,197,253,0.52))',
          borderRadius: '2px',
          animation: `rainFall ${r.dur} linear ${r.del} infinite`,
          opacity: r.op,
        }} />
      ))}

      {/* Snow */}
      {isSnowy && SNOW.map(sf => (
        <div key={sf.id} style={{
          position: 'absolute', top: '-15px', left: sf.left,
          width: sf.sz, height: sf.sz, borderRadius: '50%',
          background: 'rgba(226,232,240,0.75)',
          '--drift': sf.drift,
          animation: `snowFall ${sf.dur} linear ${sf.del} infinite`,
          opacity: sf.op,
        }} />
      ))}

      {/* Noise grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.022, mixBlendMode: 'overlay',
      }} />
    </div>
  )
}
