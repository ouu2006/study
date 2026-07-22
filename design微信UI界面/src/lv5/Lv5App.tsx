import { useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams, matchPath } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'
import Lv5ChatListPage from './pages/Lv5ChatListPage'
import Lv5ChatDetailPage from './pages/Lv5ChatDetailPage'
import Lv5ContactsPage from './pages/Lv5ContactsPage'
import Lv5DiscoverPage from './pages/Lv5DiscoverPage'
import Lv5ProfilePage from './pages/Lv5ProfilePage'
import SubPageRouter, { SubPageRoute } from '../shared/subpages/SubPageRouter'
import { useLv5Chats } from './hooks/useLv5Chats'
import { useBreakpoint } from '../lv3/hooks/useMediaQuery'
import s from './Lv5App.module.css'

export default function Lv5App() {
  const chatState = useLv5Chats()
  const { isDesktop } = useBreakpoint()

  if (isDesktop) {
    return <Lv5Desktop chatState={chatState} />
  }
  return <Lv5Mobile chatState={chatState} />
}

function Lv5Mobile({ chatState }: { chatState: ReturnType<typeof useLv5Chats> }) {
  const navigate = useNavigate()

  const openChat = useCallback(
    (id: string) => {
      chatState.markRead(id)
      navigate(`/chat/${id}`)
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
            <Lv5ChatListPage
              chats={chatState.sortedChats}
              query={chatState.query}
              setQuery={chatState.setQuery}
              onOpen={openChat}
            />
          }
        />
        <Route
          path="/chat/:id"
          element={<Lv5MobileChatDetail chatState={chatState} />}
        />
        <Route path="/contacts" element={<Lv5ContactsPage />} />
        <Route path="/contacts/:subId" element={<SubPageRoute category="contacts" level="" />} />
        <Route path="/discover" element={<Lv5DiscoverPage />} />
        <Route path="/discover/:subId" element={<SubPageRoute category="discover" level="" />} />
        <Route path="/profile" element={<Lv5ProfilePage onReset={chatState.resetChats} />} />
        <Route path="/profile/:subId" element={<SubPageRoute category="profile" level="" onReset={chatState.resetChats} />} />
        <Route path="*" element={<Lv5ChatListPage chats={chatState.sortedChats} query={chatState.query} setQuery={chatState.setQuery} onOpen={openChat} />} />
      </Routes>
    </PhoneFrame>
  )
}

function Lv5MobileChatDetail({ chatState }: { chatState: ReturnType<typeof useLv5Chats> }) {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const chat = chatState.getChat(id)

  return (
    <Lv5ChatDetailPage
      chatId={id}
      chatName={chat?.name ?? '聊天'}
      messages={chat?.messages ?? []}
      onSend={(text) => chatState.sendMessage(id, text)}
      onBack={() => navigate('/')}
    />
  )
}

type TabKey = 'chats' | 'contacts' | 'discover' | 'profile'

function Lv5Desktop({ chatState }: { chatState: ReturnType<typeof useLv5Chats> }) {
  const { pathname: rawPath } = useLocation()
  const navigate = useNavigate()

  // basename 去掉后才是真正的路由路径
  const pathname = rawPath.replace(/^\/lab\/wechat-ui/, '') || '/'

  const activeTab: TabKey = pathname.startsWith('/contacts')
    ? 'contacts'
    : pathname.startsWith('/discover')
      ? 'discover'
      : pathname.startsWith('/profile')
        ? 'profile'
        : 'chats'

  const selectedChatId = pathname.startsWith('/chat/') ? pathname.slice('/chat/'.length) : ''
  const selectedChat = chatState.getChat(selectedChatId)

  const openChat = useCallback(
    (id: string) => {
      chatState.markRead(id)
      navigate(`/chat/${id}`)
    },
    [chatState, navigate],
  )

  const goTab = (tab: TabKey) => {
    if (tab === 'chats') navigate('/')
    else navigate(`/${tab}`)
  }

  // 检测子路由
  const subMatch = matchPath('/:tab/:subId', pathname)
  const subTab = subMatch?.params?.tab as string | undefined
  const subId = subMatch?.params?.subId as string | undefined

  return (
    <div className={s.desktopShell}>
      <Rail activeTab={activeTab} onTab={goTab} />

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
            <Lv5ChatListPage
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
              <Lv5ChatDetailPage
                chatId={selectedChat.id}
                chatName={selectedChat.name}
                messages={selectedChat.messages}
                onSend={(text) => chatState.sendMessage(selectedChat.id, text)}
                onBack={() => navigate('/')}
                embedded
              />
            ) : (
              <DesktopPlaceholder tab={activeTab} />
            )}
          </div>
        </>
      )}

      {activeTab === 'contacts' && (
        <>
          <div className={s.middleCol}>
            <div className={s.middleHeader}>
              <span className={s.middleHeaderTitle}>通讯录</span>
              <div className={s.middleHeaderActions}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </div>
            </div>
            <Lv5ContactsPage asSidebar onOpenChat={openChat} />
          </div>
          <div className={s.mainCol}>
            {subMatch && subTab === 'contacts' && subId ? (
              <SubPageRouter category="contacts" subId={subId} level="" embedded />
            ) : (
              <DesktopPlaceholder tab={activeTab} />
            )}
          </div>
        </>
      )}

      {activeTab === 'discover' && (
        <div className={s.mainCol} style={{ width: '100%' }}>
          {subMatch && subTab === 'discover' && subId ? (
            <SubPageRouter category="discover" subId={subId} level="" embedded />
          ) : (
            <Lv5DiscoverPage />
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className={s.mainCol} style={{ width: '100%' }}>
          {subMatch && subTab === 'profile' && subId ? (
            <SubPageRouter category="profile" subId={subId} level="" embedded onReset={chatState.resetChats} />
          ) : (
            <Lv5ProfilePage onReset={chatState.resetChats} />
          )}
        </div>
      )}
    </div>
  )
}

function DesktopPlaceholder({ tab }: { tab: TabKey }) {
  const text = tab === 'chats' ? '选择一个聊天开始对话' : '暂无内容'
  return (
    <div className={s.placeholder}>
      <div className={s.placeholderInner}>
        <div className={s.placeholderEmoji}>💬</div>
        <div className={s.placeholderText}>{text}</div>
        <div className={s.placeholderSub}>
          Lv.5 设计稿精还原 · 桌面端分栏布局
        </div>
      </div>
    </div>
  )
}

function Rail({ activeTab, onTab }: { activeTab: TabKey; onTab: (t: TabKey) => void }) {
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
    </div>
  )
}
