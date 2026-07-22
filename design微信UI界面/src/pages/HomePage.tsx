import { useNavigate } from 'react-router-dom'
import s from './HomePage.module.css'

interface ProjectLevel {
  level: string
  levelName: string
  color: string
  projects: {
    name: string
    desc: string
    path: string
    status: 'done' | 'current' | 'pending'
  }[]
}

const LEVELS: ProjectLevel[] = [
  {
    level: 'Lv.1',
    levelName: '入门基础',
    color: '#22C55E',
    projects: [
      {
        name: 'HTML基础页面',
        desc: 'web前端开发实验',
        path: '',
        status: 'done',
      },
    ],
  },
  {
    level: 'Lv.2',
    levelName: '组件进阶',
    color: '#3B82F6',
    projects: [
      {
        name: '微信UI界面',
        desc: 'design微信UI界面 — React + TypeScript + Vite',
        path: '/',
        status: 'current',
      },
    ],
  },
  {
    level: 'Lv.3',
    levelName: '交互深化',
    color: '#8B5CF6',
    projects: [
      {
        name: '敬请期待',
        desc: '更多项目开发中...',
        path: '',
        status: 'pending',
      },
    ],
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={`page ${s.root}`}>
      <div className={s.header}>
        <div className={s.headerTitle}>学习项目导航</div>
        <div className={s.headerSubtitle}>study 仓库 · 前端学习路径</div>
      </div>

      <div className={`scroll-area ${s.content}`}>
        <div className={s.introCard}>
          <div className={s.introIcon}>📚</div>
          <div className={s.introText}>
            <div className={s.introTitle}>前端学习路线图</div>
            <div className={s.introDesc}>
              从基础到进阶，逐步掌握前端开发技能。点击下方项目进入学习。
            </div>
          </div>
        </div>

        {LEVELS.map((lvl) => (
          <div key={lvl.level} className={s.levelSection}>
            <div className={s.levelHeader}>
              <div className={s.levelBadge} style={{ background: lvl.color }}>
                {lvl.level}
              </div>
              <div className={s.levelName}>{lvl.levelName}</div>
              <div className={s.levelLine} />
            </div>

            <div className={s.projectList}>
              {lvl.projects.map((p) => (
                <button
                  key={p.name}
                  className={`${s.projectCard} ${p.status === 'done' ? s.cardDone : ''} ${p.status === 'current' ? s.cardCurrent : ''} ${p.status === 'pending' ? s.cardPending : ''}`}
                  onClick={() => p.path && navigate(p.path)}
                  disabled={!p.path}
                >
                  <div className={s.projectLeft}>
                    <div className={s.projectIcon}>
                      {p.status === 'done' && '✅'}
                      {p.status === 'current' && '🚀'}
                      {p.status === 'pending' && '⏳'}
                    </div>
                    <div className={s.projectInfo}>
                      <div className={s.projectName}>{p.name}</div>
                      <div className={s.projectDesc}>{p.desc}</div>
                    </div>
                  </div>
                  {p.status === 'current' && (
                    <div className={s.currentTag}>进行中</div>
                  )}
                  {p.status === 'done' && p.path && (
                    <svg className={s.chevron} viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className={s.footer}>
          <div className={s.footerText}>当前进度：2 / 6 项目</div>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: '33%' }} />
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}
