import { useState } from 'react'
import Header from '../../components/Header'
import Lv3TabBar from '../components/Lv3TabBar'
import s from './Lv3DiscoverPage.module.css'

interface Feature {
  label: string
  iconClass: string
  icon: React.ReactNode
  right?: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    label: '朋友圈',
    iconClass: s.momentsIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3.5" stroke="white" strokeWidth="1.6" />
        <path d="M2 18.5c0-3.5 3.1-6.5 7-6.5s7 3 7 6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 8l-4 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="8" r="2" fill="white" />
      </svg>
    ),
    right: (
      <div className={s.avatarThumbWrap}>
        <div className={s.avatarThumb} style={{ background: '#14B8A6' }} />
        <div className={`${s.redDot} ${s.small}`} />
      </div>
    ),
  },
  {
    label: '视频号',
    iconClass: s.channelsIcon,
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M6 12h4l2-3 2 6 2-3h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    right: (
      <div className={s.rightAvatarsText}>
        <div className={s.avatarThumbSm} style={{ background: '#F472B6' }} />
        <span className={s.rightText}>测试用户A</span>
        <div className={s.redDot} />
      </div>
    ),
  },
  {
    label: '直播',
    iconClass: s.liveIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="white" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    right: (
      <div className={s.rightAvatarsText}>
        <span className={s.rightText}>测试科技大学直播中</span>
        <div className={s.avatarThumbXs} style={{ background: '#3B82F6' }} />
      </div>
    ),
  },
  {
    label: '扫一扫',
    iconClass: s.scanIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 8V6a2 2 0 012-2h2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 4h2a2 2 0 012 2v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 16v2a2 2 0 01-2 2h-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 20H6a2 2 0 01-2-2v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: '听一听',
    iconClass: s.listenIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5l12-2v13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="1.8" />
        <circle cx="18" cy="16" r="3" stroke="white" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: '看一看',
    iconClass: s.lookIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="white" />
        <path d="M12 2l2.5 5.5L20 12l-5.5 2.5L12 20l-2.5-5.5L4 12l5.5-2.5z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: '搜一搜',
    iconClass: s.searchIconFeat,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="1.8" />
        <line x1="16" y1="16" x2="20" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: '附近',
    iconClass: s.nearbyIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3.2" stroke="white" strokeWidth="1.6" />
        <path d="M2 18c0-3.8 3.1-7 7-7s7 3.2 7 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="8" r="2.8" stroke="white" strokeWidth="1.6" />
        <path d="M14 18c0-2.5.8-3.5 3-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: '游戏',
    iconClass: s.gameIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12l2 6-4 4v5H10v-5L6 10z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <path d="M9 16l-1 3M15 16l1 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="9" r="1" fill="white" />
        <circle cx="14" cy="9" r="1" fill="white" />
      </svg>
    ),
    right: (
      <div className={s.rightAvatarsText}>
        <span className={s.rightText}>你的朋友昨日有动态</span>
        <div className={s.avatarThumbXs} style={{ background: '#22C55E' }} />
        <div className={s.redDot} />
      </div>
    ),
  },
  {
    label: '小程序',
    iconClass: s.miniappIcon,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="white" strokeWidth="1.6" />
        <circle cx="16" cy="13" r="3" stroke="white" strokeWidth="1.6" />
        <path d="M12.5 10.5l2 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Lv3DiscoverPage() {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (label: string) => {
    setToast(`「${label}」功能开发中`)
    window.setTimeout(() => setToast(null), 1400)
  }

  return (
    <div className="page">
      <Header title="发现" showSearch showPlus />
      <div className={`scroll-area ${s.list}`}>
        {FEATURES.map((f, i) => (
          <button
            key={f.label}
            className={`${s.row}${i === FEATURES.length - 1 ? ` ${s.noBorder}` : ''}`}
            onClick={() => showToast(f.label)}
          >
            <div className={s.iconWrap}>
              <div className={`${s.icon} ${f.iconClass}`}>{f.icon}</div>
            </div>
            <div className={s.label}>{f.label}</div>
            <div className={s.right}>
              {f.right}
              <svg className={s.chevron} viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="var(--wechat-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
        <div style={{ height: 24 }} />
      </div>
      {toast && <div className={s.toast}>{toast}</div>}
      <Lv3TabBar />
    </div>
  )
}
