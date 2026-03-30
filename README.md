# 🌤 Weatherly — Full-Stack Weather App

A modern full-stack weather application that provides real-time weather insights, 7-day forecasts, hourly breakdowns, and air quality data. Built with React (Vite) and a secure Node.js API proxy to protect sensitive API keys.

---

## 🔗 Live Demo
👉 https://weatherly-q0gocgd3j-medhanshkhurana2-1900s-projects.vercel.app

---



## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js (API proxy)
- **API:** WeatherAPI (via RapidAPI)
- **Deployment:** Vercel
- **Styling:** CSS / Tailwind

---

## ✨ Features

- 🌡️ Real-time weather with °C / °F toggle  
- 📅 7-day forecast with rain probability  
- ⏱️ 24-hour hourly weather breakdown  
- 🌬️ Wind, humidity, pressure, visibility, UV index  
- 🌅 Sunrise & sunset tracking  
- 🌿 Air Quality Index (AQI) with pollutant details  
- 🎨 Dynamic UI backgrounds based on weather conditions  
- 📍 Location-based weather using geolocation  
- 🔒 Secure API handling via backend proxy (no key exposure)

---

## ⚙️ How It Works

- Frontend sends requests to `/api/weather`
- Backend (Node.js server) acts as a proxy
- API key is securely attached on the server side
- Data is fetched from WeatherAPI via RapidAPI
- Response is returned to the frontend

This ensures the API key is never exposed in the browser.

---

## 💻 Running Locally

Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/weatherly.git
cd weatherly
