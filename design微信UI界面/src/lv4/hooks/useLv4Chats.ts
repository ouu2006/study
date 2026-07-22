import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lv4Chat, Lv4Message } from '../types'
import { initialLv4Chats } from '../data/mock'

const STORAGE_KEY = 'wechat-lv4:chats:v1'

function loadChats(): Lv4Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialLv4Chats
    const parsed = JSON.parse(raw) as Lv4Chat[]
    const byId = new Map<string, Lv4Chat>()
    for (const c of initialLv4Chats) byId.set(c.id, c)
    for (const c of parsed) byId.set(c.id, c)
    return initialLv4Chats.map((c) => byId.get(c.id) ?? c)
  } catch {
    return initialLv4Chats
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

export function useLv4Chats() {
  const [chats, setChats] = useState<Lv4Chat[]>(() => loadChats())
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
    const msg: Lv4Message = {
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

  /** 重置为初始 mock 数据 */
  const resetChats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setChats(initialLv4Chats)
  }, [])

  /** 按搜索关键字过滤（匹配名称或预览） */
  const filteredChats = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chats
    return chats.filter(
      (c) => c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q),
    )
  }, [chats, query])

  /** 排序：置顶在前，其余按原顺序 */
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
