import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type SessionStatus = "upcoming" | "completed" | "cancelled";

interface Session {
  id: number;
  mentorName: string;
  mentorTitle: string;
  mentorAvatar: string;
  date: string; // ISO string
  durationMinutes: number;
  topic: string;
  status: SessionStatus;
  meetingLink?: string;
}

// Demo data – sau này bạn có thể thay bằng API/real data
const mockSessions: Session[] = [
  {
    id: 1,
    mentorName: "Phạm Khôi Nguyên",
    mentorTitle: "Developer",
    mentorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    date: "2025-11-20T19:30:00.000Z",
    durationMinutes: 60,
    topic: "Định hướng lộ trình Java Backend cho sinh viên năm 3",
    status: "upcoming",
    meetingLink: "#",
  },
  {
    id: 2,
    mentorName: "Đỗ Thị Như Ý",
    mentorTitle: "Senior Backend Developer",
    mentorAvatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop",
    date: "2025-11-10T13:00:00.000Z",
    durationMinutes: 60,
    topic: "Review CV/Portfolio cho vị trí Backend Fresher",
    status: "completed",
  },
  {
    id: 3,
    mentorName: "Trần Kim Ngân",
    mentorTitle: "Data Scientist",
    mentorAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    date: "2025-10-28T14:00:00.000Z",
    durationMinutes: 45,
    topic: "Giới thiệu Machine Learning cơ bản",
    status: "cancelled",
  },
];

const STATUS_TABS: { id: SessionStatus | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "upcoming", label: "Sắp diễn ra" },
  { id: "completed", label: "Hoàn thành" },
  { id: "cancelled", label: "Đã hủy" },
];

export default function MySessions() {
  const [activeTab, setActiveTab] = useState<SessionStatus | "all">("upcoming");

  const filteredSessions = useMemo(() => {
    if (activeTab === "all") return mockSessions;
    return mockSessions.filter((s) => s.status === activeTab);
  }, [activeTab]);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Nếu bạn có NavHeader chung cho mentee thì bật lại: */}
      {/* <MenteeNavHeader /> */}

      <section className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        {/* Title + intro */}
        <div className="mb-6 lg:mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Phiên của tôi
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Quản lý các buổi hẹn 1:1 với mentor: xem lịch sắp tới, lịch sử
              buổi hẹn và các buổi đã hủy.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Giờ hiển thị theo múi giờ hệ thống của bạn</span>
          </div>
        </div>

        {/* Tabs trạng thái */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-100">
          {STATUS_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition",
                  isActive
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* List / empty state */}
        {filteredSessions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ---------- Components ---------- */

function SessionCard({ session }: { session: Session }) {
  const {
    mentorName,
    mentorTitle,
    mentorAvatar,
    date,
    durationMinutes,
    topic,
    status,
    meetingLink,
  } = session;

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isUpcoming = status === "upcoming";
  const isCompleted = status === "completed";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:gap-6 lg:p-6">
        {/* Mentor info */}
        <div className="flex flex-1 items-center gap-4">
          <img
            src={mentorAvatar}
            alt={mentorName}
            className="h-14 w-14 rounded-2xl object-cover bg-slate-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">
                {mentorName}
              </p>
              <StatusBadge status={status} />
            </div>
            <p className="text-xs text-slate-600">{mentorTitle}</p>
            <p className="mt-2 text-xs text-slate-700 line-clamp-2">
              {topic}
            </p>
          </div>
        </div>

        {/* Date / time */}
        <div className="flex flex-col items-start gap-1 text-xs text-slate-600 lg:items-end">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-sky-600"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 2.5v2M14 2.5v2M4.5 6.5h11"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
              />
              <rect
                x={3}
                y={4}
                width={14}
                height={13}
                rx={2}
                stroke="currentColor"
                strokeWidth={1.4}
              />
            </svg>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-sky-600"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx={10}
                cy={10}
                r={7}
                stroke="currentColor"
                strokeWidth={1.4}
              />
              <path
                d="M10 6v4l2.5 2.5"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              {formattedTime} · {durationMinutes} phút
            </span>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-3.5 text-xs lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <p className="text-slate-600">
          Lưu ý: Chuẩn bị câu hỏi trước buổi hẹn để tận dụng thời gian tốt
          nhất.
        </p>

        <div className="flex items-center gap-2">
          {isUpcoming && meetingLink && (
            <a
              href={meetingLink}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-sky-700 hover:to-indigo-700"
            >
              Tham gia buổi hẹn
            </a>
          )}

          {isCompleted && (
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Xem ghi chú
            </Link>
          )}

          {!isUpcoming && !isCompleted && (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Đặt lại lịch
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
        ● Sắp diễn ra
      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100">
        ✓ Hoàn thành
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 ring-1 ring-rose-100">
      ✕ Đã hủy
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-14 text-center shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600">
        <svg
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6h12M7 3v3M13 3v3M5 9h10v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-slate-900">
        Bạn chưa có buổi hẹn nào
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Hãy tìm một mentor phù hợp và đặt buổi hẹn 1:1 đầu tiên để bắt đầu hành
        trình phát triển nghề nghiệp của bạn.
      </p>
      <Link
        to="/mentors"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:from-sky-700 hover:to-indigo-700"
      >
        Tìm mentor ngay
      </Link>
    </div>
  );
}
