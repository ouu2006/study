import { useCallback, useEffect, useState } from 'react'
import type { Chat, ChatMessage } from '../types'
import { initialChats } from '../data/mock'

const STORAGE_KEY = 'wechat-chat-clone:chats:v1'

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialChats
    const parsed = JSON.parse(raw) as Chat[]
    // merge with initial to keep any new mock entries on code updates
    const byId = new Map<string, Chat>()
    for (const c of initialChats) byId.set(c.id, c)
    for (const c of parsed) byId.set(c.id, c)
    return initialChats.map((c) => byId.get(c.id) ?? c)
  } catch {
    return initialChats
  }
}

export function useChats() {
  const [chats, setChats] = useState<Chat[]>(() => loadChats())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
    } catch {
      /* ignore quota errors */
    }
  }, [chats])

  const getChat = useCallback(
    (id: string) => chats.find((c) => c.id === id),
    [chats],
  )

  const markRead = useCallback((id: string) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, unread: 0, previewPrefix: undefined } : c,
      ),
    )
  }, [])

  const sendMessage = useCallback((chatId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date()
    const time = `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const isUrl = /^https?:\/\//i.test(trimmed)
    const msg: ChatMessage = {
      id: `local-${Date.now()}`,
      time,
      kind: isUrl ? 'url' : 'text',
      content: trimmed,
      sender: 'self',
    }
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              preview: trimmed,
              time: now.getHours() >= 10
                ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
                : `昨天`,
              messages: [...c.messages, msg],
            }
          : c,
      ),
    )
  }, [])

  /** Resets everything back to the original mock data. */
  const resetChats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setChats(initialChats)
  }, [])

  return { chats, getChat, markRead, sendMessage, resetChats }
}
