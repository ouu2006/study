import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lv5TabBar from '../components/Lv5TabBar'
import Lv5Avatar from '../components/Lv5Avatar'
import { CONTACT_CATEGORIES, initialLv5Contacts } from '../data/mock'
import type { Lv5Contact } from '../types'
import s from './Lv5ContactsPage.module.css'

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const Chevron = (
  <svg className={s.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

interface Props {
  asSidebar?: boolean
  onOpenChat?: (chatId: string) => void
}

export default function Lv5ContactsPage({ asSidebar, onOpenChat }: Props) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Lv5Contact | null>(null)
  const [activeLetter, setActiveLetter] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<Record<string, HTMLElement | null>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return initialLv5Contacts
    return initialLv5Contacts.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  const grouped = useMemo(() => {
    const map = new Map<string, Lv5Contact[]>()
    for (const c of filtered) {
      const arr = map.get(c.letter) ?? []
      arr.push(c)
      map.set(c.letter, arr)
    }
    return ALPHABET.filter((l) => map.has(l)).map((l) => ({ letter: l, items: map.get(l)! }))
  }, [filtered])

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

  const openContact = (c: Lv5Contact) => setSelected(c)

  const startChat = (c: Lv5Contact) => {
    setSelected(null)
    if (c.chatId) {
      if (asSidebar && onOpenChat) {
        onOpenChat(c.chatId)
      } else {
        navigate(`/lv5/chat/${c.chatId}`)
      }
    }
  }

  return (
    <div className={`page ${s.root}`}>
      {!asSidebar && (
        <div className={s.header}>
          <div className={s.headerTitle}>通讯录</div>
          <div className={s.headerRight}>
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
        <div className={s.categoryList}>
          {CONTACT_CATEGORIES.map((cat) => (
            <button key={cat.id} className={s.categoryItem} onClick={() => undefined}>
              <div className={s.categoryIcon} style={{ background: cat.bg }}>
                {cat.icon}
              </div>
              <span className={s.categoryLabel}>{cat.label}</span>
              {Chevron}
            </button>
          ))}
        </div>

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
                  <Lv5Avatar spec={{ kind: 'single', background: c.background, label: c.label }} size={40} rounded={15} />
                  <span className={s.contactName}>{c.name}</span>
                  {Chevron}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: asSidebar ? 20 : 60 }} />
      </div>

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

      {selected && (
        <ContactDetail contact={selected} onClose={() => setSelected(null)} onStartChat={startChat} />
      )}

      {!asSidebar && <Lv5TabBar />}
    </div>
  )
}

function ContactDetail({
  contact,
  onClose,
  onStartChat,
}: {
  contact: Lv5Contact
  onClose: () => void
  onStartChat: (c: Lv5Contact) => void
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
        >
          {contact.chatId ? '发消息' : '暂无聊天'}
        </button>
      </div>
    </div>
  )
}
