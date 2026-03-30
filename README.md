# 🌤 Weatherly — React Weather App

A production-grade weather app built with React + Vite, powered by WeatherAPI.com via RapidAPI. The API key is stored securely as a Vercel environment variable — never exposed to the browser.

---

## 🚀 Deploying to Vercel (Step by Step)

### Step 1 — Add your API key to `.env.local`
Open `.env.local` and replace the placeholder with your real key:
```
RAPIDAPI_KEY=your_actual_key_here
```
Get a free key at [rapidapi.com/weatherapi/api/weatherapi-com](https://rapidapi.com/weatherapi/api/weatherapi-com) — free tier: 1M calls/month.

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Weatherly"
```
Create a new repo on GitHub, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/weatherly.git
git push -u origin main
```

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
2. Vercel auto-detects Vite — leave all build settings as default
3. Before deploying, click **Environment Variables** and add:
   - **Name:** `RAPIDAPI_KEY`
   - **Value:** your RapidAPI key
4. Click **Deploy** ✅

Your site is live. The API key is hidden on Vercel's servers and never reaches the browser.

---

## 💻 Running Locally

You need **two terminals**:

**Terminal 1 — Start the API proxy:**
```bash
node dev-server.js
```

**Terminal 2 — Start Vite:**
```bash
npm run dev
```

Open `http://localhost:5173`

---

## Features
- 🌡️ Live temperature with °C / °F toggle
- 📅 7-day forecast with rain probability
- ⏱️ 24-hour hourly breakdown
- 🌬️ Wind, humidity, pressure, visibility, UV index, dew point, gust
- 🌅 Sunrise / sunset progress bar
- 🌿 Air quality index with 6 pollutants
- 🎨 Dynamic animated backgrounds (sunny, rainy, cloudy, snowy, stormy)
- 📍 GPS geolocation support
- 🔒 API key secured via Vercel serverless function
