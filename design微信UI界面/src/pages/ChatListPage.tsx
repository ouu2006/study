import styled from './ChatListPage.module.css'
import Header from '../components/Header'
import TabBar from '../components/TabBar'
import Avatar from '../components/Avatar'
import type { Chat } from '../types'

interface Props {
  chats: Chat[]
  onOpen: (id: string) => void
}

export default function ChatListPage({ chats, onOpen }: Props) {
  return (
    <div className="page">
      <Header title="微信" showSearch showPlus />

      <div className={`scroll-area ${styled.list}`}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={styled.row}
            onClick={() => onOpen(chat.id)}
          >
            <div className={styled.avatarCol}>
              <Avatar spec={chat.avatar} />
              {chat.unread ? <span className="badge">{chat.unread}</span> : null}
              {chat.ai ? <span className="ai-badge">AI</span> : null}
            </div>
            <div className={styled.content}>
              <div className={styled.name}>{chat.name}</div>
              <div className={styled.preview}>
                {chat.previewPrefix ? (
                  <span className={styled.msgCount}>{chat.previewPrefix} </span>
                ) : null}
                {chat.preview}
              </div>
            </div>
            <div className={styled.meta}>
              <div className={styled.time}>
                {chat.time}
                {chat.muted ? (
                  <span className="muted-icon" aria-label="已静音">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        ))}
        <div style={{ height: 24 }} />
      </div>

      <TabBar />
    </div>
  )
}
