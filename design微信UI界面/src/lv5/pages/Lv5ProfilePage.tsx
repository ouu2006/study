import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lv5TabBar from '../components/Lv5TabBar'
import { PROFILE_ROWS } from '../data/mock'
import s from './Lv5ProfilePage.module.css'

interface ExtendedRow {
  id: string
  label: string
  iconColor: string
  icon: React.ReactNode
  hint?: string
  action?: 'nav-home' | 'nav-lv4' | 'reset'
}

export default function Lv5ProfilePage({ onReset }: { onReset?: () => void }) {
  const navigate = useNavigate()
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (label: string) => {
    setToast(label)
    window.setTimeout(() => setToast(null), 1400)
  }

  const extendedRows: ExtendedRow[] = [
    ...PROFILE_ROWS,
    {
      id: 'nav-lv4',
      label: '返回 Lv.4 全端体验',
      iconColor: '#8B5CF6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      ),
      action: 'nav-lv4',
    },
    {
      id: 'nav-home',
      label: '学习项目导航',
      iconColor: '#EC4899',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
      action: 'nav-home',
    },
    {
      id: 'reset',
      label: '重置 Lv.5 数据',
      iconColor: '#FA5151',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      ),
      action: 'reset',
    },
  ]

  return (
    <div className={`page ${s.root}`}>
      <div className={s.header}>
        <div className={s.headerRight}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.levelCard} onClick={() => navigate('/home')}>
          <span className={s.levelBadge}>Lv.5 设计稿精还原</span>
          <div className={s.levelTitle}>微信UI界面 · 设计稿精准还原</div>
          <div className={s.levelDesc}>
            基于设计稿 5 页面高保真还原：聊天列表 / 文件传输助手 / 通讯录 / 发现 / 我。
            多类型消息（文字/链接/文件/图片）+ 表情面板 + 更多功能面板 + 桌面端分栏多端适配。
          </div>
          <div className={s.levelLink}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            查看完整学习路线图（Lv.1 → Lv.2 → Lv.3 → Lv.4 → Lv.5）
          </div>
        </div>

        <div className={s.sectionGroup}>
          <button className={s.profileCard} onClick={() => showToast('个人资料')}>
            <div className={s.avatar}>测</div>
            <div className={s.profileInfo}>
              <div className={s.profileName}>测试用户</div>
              <div className={s.profileId}>微信号：TestUser_2024</div>
            </div>
            <div className={s.profileRight}>
              <div className={s.qrIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="3" height="3" rx="0.5" />
                  <line x1="21" y1="14" x2="21" y2="14.01" />
                  <line x1="14" y1="21" x2="14" y2="21.01" />
                  <line x1="21" y1="21" x2="21" y2="21.01" />
                  <rect x="18" y="18" width="3" height="3" rx="0.5" />
                </svg>
              </div>
              <div className={s.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 2L8.5 6L4.5 10" /></svg>
              </div>
            </div>
          </button>
        </div>

        <div className={s.sectionGroup}>
          <button className={s.listRow} onClick={() => showToast('状态')}>
            <div className={s.rowMain}>
              <div className={s.rowLabel}><span className={s.statusPlus}>＋</span> 状态</div>
            </div>
            <div className={s.rowRight}>
              <span className={s.rowHint}>测试状态更新</span>
              <div className={s.chevron}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 2L8.5 6L4.5 10" /></svg>
              </div>
            </div>
          </button>
        </div>

        <div className={s.sectionGroup}>
          {extendedRows.map((r, i) => (
            <button
              key={r.id}
              className={`${s.listRow}${i === extendedRows.length - 1 ? ` ${s.last}` : ''}`}
              onClick={() => {
                if (r.action === 'nav-home') navigate('/home')
                else if (r.action === 'nav-lv4') navigate('/lv4')
                else if (r.action === 'reset') {
                  onReset?.()
                  showToast('已重置为初始数据')
                } else showToast(r.label)
              }}
            >
              <div className={s.rowMain}>
                <div className={s.rowIcon} style={{ color: r.iconColor }}>{r.icon}</div>
                <div className={s.rowLabel}>{r.label}</div>
              </div>
              <div className={s.rowRight}>
                <div className={s.chevron}>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 2L8.5 6L4.5 10" /></svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: 24 }} />
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
      <Lv5TabBar />
    </div>
  )
}
