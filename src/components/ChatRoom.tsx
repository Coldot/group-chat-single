'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  user: string;
  text: string;
}

export default function ChatRoom({ roomId, nickname }: { roomId: string, nickname: string }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('join', { roomId, nickname });

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, nickname]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage && socket) {
      socket.emit('sendMessage', { roomId, user: nickname, text: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">채팅방: {roomId}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.user === nickname ? 'text-right' : ''}`}>
            <span className="font-bold">{message.user}: </span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
          전송
        </button>
      </form>
    </div>
  );
}