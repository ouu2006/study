import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import type { ChatMessage } from '../types'
import s from './ChatDetailPage.module.css'

interface Props {
  chatId: string
  chatName: string
  messages: ChatMessage[]
  onSend: (text: string) => void
}

export default function ChatDetailPage({ chatId, chatName, messages, onSend }: Props) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom whenever the message list changes.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  // Group messages by their timestamp label so we can render the centered
  // time pill above the first message of each group.
  const groups = groupByTime(messages)

  return (
    <div className={`page page-enter ${s.root}`}>
      <Header title={chatName} showBack onBack={() => navigate(-1)} showMenu hasBorder />

      <div className={`scroll-area ${s.chatArea}`} ref={scrollRef}>
        {groups.map((group) => (
          <div key={group.time}>
            <div className={s.timestamp}>
              <span>{group.time}</span>
            </div>
            {group.messages.map((m) => (
              <MessageRow key={m.id} message={m} />
            ))}
          </div>
        ))}
        <div style={{ height: 16 }} />
      </div>

      <div className={s.inputBar}>
        <div className={s.inputBtnDark} aria-label="语音">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 0018 0v-2h-2zM12 21v2M8 23h8" />
          </svg>
        </div>
        <input
          className={s.inputField}
          placeholder=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          aria-label="输入消息"
        />
        <div className={s.inputBtnLight} aria-label="表情">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        {text.trim() ? (
          <button className={s.sendBtn} onClick={handleSend}>
            发送
          </button>
        ) : (
          <div className={s.inputBtnLight} aria-label="更多">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

function MessageRow({ message }: { message: ChatMessage }) {
  return (
    <div className={s.msgRow}>
      <div className={s.bubbleCol}>
        {message.kind === 'text' && (
          <div className={s.bubbleSelf}>
            <span>{message.content}</span>
          </div>
        )}
        {message.kind === 'url' && (
          <div className={s.bubbleSelf}>
            <a href={message.content} target="_blank" rel="noreferrer">
              {message.content}
            </a>
          </div>
        )}
        {message.kind === 'file' && (
          <div className={s.fileCard}>
            <div className={s.fileIcon}>
              <span>W</span>
            </div>
            <div className={s.fileInfo}>
              <div className={s.fileName}>{message.content}</div>
              <div className={s.fileSize}>{message.size}</div>
            </div>
          </div>
        )}
        {message.kind === 'image' && (
          <div className={s.imgPreview} style={{ background: message.imageBackground }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className={s.msgAvatar}>我</div>
    </div>
  )
}

function groupByTime(messages: ChatMessage[]) {
  const out: { time: string; messages: ChatMessage[] }[] = []
  for (const m of messages) {
    const last = out[out.length - 1]
    if (last && last.time === m.time) {
      last.messages.push(m)
    } else {
      out.push({ time: m.time, messages: [m] })
    }
  }
  return out
}
