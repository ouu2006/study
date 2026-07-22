import { useNavigate, useLocation } from 'react-router-dom'

const TabIcon = {
  chats: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M8.5 3A4.5 4.5 0 004 7.5v1.4c0 1.2-.5 2.3-1.3 3.1L2 12.8c-.4.4-.4 1 0 1.4l.7.8c.8.8 1.3 2 1.3 3.1V20A4.5 4.5 0 008.5 24.5h7A4.5 4.5 0 0020 20v-1.4c0-1.2.5-2.3 1.3-3.1l.7-.8c.4-.4.4-1 0-1.4l-.7-.8c-.8-.8-1.3-2-1.3-3.1V7.5A4.5 4.5 0 0015.5 3h-7z" transform="translate(0,-2) scale(0.9)" />
    </svg>
  ),
  contacts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}

const TABS = [
  { key: 'chats', label: '微信', path: '/', match: (p: string) => p === '/' || p.startsWith('/chat/') },
  { key: 'contacts', label: '通讯录', path: '/contacts', match: (p: string) => p.startsWith('/contacts') },
  { key: 'discover', label: '发现', path: '/discover', match: (p: string) => p.startsWith('/discover') },
  { key: 'profile', label: '我', path: '/profile', match: (p: string) => p.startsWith('/profile') },
] as const

export default function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="tab-bar" role="tablist">
      {TABS.map((t) => {
        const active = t.match(pathname)
        return (
          <button
            key={t.key}
            className={`tab-item${active ? ' active' : ''}`}
            onClick={() => navigate(t.path)}
            role="tab"
            aria-selected={active}
          >
            {TabIcon[t.key]}
            <span>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
