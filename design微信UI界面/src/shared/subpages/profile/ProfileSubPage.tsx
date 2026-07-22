import { useNavigate } from 'react-router-dom'
import type { SubPageData } from '../subpagesData'

interface Props {
  data: SubPageData
  level?: string
  onReset?: () => void
  embedded?: boolean
}

export default function ProfileSubPage({ data, embedded }: Props) {
  const navigate = useNavigate()

  const isSettings = data.id === 'settings'

  return (
    <div className="page" style={{ minHeight: embedded ? 'auto' : '100vh', background: '#f4f4f4' }}>
      {!embedded && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
          background: '#fff', borderBottom: '1px solid #e0e0e0',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#576B95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            onClick={() => navigate(-1 as any)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#000' }}>{data.title}</span>
        </div>
      )}
      <div style={{ padding: 20, textAlign: 'center', color: '#888', fontSize: 14, marginTop: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          {data.id === 'service' && '🛠️'}
          {data.id === 'favorites' && '⭐'}
          {data.id === 'moments' && '📱'}
          {data.id === 'cards' && '💳'}
          {data.id === 'emoji' && '😊'}
          {data.id === 'settings' && '⚙️'}
        </div>
        <div style={{ fontSize: 18, color: '#333', marginBottom: 8 }}>{data.title}</div>
        <div style={{ color: '#999' }}>{data.description}</div>
        {isSettings && (
          <div
            style={{
              marginTop: 40, padding: '12px 0', color: '#FA5151', fontSize: 15,
              cursor: 'pointer', borderTop: '1px solid #e0e0e0',
            }}
            onClick={() => {
              // 退出登录逻辑 - 重置回首页
              navigate('/')
            }}
          >
            退出登录
          </div>
        )}
        <div style={{ marginTop: 30, color: '#bbb', fontSize: 13 }}>
          功能开发中，敬请期待~
        </div>
      </div>
    </div>
  )
}
