import React, { useRef, useState, useEffect } from 'react'
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react'

export default function WindowFrame({
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  position = { x: 80, y: 56 },
  size = { w: 760, h: 520 },
  zIndex = 10,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onUpdatePosition,
  children
}) {
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const windowRef = useRef(null)

  // Reactive mobile state with resize listener
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dragging logic via Pointer Events (desktop only)
  const handlePointerDown = (e) => {
    // Disable drag on mobile, interactive elements, or if maximized
    if (isMobile || isMaximized || e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return

    onFocus?.()
    setIsDragging(true)
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || isMaximized || isMobile) return

    // Keep window within visible screen bounds
    const newX = Math.max(8, Math.min(window.innerWidth - 140, e.clientX - dragOffsetRef.current.x))
    const newY = Math.max(36, Math.min(window.innerHeight - 130, e.clientY - dragOffsetRef.current.y))

    onUpdatePosition?.({ x: newX, y: newY })
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    } catch (err) {
      void err
    }
  }

  if (!isOpen || isMinimized) return null

  const windowStyle = isMobile
    ? {
        position: 'fixed',
        top: 34,
        left: 4,
        right: 4,
        bottom: 68,
        zIndex,
        maxHeight: 'calc(100vh - 104px)'
      }
    : isMaximized
    ? {
        position: 'fixed',
        top: 34,
        left: 12,
        right: 12,
        bottom: 76,
        zIndex,
        maxHeight: 'calc(100vh - 114px)'
      }
    : {
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: Math.min(size.w, window.innerWidth - 24),
        height: Math.min(size.h, window.innerHeight - 140),
        maxWidth: 'calc(100vw - 24px)',
        maxHeight: 'calc(100vh - 140px)',
        zIndex
      }

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onMouseDown={onFocus}
      className={`pointer-events-auto rounded-xl sm:rounded-2xl border border-white/15 bg-[#1c1c28]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden select-auto animate-in fade-in zoom-in-95 duration-150 ${
        isDragging ? 'opacity-95 ring-1 ring-[#7e9cd8]/50 shadow-2xl' : ''
      }`}
    >
      {/* Title Bar (Draggable handle on desktop) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={!isMobile ? onToggleMaximize : undefined}
        className={`h-10 px-2.5 sm:px-3 bg-[#242436]/95 border-b border-white/10 flex items-center justify-between select-none shrink-0 z-20 ${
          isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        {/* macOS Traffic Light Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 group/lights" onPointerDown={(e) => e.stopPropagation()}>
          {/* Close button (Red) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Close (Exit)"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#e46876] hover:bg-[#c34043] flex items-center justify-center shadow-sm">
              <X className="w-2.5 h-2.5 text-black/70 stroke-[3]" />
            </div>
          </button>

          {/* Minimize button (Yellow) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize to Dock"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#dca561] hover:bg-[#c0853e] flex items-center justify-center shadow-sm">
              <Minus className="w-2.5 h-2.5 text-black/70 stroke-[3]" />
            </div>
          </button>

          {/* Maximize / Restore button (Green) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleMaximize?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-6 h-6 flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
            title="Toggle Fullscreen"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#76946a] hover:bg-[#5c7a52] flex items-center justify-center shadow-sm">
              {isMaximized ? (
                <Minimize2 className="w-2.5 h-2.5 text-black/70 stroke-[3]" />
              ) : (
                <Maximize2 className="w-2.5 h-2.5 text-black/70 stroke-[3]" />
              )}
            </div>
          </button>
        </div>

        {/* Centered Window Title */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#dcd7ba] truncate max-w-[55%] sm:max-w-[65%]">
          {icon && <span className="text-xs sm:text-sm">{icon}</span>}
          <span className="truncate">{title}</span>
        </div>

        {/* Right side close pill */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-[#e46876]/20 hover:text-[#e46876] text-[11px] font-mono text-white/50 transition-colors cursor-pointer"
            title="Close window"
          >
            esc
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden text-[#dcd7ba] text-sm relative overscroll-contain">
        {children}
      </div>
    </div>
  )
}
