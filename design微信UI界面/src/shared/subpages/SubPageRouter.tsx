import { useParams, useNavigate } from 'react-router-dom'
import { getSubPage } from './subpagesData'
import DiscoverSubPage from './discover/DiscoverSubPage'
import ContactsSubPage from './contacts/ContactsSubPage'
import ProfileSubPage from './profile/ProfileSubPage'

interface SubPageRouteProps {
  category: 'discover' | 'contacts' | 'profile'
  level?: string
  onOpenChat?: (chatId: string) => void
  onReset?: () => void
  embedded?: boolean
}

export function SubPageRoute({ category, level = '', onOpenChat, onReset, embedded }: SubPageRouteProps) {
  const { subId } = useParams<{ subId: string }>()
  return (
    <SubPageRouter
      category={category}
      subId={subId ?? ''}
      level={level}
      onOpenChat={onOpenChat}
      onReset={onReset}
      embedded={embedded}
    />
  )
}

interface SubPageRouterProps {
  category: 'discover' | 'contacts' | 'profile'
  subId: string
  level?: string
  onOpenChat?: (chatId: string) => void
  onReset?: () => void
  embedded?: boolean
}

export default function SubPageRouter({ category, subId, level = '', onOpenChat, onReset, embedded }: SubPageRouterProps) {
  const data = getSubPage(subId, category)
  if (!data) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>页面不存在</div>
  }

  switch (category) {
    case 'discover':
      return <DiscoverSubPage data={data} level={level} embedded={embedded} />
    case 'contacts':
      return <ContactsSubPage data={data} level={level} onOpenChat={onOpenChat} embedded={embedded} />
    case 'profile':
      return <ProfileSubPage data={data} level={level} onReset={onReset} embedded={embedded} />
    default:
      return <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>未知分类</div>
  }
}

// 通用返回按钮
export function BackBar({ to, label }: { to: string; label?: string }) {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
        fontSize: 14, color: '#576B95', cursor: 'pointer', background: '#f4f4f4',
      }}
      onClick={() => navigate(to)}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label ?? '返回'}
    </div>
  )
}
