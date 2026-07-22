export type AvatarKind = 'single' | 'group'

export interface AvatarSpec {
  kind: AvatarKind
  /** For single avatars: a CSS background (color or gradient). */
  background?: string
  /** For single avatars: 1-2 char label. */
  label?: string
  /** For group avatars: 4 colors. */
  colors?: [string, string, string, string]
}

export interface ChatMessage {
  id: string
  /** ISO-ish display time, e.g. "6月26日 06:36" */
  time: string
  kind: 'text' | 'url' | 'file' | 'image'
  /** text/url content, file name, etc. */
  content: string
  /** for files: file size label */
  size?: string
  /** for images: a CSS background (we render a styled placeholder). */
  imageBackground?: string
  /** sender — currently only "self" is used in the mockup. */
  sender: 'self' | 'other'
}

export interface Chat {
  id: string
  name: string
  preview: string
  /** raw preview prefix to render in green, e.g. "[4条]" */
  previewPrefix?: string
  time: string
  muted?: boolean
  ai?: boolean
  unread?: number
  avatar: AvatarSpec
  messages: ChatMessage[]
}

export interface Contact {
  id: string
  name: string
  background: string
  label: string
}
