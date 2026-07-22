import { useMemo, useRef, useState } from 'react'
import Header from '../../components/Header'
import Lv3TabBar from '../components/Lv3TabBar'
import { initialLv3Contacts, CONTACT_CATEGORIES } from '../data/mock'
import s from './Lv3ContactsPage.module.css'

export default function Lv3ContactsPage() {
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return initialLv3Contacts
    return initialLv3Contacts.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  // 按字母分组
  const grouped = useMemo(() => {
    const map = new Map<string, typeof initialLv3Contacts>()
    for (const c of filtered) {
      const arr = map.get(c.letter) ?? []
      arr.push(c)
      map.set(c.letter, arr)
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  const showToast = (label: string) => {
    setToast(label)
    window.setTimeout(() => setToast(null), 1400)
  }

  const scrollToLetter = (letter: string) => {
    const el = letterRefs.current[letter]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page">
      <Header title="通讯录" showSearch showPlus />

      <div className={s.searchArea}>
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
            aria-label="搜索联系人"
          />
        </div>
      </div>

      <div className={s.scroll}>
        {/* 功能入口 */}
        {CONTACT_CATEGORIES.map((cat) => (
          <button key={cat.id} className={s.categoryItem} onClick={() => showToast(cat.label)}>
            <div className={s.categoryIcon} style={{ background: cat.bg }}>
              <CategoryIcon id={cat.id} />
            </div>
            <span className={s.categoryLabel}>{cat.label}</span>
            <svg className={s.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}

        <div className={s.sectionDivider}>我的企业及企业联系人</div>
        <button className={s.categoryItem} onClick={() => showToast('企业微信联系人')}>
          <div className={s.categoryIcon} style={{ background: '#3B82F6' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
          </div>
          <span className={s.categoryLabel}>企业微信联系人</span>
          <svg className={s.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* 字母分组联系人 */}
        {grouped.length === 0 && <div className={s.empty}>没有找到相关联系人</div>}
        {grouped.map(([letter, contacts]) => (
          <div key={letter}>
            <div
              className={s.letterHeader}
              ref={(el) => {
                letterRefs.current[letter] = el
              }}
            >
              {letter}
            </div>
            {contacts.map((c) => (
              <button key={c.id} className={s.contactItem} onClick={() => showToast(c.name)}>
                <div className={s.contactAvatar} style={{ background: c.background }}>
                  {c.label}
                </div>
                <span className={s.contactName}>{c.name}</span>
                <svg className={s.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        ))}
        <div style={{ height: 24 }} />

        {/* 字母索引条 */}
        {grouped.length > 0 && (
          <div className={s.indexBar}>
            {grouped.map(([letter]) => (
              <button key={letter} className={s.indexItem} onClick={() => scrollToLetter(letter)}>
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
      <Lv3TabBar />
    </div>
  )
}

function CategoryIcon({ id }: { id: string }) {
  switch (id) {
    case 'new-friend':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      )
    case 'chat-only':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      )
    case 'group-chat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    case 'tag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    case 'official':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="10" y1="10" x2="18" y2="10" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      )
    case 'service':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      )
    default:
      return null
  }
}
