"use client";
import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

export default function ChatUI2() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    body: {
      from: new Date(),
      to: new Date(),
    },
  })
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(m => (
          <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          className="w-full p-2 border rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
      </form>
    </div>
  )
}