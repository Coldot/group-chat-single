'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinForm() {
  const [roomId, setRoomId] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId && nickname) {
      router.push(`/chat/${roomId}?nickname=${nickname}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="roomId" className="block mb-1">방 번호:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="nickname" className="block mb-1">닉네임:</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        채팅방 입장
      </button>
    </form>
  );
}