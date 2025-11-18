import React, { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  from: "mentee" | "mentor" | "system";
  text: string;
  time: string;
};

interface MentorChatWidgetProps {
  mentorName?: string;
  mentorTitle?: string;
  mentorAvatar?: string;
}

const defaultMentorAvatar =
  "https://i.pravatar.cc/64?img=12";

export default function MentorChatWidget({
  mentorName = "Mentor CareerLink",
  mentorTitle = "Chuyên gia định hướng",
  mentorAvatar = defaultMentorAvatar,
}: MentorChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "mentor",
      text: "Chào bạn 👋, mình là mentor từ CareerLink. Bạn đang quan tâm tới lĩnh vực / vị trí nào để mình hỗ trợ?",
      time: "Vừa xong",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMsg: Message = {
      id: Date.now(),
      from: "mentee",
      text: trimmed,
      time: "Bạn",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Demo: phản hồi auto (sau này bạn thay bằng call API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "mentor",
          text:
            "Cảm ơn bạn đã chia sẻ. Bạn có thể nói rõ hơn về mục tiêu trong 3–6 tháng tới không? 😊",
          time: "Mentor",
        },
      ]);
    }, 700);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:from-sky-700 hover:to-indigo-700"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            💬
          </span>
          <span>Chat với mentor</span>
        </button>
      )}

      {/* Hộp chat */}
      {open && (
        <div className="fixed bottom-4 right-4 z-40 flex w-[320px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2">
            <div className="flex items-center gap-2">
              <img
                src={mentorAvatar}
                alt={mentorName}
                className="h-8 w-8 rounded-full border border-white/40 object-cover"
              />
              <div>
                <div className="text-xs font-semibold text-white">
                  {mentorName}
                </div>
                <div className="text-[11px] text-sky-100">
                  {mentorTitle}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-sky-50 hover:bg-sky-500/40"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 bg-slate-50 px-3 py-2 text-[13px] max-h-72 overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === "mentee"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.from === "mentee"
                      ? "bg-sky-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 rounded-bl-sm shadow-sm ring-1 ring-slate-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`mt-1 block text-[10px] ${
                      m.from === "mentee"
                        ? "text-sky-100/80"
                        : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white px-2 py-2">
            <div className="flex items-end gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhắn gì đó cho mentor..."
                className="max-h-24 flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
