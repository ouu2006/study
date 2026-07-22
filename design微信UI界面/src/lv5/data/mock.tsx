import type { Lv5Chat, Lv5Contact, Lv5ContactCategory, Lv5DiscoverFeature, Lv5ProfileRow } from '../types'

export const initialLv5Chats: Lv5Chat[] = [
  {
    id: 'file-transfer',
    name: '文件传输助手',
    preview: 'https://ozxowx.app/campus/',
    time: '22:46',
    pinned: true,
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #2B579A, #3B82F6)', label: 'W' },
    messages: [
      { id: 'm1', time: '7月22日 22:46', kind: 'url', content: 'https://ozxowx.app/', sender: 'self' },
      { id: 'm2', time: '7月22日 22:46', kind: 'url', content: 'https://ozxowx.app/lab/', sender: 'self' },
      { id: 'm3', time: '7月22日 22:46', kind: 'url', content: 'https://ozxowx.app/lab/web-frontend/', sender: 'self' },
      { id: 'm4', time: '7月22日 22:46', kind: 'url', content: 'https://ozxowx.app/lab/wechat-ui/', sender: 'self' },
      { id: 'm5', time: '7月22日 22:46', kind: 'url', content: 'https://ozxowx.app/campus/', sender: 'self' },
    ],
  },
  {
    id: 'family',
    name: '测试家庭群',
    preview: '测试家长A: 收到了',
    time: '16:44',
    muted: true,
    avatar: { kind: 'single', background: '#F472B6', label: 'T' },
    messages: [
      { id: 'f1', time: '16:40', kind: 'text', content: '今晚回家吃饭吗？', sender: 'other', senderName: '测试家长A' },
      { id: 'f2', time: '16:42', kind: 'text', content: '回的，稍晚一点', sender: 'self' },
      { id: 'f3', time: '16:44', kind: 'text', content: '收到了', sender: 'other', senderName: '测试家长A' },
    ],
  },
  {
    id: 'fe-group',
    name: '前端技术交流群',
    preview: '管理员-测试: 本周五下午3点技术分享会...',
    time: '昨天',
    muted: true,
    avatar: { kind: 'group', colors: ['#F97316', '#3B82F6', '#22C55E', '#A855F7'] },
    messages: [
      { id: 'fe1', time: '昨天 14:20', kind: 'text', content: '本周五下午3点技术分享会，主题是 React 19 新特性', sender: 'other', senderName: '管理员-测试' },
      { id: 'fe2', time: '昨天 14:25', kind: 'text', content: '收到，准时参加', sender: 'self' },
    ],
  },
  {
    id: 'project-group',
    name: '项目协作群',
    preview: '测试员B: [文件] 新版设计稿已上传',
    time: '周六',
    avatar: { kind: 'group', colors: ['#EF4444', '#06B6D4', '#EAB308', '#EC4899'] },
    messages: [
      { id: 'p1', time: '周六 10:00', kind: 'file', content: '新版设计稿v2.fig', size: '12.4 MB', sender: 'other', senderName: '测试员B', fileIcon: 'F', fileIconBg: '#A855F7' },
    ],
  },
  {
    id: 'ai-bot',
    name: '智能助手Pro',
    preview: '✅ 任务已完成 — 本周报告已生...',
    time: '7月12日',
    ai: true,
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #6366F1, #A855F7)', label: 'A' },
    messages: [
      { id: 'a1', time: '7月12日 09:00', kind: 'text', content: '✅ 任务已完成 — 本周报告已生成，请查收附件。', sender: 'other', senderName: '智能助手Pro' },
    ],
  },
  {
    id: 'dorm',
    name: '室友群',
    preview: '测试室友: 好的没问题',
    time: '7月11日',
    muted: true,
    avatar: { kind: 'single', background: '#22C55E', label: 'D' },
    messages: [
      { id: 'd1', time: '7月11日 22:10', kind: 'text', content: '明天谁去拿快递？', sender: 'other', senderName: '测试室友' },
      { id: 'd2', time: '7月11日 22:12', kind: 'text', content: '好的没问题，我去', sender: 'self' },
    ],
  },
  {
    id: 'book-club',
    name: '读书会小伙伴',
    preview: '测试书友: 下周读第三章',
    time: '6月6日',
    muted: true,
    avatar: { kind: 'group', colors: ['#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444'] },
    messages: [
      { id: 'b1', time: '6月6日 20:30', kind: 'text', content: '下周读第三章', sender: 'other', senderName: '测试书友' },
    ],
  },
  {
    id: 'xiaoming',
    name: '小明同学',
    preview: '哈哈这个太有趣了',
    time: '3月15日',
    avatar: { kind: 'single', background: '#3B82F6', label: 'L' },
    messages: [
      { id: 'x1', time: '3月15日 15:00', kind: 'text', content: '哈哈这个太有趣了', sender: 'other', senderName: '小明' },
    ],
  },
  {
    id: 'deal-group',
    name: '优惠信息分享群',
    preview: '测试卖家: 这个价格很划算',
    previewPrefix: '[4条]',
    time: '16:47',
    muted: true,
    unread: 4,
    avatar: { kind: 'group', colors: ['#D946EF', '#0EA5E9', '#F97316', '#10B981'] },
    messages: [
      { id: 'g1', time: '16:47', kind: 'text', content: '这个价格很划算，赶紧上车', sender: 'other', senderName: '测试卖家' },
    ],
  },
  {
    id: 'subscribe',
    name: '订阅号消息',
    preview: '测试日报: 今日科技新闻速览...',
    previewPrefix: '[3条]',
    time: '16:44',
    unread: 3,
    avatar: { kind: 'single', background: '#0D9488', label: '订' },
    messages: [
      { id: 's1', time: '16:44', kind: 'text', content: '今日科技新闻速览：AI、芯片、新能源三大赛道齐发力', sender: 'other', senderName: '测试日报' },
    ],
  },
  {
    id: 'fitness',
    name: '健身打卡群',
    preview: '坚持运动，今天跑步5公里💪',
    time: '16:40',
    avatar: { kind: 'single', background: '#F97316', label: 'F' },
    messages: [
      { id: 'fit1', time: '16:40', kind: 'text', content: '坚持运动，今天跑步5公里💪', sender: 'self' },
    ],
  },
]

export const initialLv5Contacts: Lv5Contact[] = [
  { id: 'c1', name: '阿强测试', background: '#F472B6', label: '阿', letter: 'A' },
  { id: 'c2', name: '安迪朋友', background: '#3B82F6', label: '安', letter: 'A' },
  { id: 'c3', name: '爱心志愿者', background: '#22C55E', label: '爱', letter: 'A' },
  { id: 'c4', name: '白云悠悠', background: '#F97316', label: '白', letter: 'B' },
  { id: 'c5', name: '北极光旅行', background: '#EF4444', label: '北', letter: 'B' },
  { id: 'c6', name: '春风十里', background: '#06B6D4', label: '春', letter: 'C' },
  { id: 'c7', name: '测试家长A', background: '#F472B6', label: '测', letter: 'C', chatId: 'family' },
  { id: 'c8', name: '测试书友', background: '#14B8A6', label: '测', letter: 'C', chatId: 'book-club' },
  { id: 'c9', name: '测试室友', background: '#22C55E', label: '测', letter: 'C', chatId: 'dorm' },
  { id: 'c10', name: '测试卖家', background: '#D946EF', label: '测', letter: 'C', chatId: 'deal-group' },
  { id: 'c11', name: '叮当猫', background: '#F59E0B', label: '叮', letter: 'D' },
  { id: 'c12', name: '多多同学', background: '#8B5CF6', label: '多', letter: 'D' },
  { id: 'c13', name: '风信子', background: '#0EA5E9', label: '风', letter: 'F' },
  { id: 'c14', name: '管理员-测试', background: '#A855F7', label: '管', letter: 'G', chatId: 'fe-group' },
  { id: 'c15', name: '哈哈先生', background: '#EC4899', label: '哈', letter: 'H' },
  { id: 'c16', name: '小明同学', background: '#3B82F6', label: '小', letter: 'X', chatId: 'xiaoming' },
  { id: 'c17', name: '小甜甜', background: '#F472B6', label: '小', letter: 'X' },
  { id: 'c18', name: '智能助手Pro', background: 'linear-gradient(135deg, #6366F1, #A855F7)', label: 'AI', letter: 'Z', chatId: 'ai-bot' },
]

export const CONTACT_CATEGORIES: Lv5ContactCategory[] = [
  {
    id: 'new-friend',
    label: '新的朋友',
    bg: '#F97316',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    id: 'chat-only',
    label: '仅聊天的朋友',
    bg: '#F97316',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'group-chat',
    label: '群聊',
    bg: '#22C55E',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: 'tag',
    label: '标签',
    bg: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'official',
    label: '公众号',
    bg: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <line x1="10" y1="6" x2="18" y2="6" />
        <line x1="10" y1="10" x2="18" y2="10" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: 'service',
    label: '服务号',
    bg: '#60A5FA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

export const DISCOVER_FEATURES: Lv5DiscoverFeature[] = [
  {
    id: 'moments',
    label: '朋友圈',
    iconClass: 'moments',
    iconBg: 'linear-gradient(135deg, #2B579A, #3B82F6)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3.5" stroke="white" strokeWidth="1.6" />
        <path d="M2 18.5c0-3.5 3.1-6.5 7-6.5s7 3 7 6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 8l-4 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="8" r="2" fill="white" />
      </svg>
    ),
    rightContent: (
      <>
        <div style={{ position: 'relative', width: 28, height: 28 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#14B8A6' }} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, background: '#FA5151', borderRadius: '50%' }} />
        </div>
      </>
    ),
  },
  {
    id: 'channels',
    label: '视频号',
    iconClass: 'channels',
    iconBg: 'linear-gradient(135deg, #F59E0B, #F97316)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 12h4l2-3 2 6 2-3h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    rightContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F472B6' }} />
        <span style={{ fontSize: 13, color: '#888888' }}>测试用户A</span>
        <div style={{ width: 8, height: 8, background: '#FA5151', borderRadius: '50%' }} />
      </div>
    ),
  },
  {
    id: 'live',
    label: '直播',
    iconClass: 'live',
    iconBg: '#FA5151',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="white" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    rightContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 13, color: '#888888' }}>测试科技大学直播中</span>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#3B82F6' }} />
      </div>
    ),
  },
  {
    id: 'scan',
    label: '扫一扫',
    iconClass: 'scan',
    iconBg: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 8V6a2 2 0 012-2h2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 4h2a2 2 0 012 2v2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 16v2a2 2 0 01-2 2h-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 20H6a2 2 0 01-2-2v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'listen',
    label: '听一听',
    iconClass: 'listen',
    iconBg: '#FA5151',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5l12-2v13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="1.8" />
        <circle cx="18" cy="16" r="3" stroke="white" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'look',
    label: '看一看',
    iconClass: 'look',
    iconBg: '#EAB308',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="white" />
        <path d="M12 2l2.5 5.5L20 12l-5.5 2.5L12 20l-2.5-5.5L4 12l5.5-2.5z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'search',
    label: '搜一搜',
    iconClass: 'search',
    iconBg: '#F97316',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="1.8" />
        <line x1="16" y1="16" x2="20" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'nearby',
    label: '附近',
    iconClass: 'nearby',
    iconBg: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3.2" stroke="white" strokeWidth="1.6" />
        <path d="M2 18c0-3.8 3.1-7 7-7s7 3.2 7 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="8" r="2.8" stroke="white" strokeWidth="1.6" />
        <path d="M14 18c0-2.5.8-3.5 3-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'game',
    label: '游戏',
    iconClass: 'game',
    iconBg: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 4h12l2 6-4 4v5H10v-5L6 10z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 16l-1 3M15 16l1 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="9" r="1" fill="white" />
        <circle cx="14" cy="9" r="1" fill="white" />
      </svg>
    ),
    rightContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 13, color: '#888888' }}>你的朋友昨日有动态</span>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#22C55E' }} />
        <div style={{ width: 8, height: 8, background: '#FA5151', borderRadius: '50%' }} />
      </div>
    ),
  },
  {
    id: 'miniapp',
    label: '小程序',
    iconClass: 'miniapp',
    iconBg: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="white" strokeWidth="1.6" />
        <circle cx="16" cy="13" r="3" stroke="white" strokeWidth="1.6" />
        <path d="M12.5 10.5l2 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    border: false,
  },
]

export const PROFILE_ROWS: Lv5ProfileRow[] = [
  {
    id: 'service',
    label: '服务',
    iconColor: '#5B7DFF',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 8H4V9h16v6zM6 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 0h8v3h-8v-3z" />
      </svg>
    ),
  },
  {
    id: 'favorites',
    label: '收藏',
    iconColor: '#F5A623',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 'moments',
    label: '朋友圈',
    iconColor: '#5B7DFF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'cards',
    label: '卡包',
    iconColor: '#34C759',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V6h16v12zm-2-10H6v8h12V8zm-4 2h2v4h-2v-4z" />
      </svg>
    ),
  },
  {
    id: 'emoji',
    label: '表情',
    iconColor: '#F5A623',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: '设置',
    iconColor: '#8E8E93',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]
