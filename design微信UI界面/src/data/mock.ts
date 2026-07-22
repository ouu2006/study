import type { Chat, Contact } from '../types'

/**
 * The 10 chats from the design mockup (chat-list.html).
 * The first chat ("文件传输助手") is wired to the chat-detail page so that
 * tapping it shows the rich message thread from the design.
 */
export const initialChats: Chat[] = [
  {
    id: 'file-transfer',
    name: '文件传输助手',
    preview: 'http://165.22.246.195/',
    time: '7月12日',
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #2B579A, #3B82F6)', label: 'W' },
    messages: [
      { id: 'm1', time: '6月26日 06:36', kind: 'url', content: 'https://ozxowx.app/campus/', sender: 'self' },
      {
        id: 'm2',
        time: '7月11日 10:26',
        kind: 'file',
        content: '欧玮轩心理委员学期工作报告.docx',
        size: '107.9 KB',
        sender: 'self',
      },
      { id: 'm3', time: '7月12日 00:49', kind: 'url', content: 'http://165.22.246.195/', sender: 'self' },
      {
        id: 'm4',
        time: '7月14日 09:54',
        kind: 'file',
        content: '幼儿园组织学生和家长学习观看的警....14.docx',
        size: '384.2 KB',
        sender: 'self',
      },
      {
        id: 'm5',
        time: '7月15日 19:12',
        kind: 'image',
        content: '数据表格截图',
        imageBackground: 'linear-gradient(135deg, #E0E7FF, #C7D2FE)',
        sender: 'self',
      },
    ],
  },
  {
    id: 'family',
    name: '○○一家人',
    preview: '爸（5.14）: 好',
    time: '16:44',
    muted: true,
    avatar: { kind: 'single', background: '#F472B6', label: '家' },
    messages: [],
  },
  {
    id: 'class-mute',
    name: '25计科（创新班）1️⃣班禁言群',
    preview: '班主任: 关于下周教学安排的通知',
    time: '昨天',
    muted: true,
    avatar: {
      kind: 'group',
      colors: ['#F97316', '#3B82F6', '#22C55E', '#A855F7'],
    },
    messages: [],
  },
  {
    id: 'class-chat',
    name: '25计科（创新班）1️⃣班聊天群',
    preview: '[视频号] 同学的视频',
    time: '周六',
    avatar: {
      kind: 'group',
      colors: ['#EF4444', '#06B6D4', '#EAB308', '#EC4899'],
    },
    messages: [],
  },
  {
    id: 'ai-bot',
    name: 'u宝 AI',
    preview: '⚠️ 系统警告: 检测到异常登录',
    time: '7月12日',
    ai: true,
    avatar: { kind: 'single', background: 'linear-gradient(135deg, #6366F1, #A855F7)', label: 'AI' },
    messages: [],
  },
  {
    id: 'dorm',
    name: '宿舍',
    preview: '室友C: ok',
    time: '7月11日',
    muted: true,
    avatar: { kind: 'single', background: '#22C55E', label: '宿' },
    messages: [],
  },
  {
    id: 'sit',
    name: 'SiT联盟相亲相爱一家人',
    preview: '主席: 周五例会改时间',
    time: '6月6日',
    muted: true,
    avatar: {
      kind: 'group',
      colors: ['#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444'],
    },
    messages: [],
  },
  {
    id: 'rain',
    name: 'rain（10.22）',
    preview: '收到，谢谢～',
    time: '3月15日',
    avatar: { kind: 'single', background: '#3B82F6', label: 'R' },
    messages: [],
  },
  {
    id: 'fan-group',
    name: '圆小燃VX群',
    preview: '测试卖家: 这个价格很划算',
    previewPrefix: '[4条]',
    time: '16:47',
    muted: true,
    unread: 4,
    avatar: {
      kind: 'group',
      colors: ['#D946EF', '#0EA5E9', '#F97316', '#10B981'],
    },
    messages: [],
  },
  {
    id: 'official',
    name: '公众号',
    preview: '测试日报: 今日科技新闻速览...',
    previewPrefix: '[3条]',
    time: '16:44',
    unread: 3,
    avatar: { kind: 'single', background: '#0D9488', label: '订' },
    messages: [],
  },
  {
    id: 'signup',
    name: '传习社Design组报名',
    preview: '负责老师: 报名表已收到',
    time: '16:40',
    avatar: { kind: 'single', background: '#F97316', label: 'F' },
    messages: [],
  },
]

export const initialContacts: Contact[] = [
  { id: 'c1', name: '阿强测试', background: '#F472B6', label: '阿' },
  { id: 'c2', name: '安迪朋友', background: '#3B82F6', label: '安' },
  { id: 'c3', name: '爱心志愿者', background: '#22C55E', label: '爱' },
  { id: 'c4', name: '白云悠悠', background: '#F97316', label: '白' },
  { id: 'c5', name: '北极光旅行', background: '#EF4444', label: '北' },
  { id: 'c6', name: '春风十里', background: '#06B6D4', label: '春' },
]
