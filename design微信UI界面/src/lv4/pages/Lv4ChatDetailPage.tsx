import { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import type { Lv4Message } from '../types'
import s from './Lv4ChatDetailPage.module.css'

interface Props {
  chatId: string
  chatName: string
  messages: Lv4Message[]
  onSend: (text: string) => void
  onBack: () => void
  /** 桌面端分栏模式：不显示 Header 返回（由布局控制） */
  embedded?: boolean
}

export default function Lv4ChatDetailPage({ chatId, chatName, messages, onSend, onBack, embedded }: Props) {
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, chatId])

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
    setShowEmoji(false)
    setShowMore(false)
  }

  const groups = groupByTime(messages)

  return (
    <div className={`page page-enter ${s.root}`}>
      {embedded ? (
        <div className="page-header has-border">
          <div className="ph-title">{chatName}</div>
          <div className="ph-actions">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </div>
        </div>
      ) : (
        <Header title={chatName} showBack onBack={onBack} showMenu hasBorder />
      )}

      <div className={s.chatArea} ref={scrollRef}>
        {messages.length === 0 && (
          <div className={s.empty}>暂无消息，发送第一条消息开始聊天</div>
        )}
        {groups.map((group) => (
          <div key={group.time}>
            <div className={s.timestamp}>
              <span>{group.time}</span>
            </div>
            {group.messages.map((m) => (
              <MessageRow key={m.id} message={m} onImageClick={(bg) => setLightbox(bg)} />
            ))}
          </div>
        ))}
        <div style={{ height: 16 }} />
      </div>

      {showEmoji && (
        <div className={s.panel}>
          <div className={s.emojiGrid}>
            {['😀', '😂', '🤣', '😊', '😍', '🤔', '😎', '🥳', '😢', '😡', '👍', '👎', '❤️', '🎉', '🔥', '💯', '🙏', '💪', '🌟', '✅'].map((e) => (
              <button key={e} className={s.emojiItem} onClick={() => setText((prev) => prev + e)}>
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {showMore && (
        <div className={s.panel}>
          <div className={s.moreGrid}>
            {[
              { icon: '🖼️', label: '相册' },
              { icon: '📷', label: '拍摄' },
              { icon: '📹', label: '视频通话' },
              { icon: '📍', label: '位置' },
              { icon: '🎤', label: '语音输入' },
              { icon: '📁', label: '文件' },
              { icon: '💰', label: '转账' },
              { icon: '🎁', label: '红包' },
            ].map((item) => (
              <button key={item.label} className={s.moreItem} onClick={() => setShowMore(false)}>
                <div className={s.moreIcon}>{item.icon}</div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={s.inputBar}>
        <button className={s.inputBtnDark} aria-label="语音">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 0018 0v-2h-2zM12 21v2M8 23h8" />
          </svg>
        </button>
        <input
          className={s.inputField}
          placeholder=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          onFocus={() => {
            setShowEmoji(false)
            setShowMore(false)
          }}
          aria-label="输入消息"
        />
        <button
          className={s.inputBtnLight}
          aria-label="表情"
          onClick={() => {
            setShowEmoji(!showEmoji)
            setShowMore(false)
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>
        {text.trim() ? (
          <button className={s.sendBtn} onClick={handleSend}>
            发送
          </button>
        ) : (
          <button
            className={s.inputBtnLight}
            aria-label="更多"
            onClick={() => {
              setShowMore(!showMore)
              setShowEmoji(false)
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        )}
      </div>

      {lightbox && (
        <div className={s.lightbox} onClick={() => setLightbox(null)}>
          <div className={s.lightboxImg} style={{ background: lightbox }}>
            图片预览（设计稿占位）
          </div>
        </div>
      )}
    </div>
  )
}

function MessageRow({ message, onImageClick }: { message: Lv4Message; onImageClick: (bg: string) => void }) {
  const isSelf = message.sender === 'self'
  const isImage = message.kind === 'image'
  const imageBg = message.imageBackground ?? 'linear-gradient(135deg, #E0E7FF, #C7D2FE)'

  return (
    <div className={`${s.msgRow} ${isSelf ? s.msgRowSelf : s.msgRowOther}`}>
      {!isSelf && <div className={`${s.msgAvatar} ${s.msgAvatarOther}`}>对</div>}
      <div className={`${s.bubbleCol} ${isSelf ? s.bubbleColSelf : s.bubbleColOther}`}>
        {!isSelf && message.senderName && <div className={s.senderName}>{message.senderName}</div>}
        {message.kind === 'text' && (
          <div className={isSelf ? s.bubbleSelf : s.bubbleOther}>
            <span>{message.content}</span>
          </div>
        )}
        {message.kind === 'url' && (
          <div className={isSelf ? s.bubbleSelf : s.bubbleOther}>
            <a href={message.content} target="_blank" rel="noreferrer">
              {message.content}
            </a>
          </div>
        )}
        {message.kind === 'file' && (
          <div className={`${s.fileCard} ${!isSelf ? s.fileCardOther : ''}`}>
            <div className={s.fileIcon}>
              <span>W</span>
            </div>
            <div className={s.fileInfo}>
              <div className={s.fileName}>{message.content}</div>
              <div className={s.fileSize}>{message.size}</div>
            </div>
          </div>
        )}
        {isImage && (
          <div
            className={`${s.imgPreview} ${!isSelf ? s.imgPreviewOther : ''}`}
            style={{ background: imageBg }}
            onClick={() => onImageClick(imageBg)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      {isSelf && <div className={s.msgAvatar}>我</div>}
    </div>
  )
}

function groupByTime(messages: Lv4Message[]) {
  const out: { time: string; messages: Lv4Message[] }[] = []
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
