'use client';

import { ChatRoomView } from '@/components/chat/ChatRoomView';

/** Чат-комната (ChatRoom id), WebSocket + `/chat/*` REST — не модель Conversation. */
export function EmployerConversationPageClient() {
  return <ChatRoomView />;
}
