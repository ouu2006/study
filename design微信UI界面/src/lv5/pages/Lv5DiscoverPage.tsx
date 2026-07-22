import { useNavigate } from 'react-router-dom'
import Lv5TabBar from '../components/Lv5TabBar'
import { DISCOVER_FEATURES } from '../data/mock'
import s from './Lv5DiscoverPage.module.css'

const ICON_CLASS_MAP: Record<string, string> = {
  moments: s.momentsIcon,
  channels: s.channelsIcon,
  live: s.liveIcon,
  scan: s.scanIcon,
  listen: s.listenIcon,
  look: s.lookIcon,
  search: s.searchIconFeat,
  nearby: s.nearbyIcon,
  game: s.gameIcon,
  miniapp: s.miniappIcon,
}

export default function Lv5DiscoverPage() {
  const navigate = useNavigate()

  const firstGroup = DISCOVER_FEATURES.slice(0, 3)
  const secondGroup = DISCOVER_FEATURES.slice(3, 7)
  const thirdGroup = DISCOVER_FEATURES.slice(7)

  return (
    <div className={`page ${s.root}`}>
      <div className={s.header}>
        <div className={s.headerTitle}>发现</div>
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

      <div className={s.list}>
        <div className={s.section}>
          {firstGroup.map((f, i) => (
            <button
              key={f.id}
              className={`${s.row}${i === firstGroup.length - 1 ? ` ${s.noBorder}` : ''}`}
              onClick={() => navigate(`/discover/${f.id}`)}
            >
              <div className={s.iconWrap}>
                <div className={`${s.icon} ${ICON_CLASS_MAP[f.iconClass] || ''}`}>
                  {f.icon}
                </div>
              </div>
              <div className={s.label}>{f.label}</div>
              <div className={s.right}>
                {f.rightContent}
                <svg className={s.chevron} viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className={s.section}>
          {secondGroup.map((f, i) => (
            <button
              key={f.id}
              className={`${s.row}${i === secondGroup.length - 1 ? ` ${s.noBorder}` : ''}`}
              onClick={() => navigate(`/discover/${f.id}`)}
            >
              <div className={s.iconWrap}>
                <div className={`${s.icon} ${ICON_CLASS_MAP[f.iconClass] || ''}`}>
                  {f.icon}
                </div>
              </div>
              <div className={s.label}>{f.label}</div>
              <div className={s.right}>
                {f.rightContent}
                <svg className={s.chevron} viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className={s.section}>
          {thirdGroup.map((f, i) => (
            <button
              key={f.id}
              className={`${s.row}${i === thirdGroup.length - 1 ? ` ${s.noBorder}` : ''}`}
              onClick={() => navigate(`/discover/${f.id}`)}
            >
              <div className={s.iconWrap}>
                <div className={`${s.icon} ${ICON_CLASS_MAP[f.iconClass] || ''}`}>
                  {f.icon}
                </div>
              </div>
              <div className={s.label}>{f.label}</div>
              <div className={s.right}>
                {f.rightContent}
                <svg className={s.chevron} viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: 24 }} />
      </div>

      <Lv5TabBar />
    </div>
  )
}
