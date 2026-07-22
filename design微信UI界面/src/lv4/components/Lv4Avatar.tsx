import type { AvatarSpec } from '../types'

interface AvatarProps {
  spec: AvatarSpec
  size?: number
  rounded?: number
}

/** Lv.4 头像：支持 single（颜色+首字）与 group（2x2 拼图），可自定义尺寸与圆角 */
export default function Lv4Avatar({ spec, size = 48, rounded = 50 }: AvatarProps) {
  const style: React.CSSProperties = { width: size, height: size, borderRadius: rounded }
  if (spec.kind === 'group' && spec.colors) {
    return (
      <div className="avatar-wrap" style={style}>
        <div className="avatar-group">
          {spec.colors.map((c, i) => (
            <div key={i} style={{ background: c }} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="avatar-wrap" style={style}>
      <div className="avatar-single" style={{ background: spec.background, fontSize: size * 0.42 }}>
        {spec.label}
      </div>
    </div>
  )
}
