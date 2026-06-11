# Nimbus Weather App (CODE-A-NOVA)

A premium, highly interactive Single Page Weather Application ("Nimbus") designed to display real-time weather information and short-term forecasts. It features dynamic canvas particle effects (rain, snow, drifting clouds, sun rays) that respond in real time to current weather conditions, packaged inside a beautiful glassmorphic UI.

**GitHub Repository URL**: [https://github.com/jiya-coder/CODE-A-NOVA](https://github.com/jiya-coder/CODE-A-NOVA)

---

## Key Features

- **Local & District Search**: Search for weather information by city, local area, or district name worldwide.
- **Smart Autocomplete**: As you type, the app queries the geocoding database and presents matching options with state and country details to resolve duplicates (e.g., London, UK vs. London, Canada).
- **Dynamic Background Visuals**: A custom HTML5 Canvas particle engine renders weather animations dynamically based on current conditions:
  - *Sunny/Clear Day*: Golden sun rays and slow floating light particles.
  - *Clear Night*: Twinkling starry sky.
  - *Cloudy/Overcast*: Soft drifting cloud layers.
  - *Rainy/Showers*: Angled falling rain droplets.
  - *Thunderstorm*: Stormy rain streaks paired with random sheet lightning flashes.
  - *Snowy*: Gentle drifting and swirling snowflakes.
  - *Foggy/Misty*: Slow-moving horizontal haze bands.
- **Atmospheric Micro-Metrics**: Provides a comprehensive weather breakdown:
  - Apparent Temperature ("Feels Like")
  - Humidity % with dryness/humidity descriptions
  - Wind speed & direction (with a rotating wind compass arrow)
  - Rainfall/Precipitation volume (mm)
  - UV Index (Low, Moderate, High, Extreme sun-safety warning guidelines)
  - Sea-level pressure (hPa)
- **Short-Term Forecasts**:
  - *Hourly Timeline*: Scrollable horizontal carousel displaying the next 24 hours of forecasts.
  - *7-Day Outlook*: A week-ahead planner featuring custom relative temperature spread bars.
- **Auto-Location Detection**: Uses the browser's Geolocation API to find your coordinates, with a fallback reverse-geocoding lookup to identify your local district.
- **Metric Unit Toggle**: Switch seamlessly between Metric (°C, km/h, mm) and Imperial (°F, mph, inches) systems.
- **Persistent Storage**: Remembers your preferred temperature unit and last searched location so it loads instantly when you return.

---

## Tech Stack

- **Markup & Structure**: Semantic HTML5.
- **Styling**: Vanilla CSS3 (Custom variables, glassmorphic filters, responsive grid & flexbox layouts, keyframe animations).
- **Core Logic**: Modern ES6+ JavaScript modules.
- **API Services (No API Key Required)**:
  - **Open-Meteo Geocoding API**: Autocomplete location search.
  - **Open-Meteo Weather Forecast API**: Live weather data, hourly statistics, and daily outlooks.
  - **OpenStreetMap Nominatim Reverse-Geocoding**: Translates coordinates to location names for browser location lookups.
- **Bundler & Local Server**: [Vite](https://vite.dev/) for quick hot-reloading and lightweight builds.

---

## How to Get Started Locally

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/jiya-coder/CODE-A-NOVA.git
cd CODE-A-NOVA/Project-1
```

### 2. Install Dependencies
Installs Vite dev dependency:
```bash
npm install
```

### 3. Run the Development Server
Starts the local hot-reloading server:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

### 4. Build for Production
Compiles and minifies the assets into a clean `dist/` directory ready for deployment:
```bash
npm run build
```

---

## Important Things to Know

1. **No API Keys Required**: The application leverages free public API endpoints, making it highly portable. You do not need to configure any environment variables or setup credentials.
2. **Reverse-Geocoding Rate Limits**: Nominatim Geocoding service has a mild rate limit. If the "Locate Me" button fails to resolve the exact city name, it will automatically fall back to showing your raw latitude and longitude coordinates and fetch weather successfully.
3. **Theme Transitions**: Visual changes are handled by appending classes like `.theme-rainy` or `.theme-sunny` directly to the `body` element, which triggers CSS variable updates to smoothly fade background gradients.