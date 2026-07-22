import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lv3Chat, Lv3Message } from '../types'
import { initialLv3Chats } from '../data/mock'

const STORAGE_KEY = 'wechat-lv3:chats:v1'

function loadChats(): Lv3Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialLv3Chats
    const parsed = JSON.parse(raw) as Lv3Chat[]
    const byId = new Map<string, Lv3Chat>()
    for (const c of initialLv3Chats) byId.set(c.id, c)
    for (const c of parsed) byId.set(c.id, c)
    return initialLv3Chats.map((c) => byId.get(c.id) ?? c)
  } catch {
    return initialLv3Chats
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

export function useLv3Chats() {
  const [chats, setChats] = useState<Lv3Chat[]>(() => loadChats())
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
    const msg: Lv3Message = {
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

  /** 删除聊天（长按菜单 / 滑动删除） */
  const deleteChat = useCallback((id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id))
  }, [])

  /** 置顶 / 取消置顶 */
  const togglePin = useCallback((id: string) => {
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)))
  }, [])

  /** 静音 / 取消静音 */
  const toggleMute = useCallback((id: string) => {
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, muted: !c.muted } : c)))
  }, [])

  /** 标为已读 / 未读 */
  const toggleRead = useCallback((id: string) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, unread: c.unread ? 0 : 1, previewPrefix: c.unread ? undefined : '[1条]' }
          : c,
      ),
    )
  }, [])

  /** 重置为初始 mock 数据 */
  const resetChats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setChats(initialLv3Chats)
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
    deleteChat,
    togglePin,
    toggleMute,
    toggleRead,
    resetChats,
  }
}
