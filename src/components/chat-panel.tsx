"use client"

import React, { useMemo } from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { X, Send, Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AgentSettings } from "@/lib/types"

interface ChatPanelProps {
  open: boolean
  onClose: () => void
  settings: AgentSettings
}

export function ChatPanel({ open, onClose, settings }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ id, messages }) => ({
          body: {
            messages,
            id,
            model: settings.model,
            temperature: settings.temperature,
            systemPrompt: settings.systemPrompt || undefined,
          },
        }),
      }),
    [settings.model, settings.temperature, settings.systemPrompt]
  )

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  if (!open) return null

  return (
    <>
      {/* Desktop: side panel with blurred overlay */}
      <div className="hidden md:block fixed inset-0 z-[60]">
        {/* Blurred backdrop - except header */}
        <div
          className="absolute inset-0 top-14 bg-background/60 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <div className="absolute right-0 top-14 bottom-0 w-[420px] lg:w-[480px] bg-card border-l border-border flex flex-col shadow-xl">
          <ChatContent
            messages={messages}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            status={status}
            onSubmit={handleSubmit}
            onClose={onClose}
            onClear={() => setMessages([])}
            messagesEndRef={messagesEndRef}
            inputRef={inputRef}
          />
        </div>
      </div>

      {/* Mobile: full screen */}
      <div className="md:hidden fixed inset-0 z-[60] bg-card flex flex-col">
        <ChatContent
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          status={status}
          onSubmit={handleSubmit}
          onClose={onClose}
          onClear={() => setMessages([])}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
        />
      </div>
    </>
  )
}

function ChatContent({
  messages,
  input,
  setInput,
  isLoading,
  status,
  onSubmit,
  onClose,
  onClear,
  messagesEndRef,
  inputRef,
}: {
  messages: ReturnType<typeof useChat>["messages"]
  input: string
  setInput: (v: string) => void
  isLoading: boolean
  status: string
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  onClear: () => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-12 px-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-accent transition-colors min-h-[32px]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-12">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground">Project Assistant</div>
              <div className="text-sm text-muted-foreground max-w-[280px] mt-1">
                Ask about your project timeline, task dependencies, progress, or resource allocation.
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {[
                "What tasks are behind schedule?",
                "Show the critical path",
                "Who has the most work?",
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setInput(q)
                  }}
                  className="text-xs px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors min-h-[36px]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "rounded-xl px-3.5 py-2.5 text-sm max-w-[85%] leading-relaxed",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <span key={index} className="whitespace-pre-wrap">
                      {part.text}
                    </span>
                  )
                }
                return null
              })}
            </div>
            {message.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="bg-muted rounded-xl px-3.5 py-2.5">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="p-3 border-t border-border flex-shrink-0">
        <div className="flex items-end gap-2 bg-muted rounded-xl px-3 py-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSubmit(e)
              }
            }}
            placeholder="Ask about your project..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none max-h-32 min-h-[24px] py-1"
            style={{ fontSize: "16px" }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition-opacity flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </>
  )
}
