import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lv5Chat, Lv5Message } from '../types'
import { initialLv5Chats } from '../data/mock'

const STORAGE_KEY = 'wechat-lv5:chats:v1'

function loadChats(): Lv5Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialLv5Chats
    const parsed = JSON.parse(raw) as Lv5Chat[]
    const byId = new Map<string, Lv5Chat>()
    for (const c of initialLv5Chats) byId.set(c.id, c)
    for (const c of parsed) byId.set(c.id, c)
    return initialLv5Chats.map((c) => byId.get(c.id) ?? c)
  } catch {
    return initialLv5Chats
  }
}

function nowTime(): string {
  const now = new Date()
  return `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

function nowShort(): string {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

export function useLv5Chats() {
  const [chats, setChats] = useState<Lv5Chat[]>(() => loadChats())
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
    } catch {
      /* ignore */
    }
  }, [chats])

  const getChat = useCallback((id: string) => chats.find((c) => c.id === id), [chats])

  const markRead = useCallback((id: string) => {
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0, previewPrefix: undefined } : c)),
    )
  }, [])

  const sendMessage = useCallback((chatId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const isUrl = /^https?:\/\//i.test(trimmed)
    const msg: Lv5Message = {
      id: `local-${Date.now()}`,
      time: nowTime(),
      kind: isUrl ? 'url' : 'text',
      content: trimmed,
      sender: 'self',
    }
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? { ...c, preview: trimmed, time: nowShort(), messages: [...c.messages, msg] }
          : c,
      ),
    )
  }, [])

  const resetChats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setChats(initialLv5Chats)
  }, [])

  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chats
    return chats.filter(
      (c) => c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q),
    )
  }, [chats, query])

  const sortedChats = useMemo(() => {
    return [...filteredChats].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))
  }, [filteredChats])

  return {
    chats,
    sortedChats,
    query,
    setQuery,
    getChat,
    markRead,
    sendMessage,
    resetChats,
  }
}
