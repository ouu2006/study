import { useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'
import Lv4ChatListPage from './pages/Lv4ChatListPage'
import Lv4ChatDetailPage from './pages/Lv4ChatDetailPage'
import Lv4ContactsPage from './pages/Lv4ContactsPage'
import Lv4DiscoverPage from './pages/Lv4DiscoverPage'
import Lv4ProfilePage from './pages/Lv4ProfilePage'
import { useLv4Chats } from './hooks/useLv4Chats'
import { useBreakpoint } from '../lv3/hooks/useMediaQuery'
import s from './Lv4App.module.css'

export default function Lv4App() {
  const chatState = useLv4Chats()
  const { isDesktop } = useBreakpoint()

  if (isDesktop) {
    return <Lv4Desktop chatState={chatState} />
  }
  return <Lv4Mobile chatState={chatState} />
}

/* ============ 移动端：手机框 + 单栏路由 ============ */
function Lv4Mobile({ chatState }: { chatState: ReturnType<typeof useLv4Chats> }) {
  const navigate = useNavigate()

  const openChat = useCallback(
    (id: string) => {
      chatState.markRead(id)
      navigate(`/lv4/chat/${id}`)
    },
    [chatState, navigate],
  )

  return (
    <PhoneFrame>
      <StatusBar />
      <Routes>
        <Route
          path="/"
          element={
            <Lv4ChatListPage
              chats={chatState.sortedChats}
              query={chatState.query}
              setQuery={chatState.setQuery}
              onOpen={openChat}
            />
          }
        />
        <Route
          path="/chat/:id"
          element={<Lv4MobileChatDetail chatState={chatState} />}
        />
        <Route path="/contacts" element={<Lv4ContactsPage />} />
        <Route path="/discover" element={<Lv4DiscoverPage />} />
        <Route path="/profile" element={<Lv4ProfilePage onReset={chatState.resetChats} />} />
        <Route path="*" element={<Lv4ChatListPage chats={chatState.sortedChats} query={chatState.query} setQuery={chatState.setQuery} onOpen={openChat} />} />
      </Routes>
    </PhoneFrame>
  )
}

function Lv4MobileChatDetail({ chatState }: { chatState: ReturnType<typeof useLv4Chats> }) {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const chat = chatState.getChat(id)

  return (
    <Lv4ChatDetailPage
      chatId={id}
      chatName={chat?.name ?? '聊天'}
      messages={chat?.messages ?? []}
      onSend={(text) => chatState.sendMessage(id, text)}
      onBack={() => navigate('/lv4')}
    />
  )
}

/* ============ 桌面端：图标栏 + 分栏布局 ============ */
type TabKey = 'chats' | 'contacts' | 'discover' | 'profile'

function Lv4Desktop({ chatState }: { chatState: ReturnType<typeof useLv4Chats> }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const activeTab: TabKey = pathname.startsWith('/lv4/contacts')
    ? 'contacts'
    : pathname.startsWith('/lv4/discover')
      ? 'discover'
      : pathname.startsWith('/lv4/profile')
        ? 'profile'
        : 'chats'

  const selectedChatId = pathname.startsWith('/lv4/chat/') ? pathname.slice('/lv4/chat/'.length) : ''
  const selectedChat = chatState.getChat(selectedChatId)

  const openChat = useCallback(
    (id: string) => {
      chatState.markRead(id)
      navigate(`/lv4/chat/${id}`)
    },
    [chatState, navigate],
  )

  const goTab = (tab: TabKey) => {
    if (tab === 'chats') navigate('/lv4')
    else navigate(`/lv4/${tab}`)
  }

  return (
    <div className={s.desktopShell}>
      {/* 左侧图标导航栏 */}
      <Rail activeTab={activeTab} onTab={goTab} />

      {/* 内容区 */}
      {activeTab === 'chats' && (
        <>
          <div className={s.middleCol}>
            <div className={s.middleHeader}>
              <span className={s.middleHeaderTitle}>微信</span>
              <div className={s.middleHeaderActions}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </div>
            </div>
            <Lv4ChatListPage
              chats={chatState.sortedChats}
              query={chatState.query}
              setQuery={chatState.setQuery}
              onOpen={openChat}
              activeId={selectedChatId}
              asSidebar
            />
          </div>
          <div className={s.mainCol}>
            {selectedChat ? (
              <Lv4ChatDetailPage
                chatId={selectedChat.id}
                chatName={selectedChat.name}
                messages={selectedChat.messages}
                onSend={(text) => chatState.sendMessage(selectedChat.id, text)}
                onBack={() => navigate('/lv4')}
                embedded
              />
            ) : (
              <DesktopPlaceholder tab={activeTab} />
            )}
          </div>
        </>
      )}

      {activeTab !== 'chats' && (
        <div className={s.mainCol}>
          {activeTab === 'contacts' && <Lv4ContactsPage />}
          {activeTab === 'discover' && <Lv4DiscoverPage />}
          {activeTab === 'profile' && <Lv4ProfilePage onReset={chatState.resetChats} />}
        </div>
      )}
    </div>
  )
}

function DesktopPlaceholder({ tab }: { tab: TabKey }) {
  const text = tab === 'chats' ? '选择一个聊天开始对话' : '暂无内容'
  return (
    <div className={s.mainCol} style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--wechat-text-tertiary)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
        <div style={{ fontSize: 14 }}>{text}</div>
        <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
          Lv.4 全端体验 · 桌面端分栏布局
        </div>
      </div>
    </div>
  )
}

/* 左侧图标栏 */
function Rail({ activeTab, onTab }: { activeTab: TabKey; onTab: (t: TabKey) => void }) {
  const navigate = useNavigate()
  const items: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: 'chats',
      label: '微信',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8.5 3A4.5 4.5 0 004 7.5v1.4c0 1.2-.5 2.3-1.3 3.1L2 12.8c-.4.4-.4 1 0 1.4l.7.8c.8.8 1.3 2 1.3 3.1V20A4.5 4.5 0 008.5 24.5h7A4.5 4.5 0 0020 20v-1.4c0-1.2.5-2.3 1.3-3.1l.7-.8c.4-.4.4-1 0-1.4l-.7-.8c-.8-.8-1.3-2-1.3-3.1V7.5A4.5 4.5 0 0015.5 3h-7z" transform="translate(0,-2) scale(0.9)" /></svg>,
    },
    {
      key: 'contacts',
      label: '通讯录',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    },
    {
      key: 'discover',
      label: '发现',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
    },
    {
      key: 'profile',
      label: '我',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
  ]

  return (
    <div className={s.iconRail}>
      <div className={s.railAvatar}>测</div>
      {items.map((it) => (
        <button
          key={it.key}
          className={`${s.railBtn} ${activeTab === it.key ? s.railBtnActive : ''}`}
          onClick={() => onTab(it.key)}
          title={it.label}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {it.icon}
            <span className={s.railLabel}>{it.label}</span>
          </div>
        </button>
      ))}
      <div className={s.railSpacer} />
      <button className={s.railBackBtn} onClick={() => navigate('/home')} title="返回学习导航">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
      </button>
    </div>
  )
}
