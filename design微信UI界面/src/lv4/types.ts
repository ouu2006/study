/**
 * Lv.4 全端体验 — 类型定义
 * 基于设计稿 wechat-chat-clone（5 页面：聊天列表 / 聊天详情 / 通讯录 / 发现 / 我）。
 * 在 Lv.3 基础上聚焦「全 Tab 联动 + 跨页导航 + 联系人详情」，打通完整应用闭环。
 */

export type AvatarKind = 'single' | 'group'

export interface AvatarSpec {
  kind: AvatarKind
  background?: string
  label?: string
  colors?: [string, string, string, string]
}

export type MessageKind = 'text' | 'url' | 'file' | 'image' | 'system'

export interface Lv4Message {
  id: string
  /** 展示用时间，如 "6月26日 06:36" */
  time: string
  kind: MessageKind
  content: string
  size?: string
  imageBackground?: string
  sender: 'self' | 'other'
  senderName?: string
}

export interface Lv4Chat {
  id: string
  name: string
  preview: string
  previewPrefix?: string
  time: string
  muted?: boolean
  ai?: boolean
  unread?: number
  pinned?: boolean
  avatar: AvatarSpec
  messages: Lv4Message[]
}

export interface Lv4Contact {
  id: string
  name: string
  background: string
  label: string
  /** 拼音首字母分组 */
  letter: string
  /** 关联的聊天 id（用于「发消息」跳转） */
  chatId?: string
}

export interface Lv4DiscoverFeature {
  id: string
  label: string
  iconClass: string
  icon: React.ReactNode
  right?: React.ReactNode
}
