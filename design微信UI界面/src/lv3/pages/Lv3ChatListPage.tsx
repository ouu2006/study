import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Lv3TabBar from '../components/Lv3TabBar'
import Lv3Avatar from '../components/Lv3Avatar'
import type { Lv3Chat } from '../types'
import s from './Lv3ChatListPage.module.css'

interface Props {
  chats: Lv3Chat[]
  query: string
  setQuery: (q: string) => void
  onOpen: (id: string) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
  onToggleMute: (id: string) => void
  onToggleRead: (id: string) => void
  activeId?: string
  /** 桌面端分栏：是否作为侧栏渲染（隐藏 TabBar） */
  asSidebar?: boolean
}

interface MenuState {
  chatId: string
  x: number
  y: number
}

const LONG_PRESS_MS = 500
const MOVE_TOLERANCE = 8

export default function Lv3ChatListPage({
  chats,
  query,
  setQuery,
  onOpen,
  onDelete,
  onTogglePin,
  onToggleMute,
  onToggleRead,
  activeId,
  asSidebar,
}: Props) {
  const [menu, setMenu] = useState<MenuState | null>(null)
  const navigate = useNavigate()

  return (
    <div className={s.root}>
      <Header title="微信" showSearch showPlus />

      <div className={s.backBar} onClick={() => navigate('/home')}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Lv.3 交互深化 · 返回学习项目导航
      </div>

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
        </div>
      </div>

      <div className={s.list}>
        {chats.length === 0 && <div className={s.empty}>没有找到相关聊天</div>}
        {chats.map((chat) => (
          <SwipeRow
            key={chat.id}
            chat={chat}
            active={chat.id === activeId}
            onOpen={() => onOpen(chat.id)}
            onMenu={(x, y) => setMenu({ chatId: chat.id, x, y })}
            onDelete={() => onDelete(chat.id)}
            onTogglePin={() => onTogglePin(chat.id)}
            onToggleMute={() => onToggleMute(chat.id)}
          />
        ))}
        <div style={{ height: asSidebar ? 20 : 60 }} />
      </div>

      {!asSidebar && <Lv3TabBar />}

      {menu && (
        <ContextMenu
          state={menu}
          chat={chats.find((c) => c.id === menu.chatId)}
          onClose={() => setMenu(null)}
          onTogglePin={(id) => {
            onTogglePin(id)
            setMenu(null)
          }}
          onToggleMute={(id) => {
            onToggleMute(id)
            setMenu(null)
          }}
          onToggleRead={(id) => {
            onToggleRead(id)
            setMenu(null)
          }}
          onDelete={(id) => {
            onDelete(id)
            setMenu(null)
          }}
        />
      )}
    </div>
  )
}

/** 可滑动的聊天行：左滑露出「置顶/静音/删除」，长按或右键弹出菜单 */
function SwipeRow({
  chat,
  active,
  onOpen,
  onMenu,
  onDelete,
  onTogglePin,
  onToggleMute,
}: {
  chat: Lv3Chat
  active: boolean
  onOpen: () => void
  onMenu: (x: number, y: number) => void
  onDelete: () => void
  onTogglePin: () => void
  onToggleMute: () => void
}) {
  const [offset, setOffset] = useState(0)
  const startX = useRef(0)
  const startY = useRef(0)
  const dragging = useRef(false)
  const moved = useRef(false)
  const longPressTimer = useRef<number | null>(null)
  const opened = useRef(false)

  const ACTION_WIDTH = 72 * 3

  const clearLongPress = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button === 2) return
    dragging.current = true
    moved.current = false
    startX.current = e.clientX
    startY.current = e.clientY
    longPressTimer.current = window.setTimeout(() => {
      if (!moved.current) {
        dragging.current = false
        onMenu(e.clientX, e.clientY)
        if (opened.current) {
          setOffset(0)
          opened.current = false
        }
      }
    }, LONG_PRESS_MS)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - startX.current
    const dy = e.clientY - startY.current
    if (!moved.current && Math.abs(dx) > MOVE_TOLERANCE) {
      moved.current = true
      clearLongPress()
    }
    if (moved.current) {
      // 仅处理水平滑动
      if (Math.abs(dx) > Math.abs(dy)) {
        let next = (opened.current ? -ACTION_WIDTH : 0) + dx
        if (next > 0) next = 0
        if (next < -ACTION_WIDTH) next = -ACTION_WIDTH
        setOffset(next)
      }
    }
  }

  const onPointerUp = () => {
    clearLongPress()
    if (!dragging.current) return
    dragging.current = false
    if (moved.current) {
      if (offset < -ACTION_WIDTH / 2) {
        setOffset(-ACTION_WIDTH)
        opened.current = true
      } else {
        setOffset(0)
        opened.current = false
      }
    }
  }

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onMenu(e.clientX, e.clientY)
  }

  const mutedIcon = (
    <span className="muted-icon" aria-label="已静音">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    </span>
  )

  return (
    <div
      className={s.rowOuter}
      onContextMenu={onContextMenu}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className={s.actions}>
        <button className={`${s.actionBtn} ${s.actionPin}`} onClick={(e) => { e.stopPropagation(); onTogglePin(); setOffset(0); opened.current = false }}>
          {chat.pinned ? '取消置顶' : '置顶'}
        </button>
        <button className={`${s.actionBtn} ${s.actionMute}`} onClick={(e) => { e.stopPropagation(); onToggleMute(); setOffset(0); opened.current = false }}>
          {chat.muted ? '取消静音' : '静音'}
        </button>
        <button className={`${s.actionBtn} ${s.actionDel}`} onClick={(e) => { e.stopPropagation(); onDelete() }}>
          删除
        </button>
      </div>
      <div
        className={`${s.row} ${chat.pinned ? s.rowPinned : ''}`}
        style={{ transform: `translateX(${offset}px)`, background: active ? '#DCECFF' : undefined }}
        onClick={() => {
          if (moved.current) return
          if (opened.current) {
            setOffset(0)
            opened.current = false
            return
          }
          onOpen()
        }}
      >
        <div className={s.avatarCol} style={{ width: 48, height: 48 }}>
          <Lv3Avatar spec={chat.avatar} size={48} />
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
            {chat.muted ? mutedIcon : null}
          </div>
          {chat.pinned && <span className={s.pinnedTag}>置顶</span>}
        </div>
      </div>
    </div>
  )
}

function ContextMenu({
  state,
  chat,
  onClose,
  onTogglePin,
  onToggleMute,
  onToggleRead,
  onDelete,
}: {
  state: MenuState
  chat?: Lv3Chat
  onClose: () => void
  onTogglePin: (id: string) => void
  onToggleMute: (id: string) => void
  onToggleRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: state.x, y: state.y })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let x = state.x
    let y = state.y
    if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8
    if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8
    setPos({ x, y })
  }, [state.x, state.y])

  if (!chat) return null

  return (
    <>
      <div className={s.menuMask} onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose() }} />
      <div ref={ref} className={s.menu} style={{ left: pos.x, top: pos.y }}>
        <button className={s.menuItem} onClick={() => onTogglePin(chat.id)}>
          {chat.pinned ? '取消置顶' : '置顶该聊天'}
        </button>
        <button className={s.menuItem} onClick={() => onToggleMute(chat.id)}>
          {chat.muted ? '取消静音' : '消息免打扰'}
        </button>
        <button className={s.menuItem} onClick={() => onToggleRead(chat.id)}>
          {chat.unread ? '标为已读' : '标为未读'}
        </button>
        <button className={`${s.menuItem} ${s.menuItemDanger}`} onClick={() => onDelete(chat.id)}>
          删除该聊天
        </button>
      </div>
    </>
  )
}
