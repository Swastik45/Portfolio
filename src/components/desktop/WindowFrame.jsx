import React, { useRef, useState, useEffect } from 'react'
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react'
import { ShortcutGlyph } from './DesktopIcons'

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
  onUpdateSize,
  children
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef(null)
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
    const newY = Math.max(8, Math.min(window.innerHeight - 110, e.clientY - dragOffsetRef.current.y))

    onUpdatePosition?.({ x: newX, y: newY })
  }

  const handlePointerUp = () => {
    if (!isDragging && !isResizing) return
    setIsDragging(false)
    setIsResizing(false)
    resizeStartRef.current = null
  }

  const handleResizeStart = (direction, e) => {
    if (isMobile || isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    onFocus?.()
    resizeStartRef.current = {
      direction,
      pointerX: e.clientX,
      pointerY: e.clientY,
      position,
      size
    }
    setIsResizing(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handleResizeMove = (e) => {
    const start = resizeStartRef.current
    if (!start || isMobile || isMaximized) return

    const minWidth = 320
    const minHeight = 240
    const maxRight = window.innerWidth - 8
    const maxBottom = window.innerHeight - 72
    const deltaX = e.clientX - start.pointerX
    const deltaY = e.clientY - start.pointerY
    let left = start.position.x
    let top = start.position.y
    let right = left + start.size.w
    let bottom = top + start.size.h

    if (start.direction.includes('e')) right = Math.min(maxRight, Math.max(left + minWidth, right + deltaX))
    if (start.direction.includes('s')) bottom = Math.min(maxBottom, Math.max(top + minHeight, bottom + deltaY))
    if (start.direction.includes('w')) left = Math.max(8, Math.min(right - minWidth, left + deltaX))
    if (start.direction.includes('n')) top = Math.max(8, Math.min(bottom - minHeight, top + deltaY))

    onUpdatePosition?.({ x: left, y: top })
    onUpdateSize?.({ w: right - left, h: bottom - top })
  }

  if (!isOpen || isMinimized) return null

  const windowStyle = isMobile
    ? {
        position: 'fixed',
        top: 8,
        left: 4,
        right: 4,
        bottom: 60,
        zIndex,
        maxHeight: 'calc(100vh - 68px)'
      }
    : isMaximized
    ? {
        position: 'fixed',
        top: 10,
        left: 12,
        right: 12,
        bottom: 66,
        zIndex,
        maxHeight: 'calc(100vh - 76px)'
      }
    : {
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: Math.min(size.w, window.innerWidth - 24),
        height: Math.min(size.h, window.innerHeight - 90),
        maxWidth: 'calc(100vw - 24px)',
        maxHeight: 'calc(100vh - 90px)',
        zIndex
      }

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onMouseDown={onFocus}
      className={`pointer-events-auto rounded-lg border border-white/15 bg-[#20242d]/95 shadow-[0_24px_64px_rgba(0,0,0,0.48)] backdrop-blur-2xl flex flex-col overflow-hidden select-auto animate-in fade-in zoom-in-95 duration-150 ${
        isDragging || isResizing ? 'opacity-95 ring-1 ring-[#39a9f8]/50 shadow-2xl' : ''
      }`}
    >
      {/* Title Bar (Draggable handle on desktop) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={!isMobile ? onToggleMaximize : undefined}
        className={`h-10 bg-[#20242d] border-b border-white/[0.08] flex items-center justify-between select-none shrink-0 z-20 ${
          isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-3 text-xs font-medium text-white/85">
          {icon && <span className="flex h-6 w-6 shrink-0 items-center justify-center"><ShortcutGlyph type={icon} className="h-5 w-5" /></span>}
          <span className="truncate">{title}</span>
        </div>

        <div className="flex h-full shrink-0 items-stretch" onPointerDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Minimize ${title}`}
            className="flex w-10 items-center justify-center text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            title="Minimize"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleMaximize?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`${isMaximized ? 'Restore' : 'Maximize'} ${title}`}
            className="hidden w-10 items-center justify-center text-white/65 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            title={isMaximized ? 'Restore down' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Close ${title}`}
            className="flex w-11 items-center justify-center text-white/70 transition-colors hover:bg-[#c42b1c] hover:text-white sm:w-12"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden text-[#dcd7ba] text-sm relative overscroll-contain">
        {children}
      </div>

      {!isMobile && !isMaximized && (
        <>
          {[
            ['n', '-top-1 left-3 right-3 h-3 cursor-ns-resize'],
            ['s', '-bottom-1 left-3 right-3 h-3 cursor-ns-resize'],
            ['e', '-right-1 top-3 bottom-3 w-3 cursor-ew-resize'],
            ['w', '-left-1 top-3 bottom-3 w-3 cursor-ew-resize'],
            ['ne', '-right-1.5 -top-1.5 h-5 w-5 cursor-nesw-resize'],
            ['nw', '-left-1.5 -top-1.5 h-5 w-5 cursor-nwse-resize'],
            ['se', '-right-1.5 -bottom-1.5 h-5 w-5 cursor-nwse-resize'],
            ['sw', '-left-1.5 -bottom-1.5 h-5 w-5 cursor-nesw-resize']
          ].map(([direction, classes]) => (
            <button
              key={direction}
              type="button"
              aria-label={`Resize ${title} ${direction}`}
              title="Drag to resize"
              onPointerDown={(e) => handleResizeStart(direction, e)}
              onPointerMove={handleResizeMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute z-30 touch-none bg-transparent hover:bg-[#39a9f8]/20 ${classes}`}
            />
          ))}
        </>
      )}
    </div>
  )
}
