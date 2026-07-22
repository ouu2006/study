import { useEffect, useState } from 'react'

/**
 * Faux iOS status bar — time, signal, wifi, battery.
 * Purely decorative; the time auto-updates every minute.
 */
export default function StatusBar() {
  const [time, setTime] = useState(formatNow)

  useEffect(() => {
    const t = setInterval(() => setTime(formatNow()), 30 * 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="status-bar" aria-hidden>
      <span className="sb-time">{time}</span>
      <div className="sb-right">
        <div className="sb-signal">
          <span />
          <span />
          <span />
          <span />
        </div>
        {/* WiFi icon */}
        <svg className="sb-wifi" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 11.5a1 1 0 100-2 1 1 0 000 2z"
            fill="currentColor"
          />
          <path
            d="M3.6 6.1a6 6 0 018.8 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5.7 8.2a3 3 0 014.6 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <div className="sb-battery">
          <i />
        </div>
      </div>
    </div>
  )
}

function formatNow() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}
