'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function ChatPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([
    { id: 1, user: 'Admin', text: 'Selamat datang di chat Hanasaba!', timestamp: new Date() }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: session?.user?.name || 'Anonymous',
        text: newMessage,
        timestamp: new Date()
      }
      setMessages([...messages, message])
      setNewMessage('')
      // TODO: Send to Supabase
    }
  }

  if (!session) {
    return <div className="container mx-auto px-4 py-8 text-center">Please login to access chat.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Chat Hanasaba</h1>
      <div className="bg-white rounded-lg shadow-md h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="flex items-center mb-1">
                <span className="font-semibold text-primary">{msg.user}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-700">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..."
              className="flex-1 p-2 border rounded-l text-gray-900 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-4 py-2 rounded-r hover:bg-red-700"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}