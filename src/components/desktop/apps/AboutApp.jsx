import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileText, Printer, Save, FilePlus2 } from 'lucide-react'

const STORAGE_KEY = 'swastik_notepad_document'
const DEFAULT_DOCUMENT = `# About Swastik Paudel

Software Engineer & Full-Stack Systems Developer
Kathmandu, Nepal · UTC+5:45 · Age: 21

I build dependable web platforms, real-time systems, and software that stays useful under pressure. My work spans product engineering and lower-level systems experiments.

I worked as a software engineering intern on prepNep at Madargaach Holdings, developing the platform's exam experience, real-time state synchronization, and infrastructure.

Outside production web systems, I explore Rust, Bevy, and entity-component-system architecture.

Verified Links & Social Media:
- GitHub: https://github.com/Swastik45
- LinkedIn: https://www.linkedin.com/in/swastik-paudel-591b61274/
- Twitter / X: https://x.com/SwastikPaudel45
- WhatsApp: +977 976-7929476
- Email: psamarpaudel@gmail.com

Quick navigation:
- prepNep case study
- Projects
- Contact`

export default function AboutApp({ onOpenApp }) {
  const [documentText, setDocumentText] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_DOCUMENT
    } catch (error) {
      console.warn('Unable to load the saved Notepad document:', error)
      return DEFAULT_DOCUMENT
    }
  })
  const [isSaved, setIsSaved] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null
    } catch {
      return false
    }
  })
  const [savedAt, setSavedAt] = useState(null)
  const [wrapText, setWrapText] = useState(true)
  const [cursor, setCursor] = useState({ line: 1, column: 1 })
  const [fileName, setFileName] = useState(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_name`) || 'About_Swastik.txt'
    } catch {
      return 'About_Swastik.txt'
    }
  })
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const lineCount = useMemo(() => documentText.split('\n').length, [documentText])

  function saveDocument() {
    try {
      localStorage.setItem(STORAGE_KEY, documentText)
      localStorage.setItem(`${STORAGE_KEY}_name`, fileName)
      setIsSaved(true)
      setSavedAt(new Date())
    } catch (error) {
      console.error('Unable to save the Notepad document:', error)
      window.alert('This browser could not save the document locally. You can still download a copy.')
    }
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        saveDocument()
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'o') {
        event.preventDefault()
        fileInputRef.current?.click()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const createDocument = () => {
    if (!isSaved && !window.confirm('Discard unsaved edits and create a new document?')) return
    setDocumentText('')
    setFileName('Untitled.txt')
    setIsSaved(false)
    requestAnimationFrame(() => editorRef.current?.focus())
  }

  const openDocument = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      localStorage.setItem(STORAGE_KEY, text)
      localStorage.setItem(`${STORAGE_KEY}_name`, file.name)
      setDocumentText(text)
      setFileName(file.name)
      setIsSaved(true)
      setSavedAt(new Date())
    } catch (error) {
      console.error('Unable to open the selected text document:', error)
      window.alert('This file could not be opened as a text document.')
    } finally {
      event.target.value = ''
    }
  }

  const downloadDocument = () => {
    const file = new Blob([documentText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  const updateText = (event) => {
    setDocumentText(event.target.value)
    setIsSaved(false)
  }

  const updateCursor = (event) => {
    const beforeCursor = event.target.value.slice(0, event.target.selectionStart)
    const lines = beforeCursor.split('\n')
    setCursor({ line: lines.length, column: lines[lines.length - 1].length + 1 })
  }

  return (
    <div className="flex h-full flex-col bg-[#111820] text-[#e8edf3]">
    <div className="flex h-10 shrink-0 items-center gap-1 border-b border-[#303b48] bg-[#1a232d] px-2">
      <div className="flex h-full items-center gap-2 border-b-2 border-[#4da3ff] bg-[#222e3a] px-3 text-[11px] font-medium text-[#e8edf3]">
          <FileText className="h-3.5 w-3.5 text-[#2878d0]" />
          {fileName}
          {!isSaved && <span className="h-1.5 w-1.5 rounded-full bg-[#2878d0]" aria-label="Unsaved changes" />}
          <span className="ml-2 text-[#8795a5]">×</span>
        </div>
      </div>

      <div className="flex h-11 shrink-0 items-center gap-1 border-b border-[#303b48] bg-[#1a232d] px-2">
        <button type="button" onClick={createDocument} title="New document" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">
          <FilePlus2 className="h-3.5 w-3.5 text-[#58a8ff]" /> New
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()} title="Open a text file (Ctrl+O)" className="rounded-md px-2.5 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">Open</button>
        <input ref={fileInputRef} type="file" accept=".txt,text/plain" onChange={openDocument} className="hidden" aria-label="Choose a text document" />
        <button type="button" onClick={saveDocument} title="Save locally (Ctrl+S)" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">
          <Save className="h-3.5 w-3.5 text-[#58a8ff]" /> Save
        </button>
        <button type="button" onClick={downloadDocument} title="Download a text copy" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">
          <Download className="h-3.5 w-3.5 text-[#58a8ff]" /> Download
        </button>
        <button type="button" onClick={() => window.print()} title="Print document" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">
          <Printer className="h-3.5 w-3.5 text-[#58a8ff]" /> Print
        </button>
        {onOpenApp && (
          <>
            <span className="mx-1 h-5 border-l border-[#3a4653]" />
            <button type="button" onClick={() => onOpenApp('projects')} className="rounded-md px-2 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">Projects</button>
            <button type="button" onClick={() => onOpenApp('experience')} className="rounded-md px-2 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">Case study</button>
            <button type="button" onClick={() => onOpenApp('mail')} className="rounded-md px-2 py-1.5 text-[10px] text-[#c8d2de] hover:bg-[#2a3745]">Contact</button>
          </>
        )}
        <span className="mx-1 h-5 border-l border-[#3a4653]" />
        <button type="button" onClick={() => setWrapText((value) => !value)} aria-pressed={wrapText} className={`rounded-md px-2.5 py-1.5 text-[10px] ${wrapText ? 'bg-[#17324d] text-[#8bc4ff]' : 'text-[#a9b6c5] hover:bg-[#2a3745]'}`}>
          Word wrap
        </button>
        <div className="ml-auto hidden items-center gap-1.5 pr-2 text-[10px] text-[#91a0b1] sm:flex">
          <span className={`h-1.5 w-1.5 rounded-full ${isSaved ? 'bg-[#3e9b68]' : 'bg-[#dc9a36]'}`} />
          {isSaved ? savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : 'Saved' : 'Edited'}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 bg-[#111820]">
        <div className="hidden w-11 shrink-0 select-none overflow-hidden border-r border-[#242f3a] bg-[#151e27] pt-3 text-right font-mono text-[11px] leading-6 text-[#657487] sm:block" aria-hidden="true">
          {Array.from({ length: Math.max(lineCount, 20) }, (_, index) => <div key={index} className="pr-2">{index + 1}</div>)}
        </div>
        <textarea
          ref={editorRef}
          value={documentText}
          onChange={updateText}
          aria-label="Edit About Swastik text document"
          spellCheck={false}
          wrap={wrapText ? 'soft' : 'off'}
          onClick={updateCursor}
          onKeyUp={updateCursor}
          className={`min-h-0 min-w-0 flex-1 resize-none border-0 bg-[#111820] px-5 py-3 font-mono text-[12px] leading-6 text-[#dbe5ef] outline-none selection:bg-[#265b8c] sm:px-7 sm:text-[13px] ${wrapText ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'}`}
        />
      </div>

      <div className="flex min-h-8 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[#303b48] bg-[#1a232d] px-3 py-1 text-[9px] text-[#a9b6c5]">
        <span>{isSaved ? 'Saved locally in this browser' : 'Unsaved changes'} · {documentText.length} characters</span>
        <span>Ln {cursor.line}, Col {cursor.column} · UTF-8 · {wrapText ? 'Wrap on' : 'Wrap off'}</span>
      </div>
    </div>
  )
}
