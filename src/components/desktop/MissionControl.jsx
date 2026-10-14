import React from 'react'
import { ArrowDownToLine, ArrowUpRight, Layers3, X } from 'lucide-react'

const APP_COLORS = {
  about: 'from-amber-300/30 to-orange-500/10',
  projects: 'from-sky-300/30 to-blue-500/10',
  terminal: 'from-emerald-300/25 to-slate-700/20',
  ask: 'from-rose-300/30 to-red-600/10',
  experience: 'from-indigo-300/30 to-blue-600/10',
  skills: 'from-violet-300/30 to-purple-600/10',
  resume: 'from-stone-200/30 to-amber-100/10',
  mail: 'from-cyan-300/30 to-blue-600/10',
  music: 'from-emerald-300/30 to-green-600/10'
}

const APP_DESCRIPTIONS = {
  about: 'Meet the engineer behind the work',
  projects: 'Products, experiments, and shipped work',
  terminal: 'A command line for exploring this portfolio',
  ask: 'Ask about projects and engineering decisions',
  experience: 'Inside the prepNep production platform',
  skills: 'Languages, tools, and system architecture',
  resume: 'Experience, skills, and credentials',
  mail: 'Start a conversation with Swastik',
  music: 'A soundtrack for exploring the desktop'
}

export default function MissionControl({
  isOpen,
  windows,
  activeWindowId,
  onFocusApp,
  onLaunchApp,
  onCloseApp,
  onClose
}) {
  if (!isOpen) return null

  const openApps = Object.values(windows)
    .filter((app) => app.isOpen)
    .sort((a, b) => b.zIndex - a.zIndex)
  const availableApps = Object.values(windows).filter((app) => !app.isOpen)

  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto bg-[#090910]/62 px-5 pb-32 pt-14 text-white backdrop-blur-2xl animate-in fade-in duration-200 sm:px-10 sm:pt-16"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <header className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
            <Layers3 className="h-3.5 w-3.5 text-[#dca561]" />
            Task View · Workspace overview
          </div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">Everything in its place.</h2>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-white/45 sm:text-sm">
            Switch between open windows, bring a minimized app forward, or start somewhere new.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {openApps.length > 0 && (
            <button
              type="button"
              onClick={() => {
                openApps.forEach((app) => onCloseApp(app.id))
                onClose()
              }}
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/65 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              Clear workspace
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close workspace overview"
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-white/55 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 w-full max-w-6xl space-y-9 sm:mt-11">
        <section aria-labelledby="open-windows-heading">
          <div className="mb-3 flex items-center justify-between">
            <h3 id="open-windows-heading" className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/55">
              In this workspace
            </h3>
            <span className="text-[10px] font-mono text-white/30">
              {openApps.length} {openApps.length === 1 ? 'window' : 'windows'}
            </span>
          </div>

          {openApps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-5 py-7 text-center text-xs text-white/40">
              Your workspace is clear. Pick an app below to begin.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {openApps.map((app) => {
                const isActive = activeWindowId === app.id && !app.isMinimized
                return (
                  <article
                    key={app.id}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 ${
                      isActive
                        ? 'border-[#dca561]/55 bg-white/[0.09] shadow-[0_12px_36px_rgba(220,165,97,0.08)]'
                        : 'border-white/10 bg-white/[0.045] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.075]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onFocusApp(app.id)
                        onClose()
                      }}
                      aria-label={`Switch to ${app.title}${app.isMinimized ? ', currently minimized' : ''}`}
                      className={`block w-full bg-gradient-to-br ${APP_COLORS[app.id] || 'from-white/10 to-white/5'} p-4 text-left sm:p-5`}
                    >
                      <div className="flex aspect-[1.75/1] flex-col overflow-hidden rounded-xl border border-white/15 bg-[#161620]/75 shadow-[0_10px_28px_rgba(0,0,0,0.25)]">
                        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.035] px-2.5">
                          <span className="h-2 w-2 rounded-full bg-[#e46876]/85" />
                          <span className="h-2 w-2 rounded-full bg-[#dca561]/85" />
                          <span className="h-2 w-2 rounded-full bg-[#76946a]/85" />
                          <span className="ml-auto max-w-[65%] truncate text-[9px] text-white/40">{app.title}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-base">
                              {app.icon}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                              {app.id === 'experience' ? 'Field notes · 01' : app.id === 'projects' ? 'Selected work' : 'Personal workspace'}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-[11px] leading-relaxed text-white/75">{APP_DESCRIPTIONS[app.id]}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-medium text-white/90">{app.title}</span>
                          <span className="mt-0.5 block text-[10px] text-white/40">
                            {app.isMinimized ? 'Minimized · click to restore' : isActive ? 'Currently active' : 'Open · click to switch'}
                          </span>
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/50 transition-colors group-hover:bg-white/10 group-hover:text-[#dca561]">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onCloseApp(app.id)}
                      aria-label={`Close ${app.title}`}
                      className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/65 opacity-100 transition-colors hover:bg-[#e46876] hover:text-[#1f1f28] sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {availableApps.length > 0 && (
          <section aria-labelledby="available-apps-heading">
            <h3 id="available-apps-heading" className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-white/45">
              Pick up something new
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {availableApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    onLaunchApp(app.id)
                    onClose()
                  }}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.075]"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br ${APP_COLORS[app.id] || 'from-white/15 to-white/5'} text-sm font-semibold text-white shadow-inner`}>
                    {app.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium text-white/85">{app.title.split('—')[0].trim()}</span>
                    <span className="mt-0.5 block truncate text-[10px] text-white/35">{APP_DESCRIPTIONS[app.id]}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="mx-auto mt-10 w-full max-w-6xl pb-5 text-center text-[10px] font-mono text-white/30">
        F3 or Ctrl+↑ to open · Esc to return to desktop
      </div>
    </div>
  )
}
