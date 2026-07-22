import { useEffect, useState } from 'react'

/**
 * 多端适配：监听媒体查询。
 * - `isDesktop`：≥ 900px，启用微信桌面端分栏布局（列表 + 详情并排）
 * - `isTablet`：≥ 600px 且 < 900px，平板布局（更宽的列表）
 * - `isMobile`：< 600px，移动端单栏布局
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useBreakpoint() {
  const isDesktop = useMediaQuery('(min-width: 900px)')
  const isTablet = useMediaQuery('(min-width: 600px) and (max-width: 899px)')
  const isMobile = useMediaQuery('(max-width: 599px)')
  return { isDesktop, isTablet, isMobile }
}
