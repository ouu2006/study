export interface SubPageData {
  id: string
  title: string
  category: 'discover' | 'contacts' | 'profile'
  description?: string
  content?: string
}

export const subpagesData: SubPageData[] = [
  // === 发现 ===
  { id: 'moments', title: '朋友圈', category: 'discover', description: '分享生活点滴' },
  { id: 'channels', title: '视频号', category: 'discover', description: '精彩视频内容' },
  { id: 'live', title: '直播', category: 'discover', description: '实时直播互动' },
  { id: 'scan', title: '扫一扫', category: 'discover', description: '扫码识别' },
  { id: 'listen', title: '听一听', category: 'discover', description: '音乐与音频' },
  { id: 'look', title: '看一看', category: 'discover', description: '精选资讯' },
  { id: 'search', title: '搜一搜', category: 'discover', description: '搜索服务' },
  { id: 'nearby', title: '附近', category: 'discover', description: '发现身边有趣的人与事' },
  { id: 'game', title: '游戏', category: 'discover', description: '休闲小游戏' },
  { id: 'miniapp', title: '小程序', category: 'discover', description: '免安装应用' },

  // === 通讯录 ===
  { id: 'new-friend', title: '新的朋友', category: 'contacts', description: '好友申请与推荐' },
  { id: 'chat-only', title: '仅聊天的朋友', category: 'contacts', description: '仅可发送消息' },
  { id: 'group-chat', title: '群聊', category: 'contacts', description: '群组列表' },
  { id: 'tag', title: '标签', category: 'contacts', description: '联系人标签管理' },
  { id: 'official', title: '公众号', category: 'contacts', description: '关注的公众号' },
  { id: 'service', title: '服务号', category: 'contacts', description: '服务号消息' },

  // === 我 ===
  { id: 'service', title: '服务', category: 'profile', description: '生活服务' },
  { id: 'favorites', title: '收藏', category: 'profile', description: '收藏的内容' },
  { id: 'moments', title: '朋友圈', category: 'profile', description: '我的朋友圈动态' },
  { id: 'cards', title: '卡包', category: 'profile', description: '优惠券与会员卡' },
  { id: 'emoji', title: '表情', category: 'profile', description: '表情管理' },
  { id: 'settings', title: '设置', category: 'profile', description: '账户与隐私设置' },
]

export function getSubPage(id: string, category: string): SubPageData | undefined {
  return subpagesData.find(p => p.id === id && p.category === category)
}
