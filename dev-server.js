// Simple local dev server that mimics the Vercel /api/weather function
// Run with: node dev-server.js
// Then in another terminal: npm run dev

import http from 'http'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
let apiKey = ''
try {
  const env = readFileSync(join(__dirname, '.env.local'), 'utf8')
  const match = env.match(/RAPIDAPI_KEY=(.+)/)
  if (match) apiKey = match[1].trim()
} catch {
  // no .env.local found
}

const PORT = 3001

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  if (!req.url.startsWith('/api/weather')) {
    res.writeHead(404)
    return res.end(JSON.stringify({ error: 'Not found' }))
  }

  const urlObj = new URL(req.url, `http://localhost:${PORT}`)
  const q = urlObj.searchParams.get('q')

  if (!q) {
    res.writeHead(400)
    return res.end(JSON.stringify({ error: { message: 'Query required' } }))
  }

  if (!apiKey) {
    res.writeHead(500)
    return res.end(JSON.stringify({ error: { message: 'RAPIDAPI_KEY not set in .env.local' } }))
  }

  try {
    const weatherUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(q)}&days=7&aqi=yes&alerts=no`
    const response = await fetch(weatherUrl, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      },
    })
    const data = await response.json()
    res.writeHead(response.status)
    res.end(JSON.stringify(data))
  } catch (err) {
    res.writeHead(500)
    res.end(JSON.stringify({ error: { message: 'Failed to fetch weather' } }))
  }
})

server.listen(PORT, () => {
  console.log(`\n🌤  Weatherly dev proxy running on http://localhost:${PORT}`)
  console.log(`   Reads RAPIDAPI_KEY from .env.local\n`)
})
