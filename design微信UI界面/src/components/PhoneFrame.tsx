import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
}

/**
 * Multi-platform adaptation wrapper.
 * - On wide screens: renders a centered iPhone-style frame.
 * - On phone-width screens: drops the frame and goes fullscreen.
 */
export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="app-shell">
      <div className="phone-frame">{children}</div>
    </div>
  )
}
