// External Imports
import { useEffect } from 'react';

// Internal Imports
import { CursorStatus } from '@/types/enums';
import { useProfile } from '@/hooks/useProfile';
import { useCanvasStore } from '@/stores/canvas/canvasStore';

const Cursor = () => {
  const profileId = useProfile();
  const cursor = useCanvasStore((state) => state.profiles[profileId]?.cursor);
  const setCursorPosition = useCanvasStore.getState().setCursorPosition;

  // Define styles for different cursor states
  const cursorStyles: Record<CursorStatus, string> = {
    default: 'w-5 h-5',
    hovered: 'w-8 h-8',
    hidden: 'hidden',
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition(profileId, { x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [profileId, setCursorPosition])

  return (
    <div
      className={`
        fixed top-0 left-0 rounded-full pointer-events-none z-[999] border-2 
        ${cursorStyles[cursor?.status || CursorStatus.Default]}
      `}
      style={{
        transform: `translate3d(${cursor?.position.x}px, ${cursor?.position.y}px, 0) translate(-50%, -50%)`,
      }}
    />
  )
}

export default Cursor;
