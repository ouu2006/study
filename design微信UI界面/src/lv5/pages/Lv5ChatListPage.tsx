import { useNavigate } from 'react-router-dom'
import Lv5TabBar from '../components/Lv5TabBar'
import Lv5Avatar from '../components/Lv5Avatar'
import type { Lv5Chat } from '../types'
import s from './Lv5ChatListPage.module.css'

interface Props {
  chats: Lv5Chat[]
  query: string
  setQuery: (q: string) => void
  onOpen: (id: string) => void
  activeId?: string
  asSidebar?: boolean
}

const MutedIcon = (
  <span className={s.mutedIcon} aria-label="已静音">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  </span>
)

export default function Lv5ChatListPage({
  chats,
  query,
  setQuery,
  onOpen,
  activeId,
  asSidebar,
}: Props) {
  const navigate = useNavigate()

  return (
    <div className={`page ${s.root}`}>
      {!asSidebar && (
        <div className={s.header}>
          <div className={s.headerTitle}>微信</div>
          <div className={s.headerActions}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      )}

      {asSidebar && (
        <div className={s.middleHeader}>
          <span className={s.middleHeaderTitle}>微信</span>
          <div className={s.middleHeaderActions}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      )}

      {!asSidebar && (
        <div className={s.backBar} onClick={() => navigate('/home')}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Lv.5 设计稿精还原 · 返回学习项目导航
        </div>
      )}

      <div className={s.searchBar}>
        <div className={s.searchWrap}>
          <svg className={s.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className={s.searchInput}
            placeholder="搜索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="搜索聊天"
          />
          {query && (
            <button className={s.clearBtn} onClick={() => setQuery('')} aria-label="清除">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={s.list}>
        {chats.length === 0 && <div className={s.empty}>没有找到相关聊天</div>}
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={`${s.row}${chat.pinned ? ` ${s.rowPinned}` : ''}`}
            style={{ background: activeId && chat.id === activeId ? '#DCECFF' : undefined }}
            onClick={() => onOpen(chat.id)}
          >
            <div className={s.avatarCol}>
              <Lv5Avatar spec={chat.avatar} size={48} />
              {chat.unread ? <span className={s.badge}>{chat.unread}</span> : null}
              {chat.ai ? <span className={s.aiBadge}>AI</span> : null}
            </div>
            <div className={s.content}>
              <div className={s.name}>{chat.name}</div>
              <div className={s.preview}>
                {chat.previewPrefix ? <span className={s.msgCount}>{chat.previewPrefix}</span> : null}
                <span>{chat.preview}</span>
              </div>
            </div>
            <div className={s.meta}>
              <div className={s.time}>
                {chat.time}
                {chat.muted ? MutedIcon : null}
              </div>
            </div>
          </button>
        ))}
        <div style={{ height: asSidebar ? 20 : 60 }} />
      </div>

      {!asSidebar && <Lv5TabBar />}
    </div>
  )
}
