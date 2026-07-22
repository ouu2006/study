import type { AvatarSpec } from '../types'
import s from './Lv5Avatar.module.css'

interface AvatarProps {
  spec: AvatarSpec
  size?: number
  rounded?: number
}

export default function Lv5Avatar({ spec, size = 48, rounded = 50 }: AvatarProps) {
  const style: React.CSSProperties = { width: size, height: size, borderRadius: `${rounded}%` }

  if (spec.kind === 'group' && spec.colors) {
    return (
      <div className={s.avatarWrap} style={style}>
        <div className={s.avatarGroup}>
          {spec.colors.map((c, i) => (
            <div key={i} style={{ background: c }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={s.avatarWrap} style={style}>
      <div
        className={s.avatarSingle}
        style={{ background: spec.background, fontSize: size * 0.42 }}
      >
        {spec.label}
      </div>
    </div>
  )
}
