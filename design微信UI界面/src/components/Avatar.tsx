import type { AvatarSpec } from '../types'

interface AvatarProps {
  spec: AvatarSpec
  size?: number
}

/**
 * Renders a single (color + label) avatar or a 2x2 grid group avatar
 * exactly like the design mockup.
 */
export default function Avatar({ spec, size = 48 }: AvatarProps) {
  const style = { width: size, height: size }
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
      <div className="avatar-single" style={{ background: spec.background }}>
        {spec.label}
      </div>
    </div>
  )
}
