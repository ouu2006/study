/**
 * Lv.3 交互深化 — 类型定义
 * 在 Lv.2 基础上扩展：置顶(pinned)、消息发送者名称(senderName)、
 * 联系人分组(letter)等，用于支撑搜索、长按菜单、多端分栏等进阶交互。
 */

export type AvatarKind = 'single' | 'group'

export interface AvatarSpec {
  kind: AvatarKind
  background?: string
  label?: string
  colors?: [string, string, string, string]
}

export type MessageKind = 'text' | 'url' | 'file' | 'image' | 'system'

export interface Lv3Message {
  id: string
  /** 展示用时间，如 "6月26日 06:36" */
  time: string
  kind: MessageKind
  content: string
  size?: string
  imageBackground?: string
  sender: 'self' | 'other'
  /** 群聊里发送者名称（用于预览与气泡上方昵称） */
  senderName?: string
}

export interface Lv3Chat {
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
  messages: Lv3Message[]
}

export interface Lv3Contact {
  id: string
  name: string
  background: string
  label: string
  /** 拼音首字母分组 */
  letter: string
}
