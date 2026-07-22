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
        status: 'done',
      },
    ],
  },
  {
    level: 'Lv.3',
    levelName: '交互深化',
    color: '#8B5CF6',
    projects: [
      {
        name: '微信UI交互深化',
        desc: '基于设计稿还原 · 搜索/左滑/长按/置顶/静音 · 桌面端分栏多端适配',
        path: '/lv3',
        status: 'done',
      },
    ],
  },
  {
    level: 'Lv.4',
    levelName: '全端体验',
    color: '#EC4899',
    projects: [
      {
        name: '微信UI全端体验',
        desc: '设计稿完整还原 · 聊天/通讯录跨页跳转 · 桌面端分栏 + 平板/移动多端适配',
        path: '/lv4',
        status: 'done',
      },
    ],
  },
  {
    level: 'Lv.5',
    levelName: '设计稿精还原',
    color: '#F97316',
    projects: [
      {
        name: '微信UI设计稿精还原',
        desc: '多类型消息（文字/链接/文件/图片）+ 表情面板 + 更多功能面板 + 桌面端分栏多端适配',
        path: '/lv5',
        status: 'current',
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
          <div className={s.footerText}>当前进度：5 / 7 项目</div>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: '71.4%' }} />
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}
