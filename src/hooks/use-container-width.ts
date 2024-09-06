import { useEffect, useRef, useState } from 'react'

export function useContainerWidth () {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setConteinerWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = (entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        setConteinerWidth(entries[0].contentRect.width)
      }
    }

    const resizeObserver = new ResizeObserver(updateWidth)

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    if (containerRef.current) {
      setConteinerWidth(containerRef.current.offsetWidth)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [containerRef])

  const gridCols = (containerWidth: number) => {
    if (containerWidth < 440) {
      return 1
    } else if (containerWidth < 600) {
      return 2
    } else if (containerWidth < 950) {
      return 3
    } else if (containerWidth < 1128) {
      return 4
    }

    return 5
  }

  return { containerRef, containerWidth, gridCols }
}
