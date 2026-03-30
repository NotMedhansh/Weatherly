export function getWeatherEmoji(code, isDay = true) {
  if (code === 1000) return isDay ? '☀️' : '🌙';
  if (code === 1003) return '🌤️';
  if (code === 1006) return '🌥️';
  if (code === 1009) return '☁️';
  if (code >= 1030 && code <= 1039) return '🌫️';
  if (code >= 1063 && code <= 1072) return '🌦️';
  if (code >= 1087 && code <= 1089) return '⛈️';
  if (code >= 1114 && code <= 1117) return '🌨️';
  if (code >= 1135 && code <= 1147) return '🌫️';
  if (code >= 1150 && code <= 1201) return '🌧️';
  if (code >= 1204 && code <= 1237) return '🌨️';
  if (code >= 1240 && code <= 1246) return '🌧️';
  if (code >= 1249 && code <= 1264) return '🌨️';
  if (code >= 1273 && code <= 1282) return '⛈️';
  return '🌡️';
}

export function getWeatherTheme(code) {
  if (code === 1000) return 'sunny';
  if (code <= 1003) return 'clear';
  if (code <= 1009) return 'cloudy';
  if (code >= 1030 && code <= 1039) return 'foggy';
  if (code >= 1150 && code <= 1201) return 'rainy';
  if (code >= 1063 && code <= 1072) return 'rainy';
  if (code >= 1204 && code <= 1264) return 'snowy';
  if (code >= 1273) return 'stormy';
  return 'cloudy';
}

export function uvLabel(uv) {
  if (uv <= 2) return { text: 'Low', color: '#3ecf8e' };
  if (uv <= 5) return { text: 'Moderate', color: '#f5c842' };
  if (uv <= 7) return { text: 'High', color: '#fb923c' };
  if (uv <= 10) return { text: 'Very High', color: '#f87171' };
  return { text: 'Extreme', color: '#c084fc' };
}

export function aqiInfo(index) {
  const map = [
    null,
    { text: 'Good',      color: '#3ecf8e' },
    { text: 'Fair',      color: '#a3e635' },
    { text: 'Moderate',  color: '#f5c842' },
    { text: 'Poor',      color: '#fb923c' },
    { text: 'Very Poor', color: '#f87171' },
  ];
  return map[index] || { text: 'Unknown', color: '#94a3b8' };
}

export function toF(c) { return (c * 9) / 5 + 32; }

export function formatTemp(c, isCelsius) {
  return Math.round(isCelsius ? c : toF(c));
}

export function sunProgress(localtime, astro) {
  const base = localtime.split(' ')[0];
  const toMin = (str) => {
    const d = new Date(`${base} ${str}`);
    return d.getHours() * 60 + d.getMinutes();
  };
  const now = new Date(localtime);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const rise = toMin(astro.sunrise);
  const set  = toMin(astro.sunset);
  if (nowMin < rise) return 0;
  if (nowMin > set)  return 100;
  return Math.round(((nowMin - rise) / (set - rise)) * 100);
}

export function dayLabel(dateStr, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en', { weekday: 'short' });
}

export function hourLabel(timeStr, isFirst) {
  if (isFirst) return 'Now';
  const h = new Date(timeStr).getHours();
  if (h === 0)  return '12 AM';
  if (h === 12) return '12 PM';
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

export function formatLocalTime(localtime) {
  return new Date(localtime).toLocaleTimeString('en', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}
