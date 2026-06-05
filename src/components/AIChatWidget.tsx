'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import { assistantPrompts } from '@/lib/data';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

function getAssistantResponse(input: string) {
  const normalized = input.toLowerCase();
  const match = assistantPrompts.find((prompt) =>
    prompt.keywords.some((keyword) => normalized.includes(keyword))
  );

  return (
    match?.response ??
    "I can help with Seshajalam's projects, work experience, AI skills, resume summary, and contact details. Try one of the suggested questions for the fastest answer."
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi, I am Seshajalam AI. Ask me about projects, experience, AI skills, resume, or contact details.",
    },
  ]);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo(() => assistantPrompts.map((prompt) => prompt.label), []);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setTyping(true);

    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: getAssistantResponse(trimmed) },
      ]);
      setTyping(false);
    }, 650);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="mb-4 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-primary)]/85 shadow-2xl shadow-[var(--accent-secondary)]/20 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] bg-[var(--accent-primary)]/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-cyan-400 text-white shadow-lg shadow-[var(--accent-primary)]/30">
                  <FaRobot />
                </div>
                <div>
                  <p className="font-display text-sm font-bold">Ask Seshajalam AI</p>
                  <p className="text-xs text-[var(--text-secondary)]">Portfolio knowledge assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-[var(--text-secondary)] transition-colors hover:bg-white/10 hover:text-[var(--text-primary)]"
                aria-label="Close AI chat"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white'
                        : 'border border-[var(--glass-border)] bg-white/5 text-[var(--text-secondary)]'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-[var(--glass-border)] bg-white/5 px-3 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent-primary)]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-300 [animation-delay:240ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-[var(--glass-border)] px-4 py-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => ask(suggestion)}
                  className="shrink-0 rounded-full border border-[var(--accent-primary)]/30 px-3 py-1.5 text-xs text-[var(--accent-primary)] transition-colors hover:bg-[var(--accent-primary)]/10"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[var(--glass-border)] p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Seshajalam..."
                className="min-w-0 flex-1 rounded-full border border-[var(--glass-border)] bg-[var(--bg-secondary)] px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)]"
              />
              <button
                type="submit"
                disabled={typing}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] via-[var(--accent-secondary)] to-cyan-400 text-white shadow-xl shadow-[var(--accent-secondary)]/35 transition-transform hover:scale-110"
        aria-label="Open Ask Seshajalam AI"
      >
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-cyan-400/20" />
        <FaRobot className="relative text-2xl" />
      </button>
    </div>
  );
}
