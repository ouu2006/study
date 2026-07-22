import type { ReactNode } from 'react'

interface HeaderProps {
  title?: ReactNode
  showBack?: boolean
  onBack?: () => void
  showSearch?: boolean
  showPlus?: boolean
  showMenu?: boolean
  rightSlot?: ReactNode
  hasBorder?: boolean
  align?: 'center' | 'right'
}

/**
 * Page header used by every page. Mirrors the design's 44px nav bar
 * with absolute-positioned left/right slots.
 */
export default function Header({
  title,
  showBack,
  onBack,
  showSearch,
  showPlus,
  showMenu,
  rightSlot,
  hasBorder,
  align = 'center',
}: HeaderProps) {
  return (
    <div className={`page-header${hasBorder ? ' has-border' : ''}`} style={align === 'right' ? { justifyContent: 'flex-end' } : undefined}>
      {showBack && (
        <button className="ph-left" onClick={onBack} aria-label="返回">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {title && <div className="ph-title">{title}</div>}
      <div className="ph-actions">
        {rightSlot}
        {showSearch && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
        )}
        {showPlus && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
        {showMenu && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        )}
      </div>
    </div>
  )
}
