export type AvatarKind = 'single' | 'group'

export interface AvatarSpec {
  kind: AvatarKind
  background?: string
  label?: string
  colors?: [string, string, string, string]
}

export type MessageKind = 'text' | 'url' | 'file' | 'image' | 'system'

export interface Lv5Message {
  id: string
  time: string
  kind: MessageKind
  content: string
  size?: string
  imageBackground?: string
  sender: 'self' | 'other'
  senderName?: string
  fileIcon?: string
  fileIconBg?: string
}

export interface Lv5Chat {
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
  messages: Lv5Message[]
}

export interface Lv5Contact {
  id: string
  name: string
  background: string
  label: string
  letter: string
  chatId?: string
}

export interface Lv5ContactCategory {
  id: string
  label: string
  bg: string
  icon: React.ReactNode
}

export interface Lv5DiscoverFeature {
  id: string
  label: string
  iconClass: string
  iconBg: string
  icon: React.ReactNode
  rightContent?: React.ReactNode
  border?: boolean
}

export interface Lv5ProfileRow {
  id: string
  label: string
  icon: React.ReactNode
  iconColor: string
  hint?: string
}
