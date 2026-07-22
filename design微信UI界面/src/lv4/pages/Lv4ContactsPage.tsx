import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Lv4TabBar from '../components/Lv4TabBar'
import { CONTACT_CATEGORIES, initialLv4Contacts } from '../data/mock'
import type { Lv4Contact } from '../types'
import s from './Lv4ContactsPage.module.css'

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'new-friend': (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  'chat-only': (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  'group-chat': (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  official: (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
      <line x1="10" y1="6" x2="18" y2="6" />
      <line x1="10" y1="10" x2="18" y2="10" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
}

const Chevron = (
  <svg className={s.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Lv4ContactsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Lv4Contact | null>(null)
  const [activeLetter, setActiveLetter] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<Record<string, HTMLElement | null>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return initialLv4Contacts
    return initialLv4Contacts.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  /** 按字母分组（仅保留有联系人的字母） */
  const grouped = useMemo(() => {
    const map = new Map<string, Lv4Contact[]>()
    for (const c of filtered) {
      const arr = map.get(c.letter) ?? []
      arr.push(c)
      map.set(c.letter, arr)
    }
    return ALPHABET.filter((l) => map.has(l)).map((l) => ({ letter: l, items: map.get(l)! }))
  }, [filtered])

  /** 字母索引中可用的字母 */
  const availableLetters = grouped.map((g) => g.letter)

  const scrollToLetter = (letter: string) => {
    const el = letterRefs.current[letter]
    if (el && scrollRef.current) {
      const top = el.offsetTop
      scrollRef.current.scrollTo({ top, behavior: 'smooth' })
      setActiveLetter(letter)
      window.setTimeout(() => setActiveLetter(''), 900)
    }
  }

  const openContact = (c: Lv4Contact) => setSelected(c)

  const startChat = (c: Lv4Contact) => {
    setSelected(null)
    if (c.chatId) {
      navigate(`/lv4/chat/${c.chatId}`)
    } else {
      navigate('/lv4')
    }
  }

  return (
    <div className="page">
      <Header title="通讯录" showSearch showPlus />

      <div className={s.searchArea}>
        <div className={s.searchBar}>
          <svg className={s.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className={s.searchInput}
            placeholder="搜索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="搜索联系人"
          />
        </div>
      </div>

      <div className={s.scroll} ref={scrollRef}>
        {/* 功能入口 */}
        <div className={s.categoryList}>
          {CONTACT_CATEGORIES.map((cat) => (
            <button key={cat.id} className={s.categoryItem} onClick={() => undefined}>
              <div className={s.categoryIcon} style={{ background: cat.bg }}>
                {CATEGORY_ICONS[cat.id]}
              </div>
              <span className={s.categoryLabel}>{cat.label}</span>
              {Chevron}
            </button>
          ))}
        </div>

        {/* 企业微信联系人 */}
        <div className={s.sectionDivider}>我的企业及企业联系人</div>
        <button className={s.enterpriseRow}>
          <div className={s.categoryIcon} style={{ background: '#3B82F6' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
          </div>
          <span className={s.categoryLabel}>企业微信联系人</span>
          {Chevron}
        </button>

        {/* 字母分组联系人 */}
        {grouped.length === 0 && <div className={s.empty}>没有找到相关联系人</div>}
        {grouped.map((g) => (
          <div key={g.letter}>
            <div
              className={s.letterHeader}
              ref={(el) => {
                letterRefs.current[g.letter] = el
              }}
            >
              {g.letter}
            </div>
            <div className={s.contactList}>
              {g.items.map((c) => (
                <button key={c.id} className={s.contactItem} onClick={() => openContact(c)}>
                  <div className={s.contactAvatar} style={{ background: c.background }}>
                    {c.label}
                  </div>
                  <span className={s.contactName}>{c.name}</span>
                  {Chevron}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 60 }} />
      </div>

      {/* 右侧字母索引 */}
      <div className={s.alphabetIndex}>
        {ALPHABET.map((l) => {
          const available = availableLetters.includes(l)
          return (
            <button
              key={l}
              className={`${s.alphaItem}${available ? '' : ` ${s.alphaDisabled}`}${activeLetter === l ? ` ${s.alphaActive}` : ''}`}
              onClick={() => available && scrollToLetter(l)}
              disabled={!available}
            >
              {l}
            </button>
          )
        })}
      </div>

      {/* 联系人详情 */}
      {selected && (
        <ContactDetail contact={selected} onClose={() => setSelected(null)} onStartChat={startChat} />
      )}

      <Lv4TabBar />
    </div>
  )
}

/** 联系人详情卡片（Lv.4 新增：点击联系人弹出详情，可「发消息」跳转聊天） */
function ContactDetail({
  contact,
  onClose,
  onStartChat,
}: {
  contact: Lv4Contact
  onClose: () => void
  onStartChat: (c: Lv4Contact) => void
}) {
  return (
    <div className={s.detailMask} onClick={onClose}>
      <div className={s.detailSheet} onClick={(e) => e.stopPropagation()}>
        <div className={s.detailHeader}>
          <button className={s.detailClose} onClick={onClose} aria-label="关闭">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className={s.detailTitle}>详细资料</span>
        </div>
        <div className={s.detailBody}>
          <div className={s.detailAvatar} style={{ background: contact.background }}>
            {contact.label}
          </div>
          <div className={s.detailName}>{contact.name}</div>
          <div className={s.detailMeta}>
            <span>微信号</span>
            <span>wx_{contact.id}_2024</span>
          </div>
          <div className={s.detailMeta}>
            <span>地区</span>
            <span>中国</span>
          </div>
          <div className={s.detailMeta}>
            <span>标签</span>
            <span>{contact.letter} 组</span>
          </div>
        </div>
        <button
          className={s.detailAction}
          onClick={() => onStartChat(contact)}
          disabled={!contact.chatId}
          style={contact.chatId ? undefined : { opacity: 0.5 }}
        >
          {contact.chatId ? '发消息' : '暂无聊天'}
        </button>
      </div>
    </div>
  )
}
