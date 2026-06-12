/* ==========================================================================
    SkyCast Weather App - Logic, APIs, Autocomplete & Dynamic Canvas Particles
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. WMO Weather Code Configuration
// --------------------------------------------------------------------------

/**
 * Maps WMO weather codes to user-friendly text descriptions, CSS theme classes,
 * background canvas particle styles, and beautiful custom inline SVGs.
 */
function getWeatherConfig(code, isDay = 1) {
  const isNight = isDay === 0;
  
  // Weather maps based on WMO codes
  const map = {
    // Clear Sky
    0: {
      text: 'Clear Sky',
      theme: isNight ? 'theme-clear-night' : 'theme-sunny',
      effect: isNight ? 'stars' : 'sunny',
      icon: isNight 
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="url(#moon-grad)"/>
            <path d="M19 3v4M17 5h4M22 8v2M21 9h2" stroke-width="1.5" />
            <defs>
              <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e2e8f0" />
                <stop offset="100%" stop-color="#94a3b8" />
              </linearGradient>
            </defs>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" fill="url(#sun-grad)" stroke="#f59e0b" stroke-width="1.5"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            <defs>
              <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="100%" stop-color="#f59e0b" />
              </linearGradient>
            </defs>
           </svg>`
    },
    // Mainly Clear / Partly Cloudy
    1: {
      text: 'Mainly Clear',
      theme: isNight ? 'theme-clear-night' : 'theme-sunny',
      effect: isNight ? 'stars' : 'sunny',
      icon: isNight
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="url(#moon-grad)"/>
            <circle cx="19" cy="6" r="1" fill="#fff" />
            <defs>
              <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e2e8f0" />
                <stop offset="100%" stop-color="#94a3b8" />
              </linearGradient>
            </defs>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" fill="url(#sun-grad)" stroke="#f59e0b" stroke-width="1.5"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            <defs>
              <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="100%" stop-color="#f59e0b" />
              </linearGradient>
            </defs>
           </svg>`
    },
    2: {
      text: 'Partly Cloudy',
      theme: isNight ? 'theme-clear-night' : 'theme-sunny',
      effect: 'clouds',
      icon: isNight
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="url(#moon-grad)"/>
            <path d="M15 19H8a4 4 0 0 1-4-4 4 4 0 0 1 4-4c.3 0 .6.03.9.1A5 5 0 0 1 18 13.5c0 1-.3 1.9-.9 2.6c.6.6.9 1.4.9 2.4a3.5 3.5 0 0 1-3 3.5Z" fill="url(#cloud-grad)" stroke="#cbd5e1" stroke-width="1.5"/>
            <defs>
              <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.8" />
              </linearGradient>
              <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f8fafc" />
                <stop offset="100%" stop-color="#cbd5e1" />
              </linearGradient>
            </defs>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="#f59e0b"/>
            <circle cx="12" cy="12" r="4" fill="url(#sun-grad)" stroke="#f59e0b" stroke-width="1.5"/>
            <path d="M16 19h-5.5a3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1 3.5-3.5c.3 0 .6.02.9.08a4.5 4.5 0 0 1 8.1 2.42A3.5 3.5 0 0 1 16 19Z" fill="url(#cloud-grad)" stroke="#cbd5e1" stroke-width="1.5"/>
            <defs>
              <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="100%" stop-color="#f59e0b" />
              </linearGradient>
              <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="100%" stop-color="#cbd5e1" />
              </linearGradient>
            </defs>
           </svg>`
    },
    3: {
      text: 'Overcast',
      theme: 'theme-cloudy',
      effect: 'clouds',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 19h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 13.5A5.5 5.5 0 0 1 16 19Z" fill="url(#cloud-grad)" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M12 15h-5.5a3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1 3.5-3.5c.3 0 .6.02.9.08a4.5 4.5 0 0 1 8.1 2.42" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#cbd5e1" />
                  <stop offset="100%" stop-color="#64748b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    // Fog and Depositing Rime Fog
    45: {
      text: 'Foggy',
      theme: 'theme-cloudy',
      effect: 'fog',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 15h-6.5a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 9.5" stroke="#94a3b8" stroke-width="1.5"/>
              <line x1="4" y1="14" x2="20" y2="14" stroke="#94a3b8" stroke-width="2"/>
              <line x1="6" y1="18" x2="18" y2="18" stroke="#cbd5e1" stroke-width="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="#e2e8f0" stroke-width="1.5"/>
             </svg>`
    },
    48: {
      text: 'Depositing Fog',
      theme: 'theme-cloudy',
      effect: 'fog',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 15h-6.5a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 9.5" stroke="#94a3b8" stroke-width="1.5"/>
              <line x1="4" y1="14" x2="20" y2="14" stroke="#94a3b8" stroke-width="2"/>
              <line x1="6" y1="18" x2="18" y2="18" stroke="#cbd5e1" stroke-width="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="#e2e8f0" stroke-width="1.5"/>
             </svg>`
    },
    // Drizzle (Light, Moderate, Dense)
    51: {
      text: 'Light Drizzle',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#64748b" stroke-width="1.5"/>
              <line x1="8" y1="17" x2="8" y2="19" stroke="#60a5fa" stroke-width="2"/>
              <line x1="12" y1="17" x2="12" y2="19" stroke="#60a5fa" stroke-width="2"/>
              <line x1="16" y1="17" x2="16" y2="19" stroke="#60a5fa" stroke-width="2"/>
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#475569" />
                </linearGradient>
              </defs>
             </svg>`
    },
    53: {
      text: 'Drizzle',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#64748b" stroke-width="1.5"/>
              <line x1="7" y1="17" x2="6.5" y2="20" stroke="#38bdf8" stroke-width="2"/>
              <line x1="11" y1="17" x2="10.5" y2="20" stroke="#38bdf8" stroke-width="2"/>
              <line x1="15" y1="17" x2="14.5" y2="20" stroke="#38bdf8" stroke-width="2"/>
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#475569" />
                </linearGradient>
              </defs>
             </svg>`
    },
    55: {
      text: 'Heavy Drizzle',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#64748b" stroke-width="1.5"/>
              <line x1="7" y1="17" x2="6" y2="21" stroke="#0ea5e9" stroke-width="2.2"/>
              <line x1="11" y1="17" x2="10" y2="21" stroke="#0ea5e9" stroke-width="2.2"/>
              <line x1="15" y1="17" x2="14" y2="21" stroke="#0ea5e9" stroke-width="2.2"/>
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#475569" />
                </linearGradient>
              </defs>
             </svg>`
    },
    // Freezing Drizzle
    56: { text: 'Freezing Drizzle', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><circle cx="8" cy="18" r="1.5" fill="#e2e8f0"/><circle cx="12" cy="20" r="1.5" fill="#e2e8f0"/><circle cx="16" cy="18" r="1.5" fill="#e2e8f0"/></svg>` },
    57: { text: 'Dense Freezing Drizzle', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><circle cx="8" cy="18" r="1.5" fill="#e2e8f0"/><circle cx="12" cy="20" r="1.5" fill="#e2e8f0"/><circle cx="16" cy="18" r="1.5" fill="#e2e8f0"/></svg>` },
    // Rain (Slight, Moderate, Heavy)
    61: {
      text: 'Light Rain',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#475569" stroke-width="1.5"/>
              <line x1="8" y1="16" x2="6.5" y2="20" stroke="#38bdf8" stroke-width="2.5" />
              <line x1="14" y1="16" x2="12.5" y2="20" stroke="#38bdf8" stroke-width="2.5" />
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#334155" />
                </linearGradient>
              </defs>
             </svg>`
    },
    63: {
      text: 'Moderate Rain',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#334155" stroke-width="1.5"/>
              <line x1="8" y1="16" x2="6" y2="21" stroke="#0ea5e9" stroke-width="2.5" />
              <line x1="12" y1="16" x2="10" y2="21" stroke="#0ea5e9" stroke-width="2.5" />
              <line x1="16" y1="16" x2="14" y2="21" stroke="#0ea5e9" stroke-width="2.5" />
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#64748b" />
                  <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    65: {
      text: 'Heavy Rain',
      theme: 'theme-rainy',
      effect: 'rain',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#1e293b" stroke-width="1.5"/>
              <line x1="7" y1="16" x2="5" y2="22" stroke="#0284c7" stroke-width="3" />
              <line x1="11" y1="16" x2="9" y2="22" stroke="#0284c7" stroke-width="3" />
              <line x1="15" y1="16" x2="13" y2="22" stroke="#0284c7" stroke-width="3" />
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#0f172a" />
                </linearGradient>
              </defs>
             </svg>`
    },
    // Freezing Rain
    66: { text: 'Freezing Rain', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><line x1="8" y1="16" x2="6" y2="20" stroke="#a5f3fc" stroke-width="2"/><line x1="13" y1="17" x2="12" y2="21" stroke="#e2e8f0" stroke-width="2"/></svg>` },
    67: { text: 'Heavy Freezing Rain', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><line x1="8" y1="16" x2="6" y2="20" stroke="#a5f3fc" stroke-width="2"/><line x1="13" y1="17" x2="12" y2="21" stroke="#e2e8f0" stroke-width="2"/></svg>` },
    // Snow fall (Slight, Moderate, Heavy)
    71: {
      text: 'Light Snow',
      theme: 'theme-snowy',
      effect: 'snow',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#94a3b8" stroke-width="1.5"/>
              <circle cx="8" cy="18" r="1.5" fill="#f8fafc"/>
              <circle cx="13" cy="19" r="1" fill="#f8fafc"/>
              <circle cx="17" cy="17" r="1.5" fill="#f8fafc"/>
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#cbd5e1" />
                  <stop offset="100%" stop-color="#64748b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    73: {
      text: 'Moderate Snow',
      theme: 'theme-snowy',
      effect: 'snow',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M8 17v4M6 19h4M12 17v4M10 19h4M16 17v4M14 19h4" stroke="#f1f5f9" stroke-width="1.5" />
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#cbd5e1" />
                  <stop offset="100%" stop-color="#64748b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    75: {
      text: 'Heavy Snow',
      theme: 'theme-snowy',
      effect: 'snow',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#cloud-grad)" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M8 17v4M6 19h4M12 17v4M10 19h4M16 17v4M14 19h4" stroke="#ffffff" stroke-width="2" />
              <circle cx="9" cy="19" r="1" fill="#fff"/>
              <circle cx="15" cy="19" r="1.2" fill="#fff"/>
              <defs>
                <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#94a3b8" />
                  <stop offset="100%" stop-color="#475569" />
                </linearGradient>
              </defs>
             </svg>`
    },
    77: { text: 'Snow Grains', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><circle cx="9" cy="18" r="1" fill="#fff"/><circle cx="14" cy="20" r="1" fill="#fff"/></svg>` },
    // Rain Showers (Slight, Moderate, Violent)
    80: { text: 'Showers', theme: 'theme-rainy', effect: 'rain', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#475569"/><line x1="8" y1="16" x2="6.5" y2="20" stroke="#38bdf8" stroke-width="2.5"/><line x1="13" y1="17" x2="11.5" y2="21" stroke="#38bdf8" stroke-width="2.5"/></svg>` },
    81: { text: 'Heavy Showers', theme: 'theme-rainy', effect: 'rain', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#334155"/><line x1="8" y1="16" x2="6" y2="21" stroke="#0ea5e9" stroke-width="2.5"/><line x1="12" y1="16" x2="10" y2="21" stroke="#0ea5e9" stroke-width="2.5"/><line x1="16" y1="16" x2="14" y2="21" stroke="#0ea5e9" stroke-width="2.5"/></svg>` },
    82: { text: 'Torrential Showers', theme: 'theme-rainy', effect: 'rain', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#1e293b"/><line x1="8" y1="16" x2="5" y2="22" stroke="#0284c7" stroke-width="3"/><line x1="12" y1="16" x2="9" y2="22" stroke="#0284c7" stroke-width="3"/><line x1="16" y1="16" x2="13" y2="22" stroke="#0284c7" stroke-width="3"/></svg>` },
    // Snow Showers (Slight, Heavy)
    85: { text: 'Snow Showers', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#94a3b8"/><circle cx="8" cy="18" r="1.5" fill="#f1f5f9"/><circle cx="13" cy="20" r="1.5" fill="#f1f5f9"/></svg>` },
    86: { text: 'Heavy Snow Showers', theme: 'theme-snowy', effect: 'snow', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5c0-2.5 2-4.5 4.5-4.5a6 6 0 0 1 11 3.5" stroke="#cbd5e1"/><circle cx="8" cy="18" r="2" fill="#fff"/><circle cx="12" cy="20" r="2" fill="#fff"/><circle cx="16" cy="18" r="2" fill="#fff"/></svg>` },
    // Thunderstorm (Slight, Moderate, Dense)
    95: {
      text: 'Thunderstorm',
      theme: 'theme-thunderstorm',
      effect: 'thunderstorm',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#storm-cloud)" stroke="#1e1b4b" stroke-width="1.5"/>
              <path d="M13 16l-3 4h3l-2 3" stroke="#e9d5ff" stroke-width="2.5" fill="none" />
              <defs>
                <linearGradient id="storm-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#1e1b4b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    96: {
      text: 'Storm with Hail',
      theme: 'theme-thunderstorm',
      effect: 'thunderstorm',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#storm-cloud)" stroke="#1e1b4b" stroke-width="1.5"/>
              <path d="M13 15l-2 3h3l-1.5 2" stroke="#e9d5ff" stroke-width="2" fill="none" />
              <circle cx="8" cy="18" r="1.5" fill="#a5f3fc"/>
              <circle cx="16" cy="18" r="1.5" fill="#a5f3fc"/>
              <defs>
                <linearGradient id="storm-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#475569" />
                  <stop offset="100%" stop-color="#1e1b4b" />
                </linearGradient>
              </defs>
             </svg>`
    },
    99: {
      text: 'Severe Storm',
      theme: 'theme-thunderstorm',
      effect: 'thunderstorm',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 14h-6a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5c.4 0 .8.03 1.2.1A6 6 0 0 1 21 8.5A5.5 5.5 0 0 1 16 14Z" fill="url(#storm-cloud)" stroke="#090514" stroke-width="1.5"/>
              <path d="M13 15l-3 4h3l-2 3" stroke="#f472b6" stroke-width="3" fill="none" />
              <path d="M9 16l-1.5 2" stroke="#fff" stroke-width="1.5"/>
              <path x1="16" y1="16" x2="14.5" y2="18" stroke="#fff" stroke-width="1.5"/>
              <defs>
                <linearGradient id="storm-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#334155" />
                  <stop offset="100%" stop-color="#0f0920" />
                </linearGradient>
              </defs>
             </svg>`
    }
  };

  // Fallback for missing/unknown codes (treat as partly cloudy)
  const config = map[code] || {
    text: 'Unspecified',
    theme: 'theme-sunny',
    effect: 'clouds',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
  };

  return config;
}

// --------------------------------------------------------------------------
// 2. Global State Management
// --------------------------------------------------------------------------
const STATE = {
  unit: localStorage.getItem('skycast-unit') || 'C', // 'C' or 'F'
  currentLoc: JSON.parse(localStorage.getItem('skycast-last-loc')) || {
    lat: 40.7128,
    lon: -74.0060,
    name: 'New York, United States'
  },
  weatherData: null,
  activeEffect: null,
  debounceTimeout: null,
  suggestionsList: [],
  highlightedIndex: -1
};

// --------------------------------------------------------------------------
// 3. DOM Cache
// --------------------------------------------------------------------------
const DOM = {
  // Navigation & Search Controls
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  suggestions: document.getElementById('search-suggestions'),
  locateBtn: document.getElementById('locate-btn'),
  unitC: document.getElementById('unit-c'),
  unitF: document.getElementById('unit-f'),
  
  // App UI Sections
  errorBanner: document.getElementById('error-banner'),
  closeErrorBtn: document.getElementById('close-error-btn'),
  appLoader: document.getElementById('app-loader'),
  dashboard: document.getElementById('weather-dashboard'),
  
  // Main weather display
  locationName: document.getElementById('location-name'),
  localDateTime: document.getElementById('local-datetime'),
  currentTemp: document.getElementById('current-temp'),
  tempMin: document.getElementById('current-temp-min'),
  tempMax: document.getElementById('current-temp-max'),
  weatherIconContainer: document.getElementById('weather-icon-container'),
  weatherConditionText: document.getElementById('weather-condition-text'),
  
  // Quick Details Grid
  apparentTemp: document.getElementById('metric-apparent-temp'),
  apparentDesc: document.getElementById('metric-apparent-desc'),
  humidity: document.getElementById('metric-humidity'),
  humidityDesc: document.getElementById('metric-humidity-desc'),
  windSpeed: document.getElementById('metric-wind'),
  windUnit: document.getElementById('metric-wind-unit'),
  windArrow: document.getElementById('wind-arrow'),
  windDirText: document.getElementById('metric-wind-dir-text'),
  precipitation: document.getElementById('metric-precip'),
  precipDesc: document.getElementById('metric-precip-desc'),
  uvIndex: document.getElementById('metric-uv'),
  uvLevel: document.getElementById('metric-uv-level'),
  uvDesc: document.getElementById('metric-uv-desc'),
  pressure: document.getElementById('metric-pressure'),
  pressureDesc: document.getElementById('metric-pressure-desc'),
  
  // Lists
  hourlyList: document.getElementById('hourly-list'),
  weeklyList: document.getElementById('weekly-list'),
  canvas: document.getElementById('weather-canvas')
};

// Helper to check for CSS class helper
function changeTheme(themeClass) {
  document.body.className = '';
  document.body.classList.add(themeClass);
}

// --------------------------------------------------------------------------
// 4. Background Canvas Weather Particle System
// --------------------------------------------------------------------------
class CanvasWeatherEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.effect = null;
    this.animationId = null;
    this.width = 0;
    this.height = 0;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    // Re-initialize particles if effect active
    if (this.effect) {
      this.setEffect(this.effect, true);
    }
  }

  setEffect(effectName, forceReinit = false) {
    if (this.effect === effectName && !forceReinit) return;
    
    this.effect = effectName;
    this.particles = [];
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    const w = this.width;
    const h = this.height;

    switch (effectName) {
      case 'sunny':
        // Slow floating glowing golden dust particles
        for (let i = 0; i < 20; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 4 + 2,
            opacity: Math.random() * 0.4 + 0.1,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.1,
            pulse: Math.random() * Math.PI
          });
        }
        break;
      
      case 'stars':
        // Twinkling stars
        for (let i = 0; i < 40; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.2,
            twinkleSpeed: Math.random() * 0.05 + 0.01,
            phase: Math.random() * Math.PI
          });
        }
        break;

      case 'clouds':
        // Large slow white fog buffers
        for (let i = 0; i < 8; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.6,
            r: Math.random() * 80 + 70,
            opacity: Math.random() * 0.05 + 0.02,
            vx: Math.random() * 0.3 + 0.1,
            vy: (Math.random() - 0.5) * 0.05
          });
        }
        break;

      case 'rain':
        // Downward rain droplets
        for (let i = 0; i < 70; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            length: Math.random() * 20 + 10,
            vy: Math.random() * 12 + 8,
            vx: -2 - Math.random() * 2,
            opacity: Math.random() * 0.3 + 0.15
          });
        }
        break;

      case 'thunderstorm':
        // Heavy rain + lightning variables
        for (let i = 0; i < 110; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            length: Math.random() * 25 + 15,
            vy: Math.random() * 16 + 12,
            vx: -3 - Math.random() * 3,
            opacity: Math.random() * 0.35 + 0.2
          });
        }
        this.flashOpacity = 0;
        this.nextFlash = Math.random() * 200 + 100;
        break;

      case 'snow':
        // Soft white snowflakes drifting down
        for (let i = 0; i < 60; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 3.5 + 1.5,
            vy: Math.random() * 1.5 + 0.6,
            vx: (Math.random() - 0.2) * 0.8,
            opacity: Math.random() * 0.5 + 0.2,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.03 + 0.01
          });
        }
        break;

      case 'fog':
        // Horizontal misty strips
        for (let i = 0; i < 6; i++) {
          this.particles.push({
            x: Math.random() * w - 100,
            y: Math.random() * h * 0.8 + 50,
            width: Math.random() * 250 + 150,
            height: Math.random() * 40 + 20,
            vx: Math.random() * 0.15 + 0.05,
            opacity: Math.random() * 0.06 + 0.02
          });
        }
        break;
    }

    this.tick();
  }

  tick() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const w = this.width;
    const h = this.height;

    switch (this.effect) {
      case 'sunny':
        this.particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;
          p.pulse += 0.02;
          const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.05;
          
          if (p.y < -p.r) p.y = h + p.r;
          if (p.x < -p.r) p.x = w + p.r;
          if (p.x > w + p.r) p.x = -p.r;
          
          this.ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0, currentOpacity)})`;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          this.ctx.fill();
        });
        break;
      
      case 'stars':
        this.particles.forEach(p => {
          p.phase += p.twinkleSpeed;
          const twinkleOpacity = p.opacity + Math.sin(p.phase) * 0.25;
          this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, twinkleOpacity))})`;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          this.ctx.fill();
        });
        break;

      case 'clouds':
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x - p.r > w) p.x = -p.r;
          if (p.y - p.r > h) p.y = -p.r;
          
          // Draw cloud circle
          const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
          grad.addColorStop(0.8, `rgba(255, 255, 255, ${p.opacity * 0.2})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          this.ctx.fillStyle = grad;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          this.ctx.fill();
        });
        break;

      case 'rain':
      case 'thunderstorm':
        // Thunderstorm flash event
        if (this.effect === 'thunderstorm') {
          this.nextFlash--;
          if (this.nextFlash <= 0) {
            this.flashOpacity = Math.random() * 0.5 + 0.15; // Set flash opacity
            this.nextFlash = Math.random() * 250 + 150; // Random interval
          }
          if (this.flashOpacity > 0) {
            this.ctx.fillStyle = `rgba(147, 197, 253, ${this.flashOpacity})`;
            this.ctx.fillRect(0, 0, w, h);
            this.flashOpacity -= 0.04;
          }
        }

        this.ctx.strokeStyle = this.effect === 'thunderstorm' ? 'rgba(165, 243, 252, 0.4)' : 'rgba(96, 165, 250, 0.35)';
        this.ctx.lineWidth = this.effect === 'thunderstorm' ? 1.5 : 1.2;
        this.ctx.beginPath();
        
        this.particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;
          
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p.x + p.vx * 0.5, p.y + p.length);
          
          if (p.y > h) {
            p.y = -p.length;
            p.x = Math.random() * w;
          }
        });
        this.ctx.stroke();
        break;

      case 'snow':
        this.particles.forEach(p => {
          p.y += p.vy;
          p.wobble += p.wobbleSpeed;
          p.x += p.vx + Math.sin(p.wobble) * 0.3;
          
          if (p.y > h + p.r) {
            p.y = -p.r;
            p.x = Math.random() * w;
          }
          if (p.x > w + p.r) p.x = -p.r;
          if (p.x < -p.r) p.x = w + p.r;
          
          this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          this.ctx.fill();
        });
        break;

      case 'fog':
        this.particles.forEach(p => {
          p.x += p.vx;
          if (p.x > w) p.x = -p.width;
          
          const grad = this.ctx.createLinearGradient(p.x, 0, p.x + p.width, 0);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${p.opacity})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          this.ctx.fillStyle = grad;
          this.ctx.fillRect(p.x, p.y, p.width, p.height);
        });
        break;
    }

    this.animationId = requestAnimationFrame(() => this.tick());
  }
}

// Instantiate canvas particles engine
let weatherEffectManager;

// --------------------------------------------------------------------------
// 5. Utility Conversions & Formatting
// --------------------------------------------------------------------------

// Celsius to Fahrenheit
function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

// km/h to mph
function kmToMph(kmh) {
  return kmh * 0.621371;
}

// Formats a number with C/F unit symbol
function formatTemp(val) {
  const rounded = Math.round(val);
  return `${rounded}`;
}

// Convert wind direction code (degrees) to compass direction
function getWindDirection(deg) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 22.5) % 16;
  return directions[index];
}

// Helper to determine text description of UV Index intensity
function getUVLevel(uv) {
  if (uv <= 2) return { text: 'Low', class: 'uv-low' };
  if (uv <= 5) return { text: 'Moderate', class: 'uv-mod' };
  if (uv <= 7) return { text: 'High', class: 'uv-high' };
  if (uv <= 10) return { text: 'Very High', class: 'uv-vhigh' };
  return { text: 'Extreme', class: 'uv-extreme' };
}

// Format local date and time using target timezone
function formatLocalTime(isoString, timezone) {
  try {
    const optionsDate = { weekday: 'short', month: 'short', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
    
    // Create date directly with timezone
    const dateObj = new Date(isoString);
    const dateString = dateObj.toLocaleDateString('en-US', { ...optionsDate, timeZone: timezone });
    const timeString = dateObj.toLocaleTimeString('en-US', { ...optionsTime, timeZone: timezone });
    
    return `${dateString} • ${timeString}`;
  } catch (e) {
    // Fallback if timezone config invalid
    const d = new Date();
    return d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  }
}

// Get short weekday string
function getWeekdayName(dateStr, timezone) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: timezone });
  } catch (e) {
    return 'Day';
  }
}

// --------------------------------------------------------------------------
// 6. Geocoding / Search Autocomplete API Callers
// --------------------------------------------------------------------------

/**
 * Queries Open-Meteo Geocoding API for autocomplete matches
 */
async function fetchLocationSuggestions(query) {
  if (!query || query.trim().length < 2) {
    clearSuggestions();
    return;
  }
  
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=6&language=en&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Geocoding search failed');
    
    const data = await response.json();
    STATE.suggestionsList = data.results || [];
    renderSuggestions();
  } catch (err) {
    console.error('Error fetching search results:', err);
    STATE.suggestionsList = [];
    clearSuggestions();
  }
}

function renderSuggestions() {
  DOM.suggestions.innerHTML = '';
  
  if (STATE.suggestionsList.length === 0) {
    DOM.suggestions.classList.remove('show');
    return;
  }

  STATE.suggestionsList.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('suggestion-item');
    li.setAttribute('role', 'option');
    li.setAttribute('id', `suggestion-opt-${index}`);
    
    if (index === STATE.highlightedIndex) {
      li.classList.add('highlighted');
    }

    const state = item.admin1 ? `${item.admin1}, ` : '';
    const country = item.country || '';
    const name = item.name || '';
    
    li.innerHTML = `
      <span class="suggestion-title">${name}</span>
      <span class="suggestion-subtitle">${state}${country}</span>
    `;

    li.addEventListener('click', () => selectSuggestion(item));
    DOM.suggestions.appendChild(li);
  });

  DOM.suggestions.classList.add('show');
}

function clearSuggestions() {
  DOM.suggestions.innerHTML = '';
  DOM.suggestions.classList.remove('show');
  STATE.suggestionsList = [];
  STATE.highlightedIndex = -1;
}

function selectSuggestion(item) {
  const state = item.admin1 ? `${item.admin1}, ` : '';
  const country = item.country || '';
  const locationString = `${item.name}, ${state}${country}`;
  
  STATE.currentLoc = {
    lat: item.latitude,
    lon: item.longitude,
    name: locationString
  };

  DOM.searchInput.value = '';
  DOM.clearSearchBtn.style.display = 'none';
  clearSuggestions();
  
  // Persist local selection
  localStorage.setItem('skycast-last-loc', JSON.stringify(STATE.currentLoc));
  
  // Fetch weather data
  loadWeatherData();
}

// Keyboard navigation in suggestions list
function handleSuggestionsKeydown(e) {
  if (!DOM.suggestions.classList.contains('show')) return;
  const max = STATE.suggestionsList.length - 1;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    STATE.highlightedIndex = (STATE.highlightedIndex + 1) > max ? 0 : (STATE.highlightedIndex + 1);
    renderSuggestions();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    STATE.highlightedIndex = (STATE.highlightedIndex - 1) < 0 ? max : (STATE.highlightedIndex - 1);
    renderSuggestions();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (STATE.highlightedIndex >= 0 && STATE.highlightedIndex <= max) {
      selectSuggestion(STATE.suggestionsList[STATE.highlightedIndex]);
    }
  } else if (e.key === 'Escape') {
    clearSuggestions();
  }
}

// --------------------------------------------------------------------------
// 7. Weather Forecast Fetching
// --------------------------------------------------------------------------

/**
 * Loads the weather data based on current coordinates in state
 */
async function loadWeatherData() {
  showLoader();
  hideError();
  
  try {
    const { lat, lon, name } = STATE.currentLoc;
    
    // Open-Meteo Weather URL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather forecast load failed');
    
    STATE.weatherData = await response.json();
    renderWeather(STATE.weatherData, name);
  } catch (err) {
    console.error('Error fetching weather:', err);
    showError('Could not retrieve weather details. Please verify your connection.');
    hideLoader();
  }
}

// --------------------------------------------------------------------------
// 8. Render Engine
// --------------------------------------------------------------------------

function renderWeather(data, name) {
  const current = data.current;
  const daily = data.daily;
  const hourly = data.hourly;
  const tz = data.timezone;
  
  const wConfig = getWeatherConfig(current.weather_code, current.is_day);

  // Set Theme & Canvas Particles
  changeTheme(wConfig.theme);
  if (weatherEffectManager) {
    weatherEffectManager.setEffect(wConfig.effect);
  }

  // Set Location details
  DOM.locationName.textContent = name;
  DOM.localDateTime.textContent = formatLocalTime(current.time, tz);

  // Render Temps
  const showCelsius = STATE.unit === 'C';
  const cTemp = current.temperature_2m;
  const cApparent = current.apparent_temperature;
  const maxToday = daily.temperature_2m_max[0];
  const minToday = daily.temperature_2m_min[0];

  DOM.currentTemp.textContent = formatTemp(showCelsius ? cTemp : cToF(cTemp));
  DOM.tempMax.textContent = formatTemp(showCelsius ? maxToday : cToF(maxToday));
  DOM.tempMin.textContent = formatTemp(showCelsius ? minToday : cToF(minToday));

  // Render Icon & Condition
  DOM.weatherIconContainer.innerHTML = wConfig.icon;
  DOM.weatherConditionText.textContent = wConfig.text;

  // Feels Like Metric Card
  DOM.apparentTemp.textContent = formatTemp(showCelsius ? cApparent : cToF(cApparent));
  const diffApparent = Math.abs(cApparent - cTemp);
  DOM.apparentDesc.textContent = diffApparent < 1.5 
    ? 'Matches actual temperature.' 
    : (cApparent > cTemp ? 'Feels warmer than actual.' : 'Windchill is cooling things down.');

  // Humidity Metric Card
  const humVal = current.relative_humidity_2m;
  DOM.humidity.textContent = humVal;
  let humDesc = 'Comfortable environment.';
  if (humVal > 70) humDesc = 'Sticky, humid atmosphere.';
  if (humVal < 30) humDesc = 'Dry air, drink more water.';
  DOM.humidityDesc.textContent = humDesc;

  // Wind Metric Card
  const wSpeed = current.wind_speed_10m;
  const wDir = current.wind_direction_10m;
  DOM.windSpeed.textContent = showCelsius ? Math.round(wSpeed) : Math.round(kmToMph(wSpeed));
  DOM.windUnit.textContent = showCelsius ? 'km/h' : 'mph';
  DOM.windDirText.textContent = getWindDirection(wDir);
  DOM.windArrow.style.transform = `rotate(${wDir}deg)`;

  // Precipitation Card
  const precip = current.precipitation || 0;
  const rain = current.rain || 0;
  const snow = current.snowfall || 0;
  DOM.precipitation.textContent = precip.toFixed(1);
  let pDesc = 'No precipitation expected.';
  if (precip > 0) {
    if (snow > 0) pDesc = `Snowing: ~${snow.toFixed(1)}cm.`;
    else if (rain > 10) pDesc = 'Heavy downpour. Watch out!';
    else pDesc = 'Light rainfall in progress.';
  } else {
    // check forecast precipitation sum today
    const sumToday = daily.precipitation_sum[0] || 0;
    if (sumToday > 0) pDesc = `Sum of today: ${sumToday.toFixed(1)}mm.`;
  }
  DOM.precipDesc.textContent = pDesc;

  // UV Index Card
  const uvMax = daily.uv_index_max[0] || 0;
  const uvInfo = getUVLevel(uvMax);
  DOM.uvIndex.textContent = uvMax.toFixed(1);
  DOM.uvLevel.textContent = uvInfo.text;
  DOM.uvLevel.className = `metric-unit ${uvInfo.class}`;
  let uvDesc = 'No sun protection required.';
  if (uvMax >= 3 && uvMax <= 5) uvDesc = 'Wear sunscreen & sunglasses.';
  if (uvMax > 5) uvDesc = 'High risk. Seek shade at midday.';
  DOM.uvDesc.textContent = uvDesc;

  // Pressure Card
  const press = Math.round(current.pressure_msl);
  DOM.pressure.textContent = press;
  let pressDesc = 'Standard pressure.';
  if (press > 1020) pressDesc = 'High pressure: Settled weather.';
  if (press < 1009) pressDesc = 'Low pressure: Unsettled / storm risk.';
  DOM.pressureDesc.textContent = pressDesc;

  // Render 24 Hours Forecast Card
  DOM.hourlyList.innerHTML = '';
  
  // Find local index of current hour
  const nowHour = new Date(current.time);
  let startIndex = 0;
  
  // Find index in hourly dataset matching current local hour (or closest)
  const matches = hourly.time.findIndex(t => new Date(t) >= nowHour);
  if (matches !== -1) startIndex = matches;

  // Render next 24 elements from startIndex
  for (let i = 0; i < 24; i++) {
    const idx = startIndex + i;
    if (idx >= hourly.time.length) break;

    const hTimeStr = hourly.time[idx];
    const hTimeObj = new Date(hTimeStr);
    
    // Format hour display: e.g. "11 AM" or "12 PM"
    let hDisplay = hTimeObj.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true, timeZone: tz });
    // Remove leading zeros or extra spacer
    hDisplay = hDisplay.replace(/^0/, '').replace(':00 ', ' ');
    
    // If it's the first element, mark as "Now"
    if (i === 0) hDisplay = 'Now';

    const hCode = hourly.weather_code[idx];
    // Find isDay for hourly element (roughly 6 AM to 6 PM is day)
    const hrVal = hTimeObj.getHours();
    const hIsDay = (hrVal >= 6 && hrVal < 18) ? 1 : 0;
    
    const hConfig = getWeatherConfig(hCode, hIsDay);
    const hTemp = hourly.temperature_2m[idx];
    const hTempDisplay = formatTemp(showCelsius ? hTemp : cToF(hTemp));

    const itemDiv = document.createElement('div');
    itemDiv.className = 'hourly-item';
    itemDiv.innerHTML = `
      <span class="hourly-time">${hDisplay}</span>
      <div class="hourly-icon" title="${hConfig.text}">${hConfig.icon}</div>
      <span class="hourly-temp">${hTempDisplay}°</span>
    `;
    
    DOM.hourlyList.appendChild(itemDiv);
  }

  // Render 7-Day Forecast Card
  DOM.weeklyList.innerHTML = '';
  
  // Determine absolute min and max for calculations
  const absoluteMax = Math.max(...daily.temperature_2m_max);
  const absoluteMin = Math.min(...daily.temperature_2m_min);
  const tempSpread = absoluteMax - absoluteMin || 1;

  for (let i = 0; i < 7; i++) {
    if (i >= daily.time.length) break;
    
    const dTime = daily.time[i];
    let dayName = getWeekdayName(dTime, tz);
    if (i === 0) dayName = 'Today';

    const dCode = daily.weather_code[i];
    const dConfig = getWeatherConfig(dCode, 1); // Render standard day icon for daily outlook
    
    const dMax = daily.temperature_2m_max[i];
    const dMin = daily.temperature_2m_min[i];

    const lowDisp = formatTemp(showCelsius ? dMin : cToF(dMin));
    const highDisp = formatTemp(showCelsius ? dMax : cToF(dMax));

    // Calculate relative percentages for custom spread bar
    const leftPct = ((dMin - absoluteMin) / tempSpread) * 100;
    const widthPct = ((dMax - dMin) / tempSpread) * 100;

    const rowDiv = document.createElement('div');
    rowDiv.className = 'weekly-item';
    rowDiv.innerHTML = `
      <span class="weekly-day">${dayName}</span>
      <div class="weekly-icon-wrapper" title="${dConfig.text}">${dConfig.icon}</div>
      <span class="weekly-condition">${dConfig.text}</span>
      <div class="weekly-temps-bar">
        <span class="weekly-temp-low">${lowDisp}°</span>
        <div class="weekly-progress-bar" aria-hidden="true">
          <div class="weekly-progress-fill" style="left: ${leftPct}%; width: ${widthPct}%"></div>
        </div>
        <span class="weekly-temp-high">${highDisp}°</span>
      </div>
    `;

    DOM.weeklyList.appendChild(rowDiv);
  }

  hideLoader();
  showDashboard();
}

// --------------------------------------------------------------------------
// 9. Loader & UI State Changers
// --------------------------------------------------------------------------
function showLoader() {
  DOM.appLoader.style.display = 'flex';
  DOM.dashboard.style.display = 'none';
}

function hideLoader() {
  DOM.appLoader.style.display = 'none';
}

function showDashboard() {
  DOM.dashboard.style.display = 'grid';
}

function showError(msg) {
  const errText = DOM.errorBanner.querySelector('.error-message');
  errText.textContent = msg;
  DOM.errorBanner.style.display = 'flex';
}

function hideError() {
  DOM.errorBanner.style.display = 'none';
}

// --------------------------------------------------------------------------
// 10. Geolocation Integration
// --------------------------------------------------------------------------
async function locateUser() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser.');
    return;
  }
  
  showLoader();
  hideError();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      let locationName = 'Current Location';

      try {
        // Simple OSM reverse-geocoding (Zoom 10 gives city/district level detail)
        const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
        
        // Wait, Nominatim requests should ideally have standard headers, fetch does standard client header
        const res = await fetch(geocodeUrl, {
          headers: {
            'Accept-Language': 'en'
          }
        });
        
        if (res.ok) {
          const resJson = await res.json();
          const addr = resJson.address || {};
          // Find best name
          const city = addr.city || addr.town || addr.village || addr.county || addr.district || '';
          const state = addr.state ? `${addr.state}, ` : '';
          const country = addr.country || '';
          
          if (city) {
            locationName = `${city}, ${state}${country}`;
          } else if (addr.country) {
            locationName = `${lat.toFixed(3)}N, ${lon.toFixed(3)}E (${addr.country})`;
          }
        }
      } catch (err) {
        console.warn('Reverse geocoding failed, falling back to coordinates name:', err);
        locationName = `Location (${lat.toFixed(3)}N, ${lon.toFixed(3)}E)`;
      }

      STATE.currentLoc = {
        lat,
        lon,
        name: locationName
      };

      // Persist locally
      localStorage.setItem('skycast-last-loc', JSON.stringify(STATE.currentLoc));
      
      // Load weather details
      loadWeatherData();
    },
    (error) => {
      console.warn('Geolocation error code:', error.code);
      let errorMsg = 'Unable to fetch your location.';
      if (error.code === error.PERMISSION_DENIED) {
        errorMsg = 'Location access denied. Please search for your district in the search bar.';
      }
      showError(errorMsg);
      hideLoader();
      
      // Load last known location if exists
      showDashboard();
    },
    { timeout: 7000, enableHighAccuracy: false }
  );
}

// --------------------------------------------------------------------------
// 11. Initializer & Event Listeners
// --------------------------------------------------------------------------
function initializeApp() {
  // Initialize Background particles engine
  weatherEffectManager = new CanvasWeatherEffect(DOM.canvas);

  // Setup initial active units button
  if (STATE.unit === 'F') {
    DOM.unitC.classList.remove('active');
    DOM.unitF.classList.add('active');
  }

  // Bind Listeners
  
  // Search suggestion autocomplete bindings
  DOM.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    
    if (val.trim().length > 0) {
      DOM.clearSearchBtn.style.display = 'flex';
    } else {
      DOM.clearSearchBtn.style.display = 'none';
    }

    clearTimeout(STATE.debounceTimeout);
    STATE.debounceTimeout = setTimeout(() => {
      fetchLocationSuggestions(val);
    }, 350);
  });

  DOM.searchInput.addEventListener('keydown', handleSuggestionsKeydown);

  // Clear search text listener
  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    DOM.clearSearchBtn.style.display = 'none';
    clearSuggestions();
    DOM.searchInput.focus();
  });

  // Close suggestions on clicking outside
  document.addEventListener('click', (e) => {
    if (!DOM.searchInput.contains(e.target) && !DOM.suggestions.contains(e.target)) {
      clearSuggestions();
    }
  });

  // Error Banner Close Button
  DOM.closeErrorBtn.addEventListener('click', hideError);

  // Locate User Button
  DOM.locateBtn.addEventListener('click', locateUser);

  // Unit Switchers
  DOM.unitC.addEventListener('click', () => {
    if (STATE.unit === 'C') return;
    STATE.unit = 'C';
    localStorage.setItem('skycast-unit', 'C');
    DOM.unitF.classList.remove('active');
    DOM.unitC.classList.add('active');
    
    if (STATE.weatherData) {
      renderWeather(STATE.weatherData, STATE.currentLoc.name);
    }
  });

  DOM.unitF.addEventListener('click', () => {
    if (STATE.unit === 'F') return;
    STATE.unit = 'F';
    localStorage.setItem('skycast-unit', 'F');
    DOM.unitC.classList.remove('active');
    DOM.unitF.classList.add('active');
    
    if (STATE.weatherData) {
      renderWeather(STATE.weatherData, STATE.currentLoc.name);
    }
  });

  // Initial Data Load
  loadWeatherData();
}

// Start app on DOMContentLoaded
window.addEventListener('DOMContentLoaded', initializeApp);
