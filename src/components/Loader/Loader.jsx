export default function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: '90px 40px', animation: 'fadeIn 0.3s ease forwards' }}>
      <div style={{
        display: 'inline-block', width: '48px', height: '48px',
        border: '2px solid var(--border)', borderTopColor: 'var(--blue)',
        borderRadius: '50%', animation: 'spinLoader 0.8s linear infinite',
        marginBottom: '20px',
      }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', letterSpacing: '0.06em' }}>
        Fetching weather data…
      </p>
    </div>
  )
}
