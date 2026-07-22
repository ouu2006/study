import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Lv3TabBar from '../components/Lv3TabBar'
import s from './Lv3ProfilePage.module.css'

interface Row {
  label: string
  color: string
  hint?: string
  icon: React.ReactNode
  action?: 'nav-home' | 'nav-lv2' | 'reset'
}

const SERVICE_ROWS: Row[] = [
  {
    label: '服务',
    color: '#5B7DFF',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H4V9h16v6zM6 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 0h8v3h-8v-3z" /></svg>,
  },
  {
    label: '收藏',
    color: '#F5A623',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>,
  },
  {
    label: '朋友圈',
    color: '#5B7DFF',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    label: '卡包',
    color: '#34C759',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h16v12zm-2-10H6v8h12V8zm-4 2h2v4h-2v-4z" /></svg>,
  },
  {
    label: '表情',
    color: '#F5A623',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>,
  },
  {
    label: '设置',
    color: '#8E8E93',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  },
  {
    label: '返回 Lv.2 微信UI界面',
    color: '#3B82F6',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>,
    action: 'nav-lv2',
  },
  {
    label: '学习项目导航',
    color: '#667eea',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>,
    action: 'nav-home',
  },
  {
    label: '重置 Lv.3 数据',
    color: '#FA5151',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>,
    action: 'reset',
  },
]

export default function Lv3ProfilePage({ onReset }: { onReset?: () => void }) {
  const navigate = useNavigate()
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (label: string) => {
    setToast(label)
    window.setTimeout(() => setToast(null), 1400)
  }

  return (
    <div className="page">
      <Header
        align="right"
        rightSlot={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        }
      />

      <div className={`scroll-area ${s.content}`}>
        {/* Lv.3 等级连接卡片 */}
        <div className={s.levelCard} onClick={() => navigate('/home')}>
          <span className={s.levelBadge}>Lv.3 交互深化</span>
          <div className={s.levelTitle}>微信UI界面 · 交互深化版</div>
          <div className={s.levelDesc}>
            基于设计稿还原，新增搜索、左滑操作、长按菜单、置顶/静音、消息发送，以及桌面端分栏多端适配。
          </div>
          <div className={s.levelLink}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            查看完整学习路线图（Lv.1 → Lv.2 → Lv.3）
          </div>
        </div>

        {/* 个人资料卡片 */}
        <div className={s.sectionGroup}>
          <button className={s.profileCard} onClick={() => showToast('个人资料')}>
            <div className={s.avatar} style={{ background: 'linear-gradient(135deg, #6366F1, #A855F7)' }}>
              <span className={s.avatarText}>测</span>
            </div>
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

        {/* 状态 */}
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

        {/* 设置列表 */}
        <div className={s.sectionGroup}>
          {SERVICE_ROWS.map((r, i) => (
            <button
              key={r.label}
              className={`${s.listRow}${i === SERVICE_ROWS.length - 1 ? ` ${s.last}` : ''}`}
              onClick={() => {
                if (r.action === 'nav-home') navigate('/home')
                else if (r.action === 'nav-lv2') navigate('/')
                else if (r.action === 'reset') {
                  onReset?.()
                  showToast('已重置为初始数据')
                } else showToast(r.label)
              }}
            >
              <div className={s.rowMain}>
                <div className={s.rowIcon} style={{ color: r.color }}>{r.icon}</div>
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
      <Lv3TabBar />
    </div>
  )
}
