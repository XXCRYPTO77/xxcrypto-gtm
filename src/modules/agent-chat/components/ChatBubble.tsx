'use client';

interface ChatBubbleProps {
  sender: 'user' | 'agent';
  text: string;
}

export function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-brand text-white rounded-2xl rounded-br-sm'
            : 'bg-surface text-ink rounded-2xl rounded-bl-sm'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
