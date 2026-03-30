export default async function handler(req, res) {
  // Allow CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { q } = req.query

  if (!q) {
    return res.status(400).json({ error: { message: 'Query parameter is required' } })
  }

  const apiKey = process.env.RAPIDAPI_KEY

  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured on server' } })
  }

  try {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(q)}&days=7&aqi=yes&alerts=no`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key':  apiKey,
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    })

    const data = await response.json()
    return res.status(response.status).json(data)

  } catch (err) {
    return res.status(500).json({ error: { message: 'Failed to fetch weather data' } })
  }
}
