import type { Lv3Chat, Lv3Contact } from '../types'

/**
 * Lv.3 聊天列表数据 — 与上传设计稿 chat-list.html 完全一致
 * （测试家庭群、前端技术交流群、项目协作群、智能助手Pro 等）
 * 第一个聊天（文件传输助手）作为默认详情，连接列表与详情页。
 */
export const initialLv3Chats: Lv3Chat[] = [
  {
    id: 'file-transfer',
    name: '文件传输助手',
    preview: 'http://165.22.246.195/',
    time: '7月12日',
    pinned: true,
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #2B579A, #3B82F6)', label: 'W' },
    messages: [
      { id: 'm1', time: '6月26日 06:36', kind: 'url', content: 'https://ozxowx.app/campus/', sender: 'self' },
      { id: 'm2', time: '7月11日 10:26', kind: 'file', content: '欧玮轩心理委员学期工作报告.docx', size: '107.9 KB', sender: 'self' },
      { id: 'm3', time: '7月12日 00:49', kind: 'url', content: 'http://165.22.246.195/', sender: 'self' },
      { id: 'm4', time: '7月14日 09:54', kind: 'file', content: '幼儿园组织学生和家长学习观看的警....14.docx', size: '384.2 KB', sender: 'self' },
      { id: 'm5', time: '7月15日 19:12', kind: 'image', content: '数据表格截图', imageBackground: 'linear-gradient(135deg, #E0E7FF, #C7D2FE)', sender: 'self' },
    ],
  },
  {
    id: 'family',
    name: '测试家庭群',
    preview: '测试家长A: 收到了',
    time: '16:44',
    muted: true,
    pinned: true,
    avatar: { kind: 'single', background: '#F472B6', label: '家' },
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
      { id: 'p1', time: '周六 10:00', kind: 'file', content: '新版设计稿v2.fig', size: '12.4 MB', sender: 'other', senderName: '测试员B' },
    ],
  },
  {
    id: 'ai-bot',
    name: '智能助手Pro',
    preview: '✅ 任务已完成 — 本周报告已生...',
    time: '7月12日',
    ai: true,
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #6366F1, #A855F7)', label: 'AI' },
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
    avatar: { kind: 'single', background: '#22C55E', label: '宿' },
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

export const initialLv3Contacts: Lv3Contact[] = [
  { id: 'c1', name: '阿强测试', background: '#F472B6', label: '阿', letter: 'A' },
  { id: 'c2', name: '安迪朋友', background: '#3B82F6', label: '安', letter: 'A' },
  { id: 'c3', name: '爱心志愿者', background: '#22C55E', label: '爱', letter: 'A' },
  { id: 'c4', name: '白云悠悠', background: '#F97316', label: '白', letter: 'B' },
  { id: 'c5', name: '北极光旅行', background: '#EF4444', label: '北', letter: 'B' },
  { id: 'c6', name: '春风十里', background: '#06B6D4', label: '春', letter: 'C' },
  { id: 'c7', name: '测试用户A', background: '#F472B6', label: '测', letter: 'C' },
  { id: 'c8', name: '测试书友', background: '#14B8A6', label: '测', letter: 'C' },
  { id: 'c9', name: '叮当猫', background: '#F59E0B', label: '叮', letter: 'D' },
  { id: 'c10', name: '多多同学', background: '#8B5CF6', label: '多', letter: 'D' },
  { id: 'c11', name: '风信子', background: '#0EA5E9', label: '风', letter: 'F' },
  { id: 'c12', name: '管理员-测试', background: '#A855F7', label: '管', letter: 'G' },
  { id: 'c13', name: '哈哈先生', background: '#EC4899', label: '哈', letter: 'H' },
  { id: 'c14', name: '小明同学', background: '#3B82F6', label: '小', letter: 'X' },
  { id: 'c15', name: '小甜甜', background: '#F472B6', label: '小', letter: 'X' },
  { id: 'c16', name: '智能助手Pro', background: 'linear-gradient(135deg, #6366F1, #A855F7)', label: 'AI', letter: 'Z' },
]

/** 通讯录顶部功能入口（与设计稿 contacts.html 一致） */
export const CONTACT_CATEGORIES = [
  { id: 'new-friend', label: '新的朋友', bg: '#F97316' },
  { id: 'chat-only', label: '仅聊天的朋友', bg: '#F97316' },
  { id: 'group-chat', label: '群聊', bg: '#22C55E' },
  { id: 'tag', label: '标签', bg: '#3B82F6' },
  { id: 'official', label: '公众号', bg: '#3B82F6' },
  { id: 'service', label: '服务号', bg: '#60A5FA' },
] as const
