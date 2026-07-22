import { useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import StatusBar from './components/StatusBar'
import ChatListPage from './pages/ChatListPage'
import ChatDetailPage from './pages/ChatDetailPage'
import ContactsPage from './pages/ContactsPage'
import DiscoverPage from './pages/DiscoverPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import Lv3App from './lv3/Lv3App'
import Lv4App from './lv4/Lv4App'
import Lv5App from './lv5/Lv5App'
import { useChats } from './hooks/useChats'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Lv.5 设计稿精还原：多类型消息 + 表情面板 + 更多功能 + 桌面端分栏 */}
        <Route path="/lv5/*" element={<Lv5App />} />
        {/* Lv.4 全端体验：基于设计稿还原 + 跨页跳转 + 桌面端分栏 */}
        <Route path="/lv4/*" element={<Lv4App />} />
        {/* Lv.3 交互深化：自带多端布局（移动端手机框 / 桌面端分栏），独立于 Lv.2 手机框 */}
        <Route path="/lv3/*" element={<Lv3App />} />
        {/* Lv.2 组件进阶：手机框 + 状态栏 */}
        <Route path="*" element={<Lv2Shell />} />
      </Routes>
    </BrowserRouter>
  )
}

function Lv2Shell() {
  return (
    <PhoneFrame>
      <StatusBar />
      <AppRoutes />
    </PhoneFrame>
  )
}

function AppRoutes() {
  const { chats, getChat, markRead, sendMessage } = useChats()
  const navigate = useNavigate()

  const openChat = useCallback(
    (id: string) => {
      markRead(id)
      navigate(`/chat/${id}`)
    },
    [markRead, navigate],
  )

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<ChatListPage chats={chats} onOpen={openChat} />} />
      <Route
        path="/chat/:id"
        element={
          <ChatDetailRoute
            getChat={getChat}
            sendMessage={sendMessage}
          />
        }
      />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<ChatListPage chats={chats} onOpen={openChat} />} />
    </Routes>
  )
}

function ChatDetailRoute({
  getChat,
  sendMessage,
}: {
  getChat: (id: string) => ReturnType<typeof useChats>['chats'][number] | undefined
  sendMessage: (id: string, text: string) => void
}) {
  const { id = '' } = useParams()
  const chat = getChat(id)
  if (!chat) {
    return (
      <ChatDetailPage
        chatId={id}
        chatName="聊天"
        messages={[]}
        onSend={(text) => sendMessage(id, text)}
      />
    )
  }
  return (
    <ChatDetailPage
      chatId={chat.id}
      chatName={chat.name}
      messages={chat.messages}
      onSend={(text) => sendMessage(chat.id, text)}
    />
  )
}
