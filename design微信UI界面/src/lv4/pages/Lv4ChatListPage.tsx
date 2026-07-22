import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Lv4TabBar from '../components/Lv4TabBar'
import Lv4Avatar from '../components/Lv4Avatar'
import type { Lv4Chat } from '../types'
import s from './Lv4ChatListPage.module.css'

interface Props {
  chats: Lv4Chat[]
  query: string
  setQuery: (q: string) => void
  onOpen: (id: string) => void
  activeId?: string
  /** 桌面端分栏：是否作为侧栏渲染（隐藏 TabBar 与返回条） */
  asSidebar?: boolean
}

const MutedIcon = (
  <span className="muted-icon" aria-label="已静音">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  </span>
)

export default function Lv4ChatListPage({
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
      <Header title="微信" showSearch showPlus />

      {!asSidebar && (
        <div className={s.backBar} onClick={() => navigate('/home')}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Lv.4 全端体验 · 返回学习项目导航
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
            <div className={s.avatarCol} style={{ width: 48, height: 48 }}>
              <Lv4Avatar spec={chat.avatar} size={48} />
              {chat.unread ? <span className="badge">{chat.unread}</span> : null}
              {chat.ai ? <span className="ai-badge">AI</span> : null}
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
              {chat.pinned && <span className={s.pinnedTag}>置顶</span>}
            </div>
          </button>
        ))}
        <div style={{ height: asSidebar ? 20 : 60 }} />
      </div>

      {!asSidebar && <Lv4TabBar />}
    </div>
  )
}
