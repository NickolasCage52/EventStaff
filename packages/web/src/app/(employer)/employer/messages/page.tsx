'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiClient } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast-context';
import { MessageSquare, User } from 'lucide-react';

interface ChatRoomRow {
  id: string;
  peer: {
    displayName: string;
    avatarUrl: string | null;
  };
  lastMessage: { text: string | null; createdAt: string } | null;
  unreadCount: number;
}

export default function EmployerMessagesPage() {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<ChatRoomRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<{ data: { rooms: ChatRoomRow[] } }>('/chat/rooms')
      .then((res) => setRooms(res.data.rooms))
      .catch(() => toast('Ошибка загрузки сообщений', 'error'))
      .finally(() => setLoading(false));
  }, [toast]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Сообщения</h1>
      <div className="mt-6">
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-card bg-white/[0.06]" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-card border border-white/[0.08] bg-white/[0.04] py-16 text-center">
            <MessageSquare className="h-10 w-10 text-white/25" />
            <h3 className="font-semibold text-white">Нет сообщений</h3>
            <p className="text-sm text-white/50">Здесь появятся чаты с исполнителями</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.04] shadow-sm">
            {rooms.map((room, idx) => {
              const last = room.lastMessage;
              return (
                <Link
                  key={room.id}
                  href={`/employer/messages/${room.id}`}
                  className={`flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.06] ${
                    idx > 0 ? 'border-t border-white/[0.06]' : ''
                  }`}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                    {room.peer.avatarUrl ? (
                      <Image src={room.peer.avatarUrl} alt="" width={40} height={40} className="object-cover" unoptimized />
                    ) : (
                      <User className="h-5 w-5 text-white/35" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-white">{room.peer.displayName}</p>
                      {room.unreadCount > 0 && (
                        <span className="shrink-0 rounded-full bg-primary-500 px-2 py-0.5 text-xs font-semibold text-white">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                    {last?.text != null && last.text !== '' && (
                      <p className="truncate text-sm text-white/45">{last.text}</p>
                    )}
                  </div>
                  {last && (
                    <span className="shrink-0 text-xs text-white/35">
                      {new Date(last.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
