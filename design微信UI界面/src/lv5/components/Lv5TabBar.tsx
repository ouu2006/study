import { useLocation, useNavigate } from 'react-router-dom'
import s from './Lv5TabBar.module.css'

type TabKey = 'chats' | 'contacts' | 'discover' | 'profile'

const TABS: { key: TabKey; label: string; path: string }[] = [
  { key: 'chats', label: '微信', path: '/lv5' },
  { key: 'contacts', label: '通讯录', path: '/lv5/contacts' },
  { key: 'discover', label: '发现', path: '/lv5/discover' },
  { key: 'profile', label: '我', path: '/lv5/profile' },
]

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round">
      <path d="M8.5 3A4.5 4.5 0 004 7.5v1.4c0 1.2-.5 2.3-1.3 3.1L2 12.8c-.4.4-.4 1 0 1.4l.7.8c.8.8 1.3 2 1.3 3.1V20A4.5 4.5 0 008.5 24.5h7A4.5 4.5 0 0020 20v-1.4c0-1.2.5-2.3 1.3-3.1l.7-.8c.4-.4.4-1 0-1.4l-.7-.8c-.8-.8-1.3-2-1.3-3.1V7.5A4.5 4.5 0 0015.5 3h-7z" transform="translate(0,-2) scale(0.9)" />
    </svg>
  )
}

function ContactsIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function DiscoverIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const ICONS: Record<TabKey, (p: { active: boolean }) => JSX.Element> = {
  chats: ChatIcon,
  contacts: ContactsIcon,
  discover: DiscoverIcon,
  profile: ProfileIcon,
}

export default function Lv5TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeTab: TabKey = pathname.startsWith('/lv5/contacts')
    ? 'contacts'
    : pathname.startsWith('/lv5/discover')
      ? 'discover'
      : pathname.startsWith('/lv5/profile')
        ? 'profile'
        : 'chats'

  return (
    <div className={s.tabBar}>
      {TABS.map((tab) => {
        const Icon = ICONS[tab.key]
        const active = activeTab === tab.key
        return (
          <button
            key={tab.key}
            className={`${s.tabItem} ${active ? s.tabActive : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <Icon active={active} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
