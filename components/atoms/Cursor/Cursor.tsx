// External Imports
import { useState, useEffect } from 'react';

// Internal Imports
import { CursorStatus } from '@/types/enums';

type CursorProps = {
  cursorStatus: CursorStatus
}

const Cursor = ({ cursorStatus }: CursorProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Define styles for different cursor states
  const cursorStyles: Record<CursorStatus, string> = {
    default: 'w-5 h-5',
    hovered: 'w-8 h-8',
    hidden: 'hidden',
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className={`
        fixed top-0 left-0 rounded-full pointer-events-none z-[999] border-2 
        ${cursorStyles[cursorStatus] || cursorStyles.default}
      `}
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  )
}

export default Cursor;
