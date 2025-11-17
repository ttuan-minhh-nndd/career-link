import React from "react";

type SessionStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface MentorSession {
  id: number;
  menteeName: string;
  menteeAvatar: string;
  topic: string;
  date: string; // ISO string
  timeRange: string;
  status: SessionStatus;
  note?: string;
}

const upcomingSessions: MentorSession[] = [
  {
    id: 1,
    menteeName: "Nguyễn Hoàng Minh",
    menteeAvatar: "https://i.pravatar.cc/64?img=21",
    topic: "Review CV & định hướng Java Backend",
    date: "2025-11-15T19:30:00.000Z",
    timeRange: "19:30 - 20:30",
    status: "confirmed",
    note: "Mentee đang chuẩn bị phỏng vấn Fresher tại FPT Software.",
  },
  {
    id: 2,
    menteeName: "Trần Thu Uyên",
    menteeAvatar: "https://i.pravatar.cc/64?img=32",
    topic: "UI/UX Portfolio review",
    date: "2025-11-16T20:00:00.000Z",
    timeRange: "20:00 - 21:00",
    status: "confirmed",
  },
  {
    id: 3,
    menteeName: "Lê Anh Khoa",
    menteeAvatar: "https://i.pravatar.cc/64?img=15",
    topic: "Career path Data Engineer",
    date: "2025-11-18T20:00:00.000Z",
    timeRange: "20:00 - 21:00",
    status: "completed",
  },
];

const pendingRequests: MentorSession[] = [
  {
    id: 4,
    menteeName: "Phạm Ngọc Châu",
    menteeAvatar: "https://i.pravatar.cc/64?img=45",
    topic: "Lộ trình DevOps cho sinh viên năm 3",
    date: "2025-11-19T19:30:00.000Z",
    timeRange: "19:30 - 20:30",
    status: "pending",
    note: "Ưu tiên slot tối trong tuần.",
  },
  {
    id: 5,
    menteeName: "Đỗ Nhật Nam",
    menteeAvatar: "https://i.pravatar.cc/64?img=36",
    topic: "Chuẩn bị phỏng vấn Product Manager",
    date: "2025-11-20T20:00:00.000Z",
    timeRange: "20:00 - 21:00",
    status: "pending",
  },
];

export default function MentorSchedulePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Lịch mentoring
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Quản lý phiên coaching, yêu cầu mới và lịch hẹn sắp diễn ra.
          </p>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-1.5 text-sky-700 ring-1 ring-sky-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold shadow-sm">
              1
            </span>
            <span>Buổi hôm nay</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-indigo-50 px-3 py-1.5 text-indigo-700 ring-1 ring-indigo-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold shadow-sm">
              3
            </span>
            <span>Trong tuần</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-3 py-1.5 text-amber-700 ring-1 ring-amber-100">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold shadow-sm">
              {pendingRequests.length}
            </span>
            <span>Yêu cầu chờ duyệt</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="mb-6 rounded-2xl bg-slate-50/60 p-4 ring-1 ring-slate-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div>
              <span className="block text-[11px] font-medium text-slate-500 mb-1">
                Ngày
              </span>
              <input
                type="date"
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div>
              <span className="block text-[11px] font-medium text-slate-500 mb-1">
                Trạng thái
              </span>
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400">
                <option>Tất cả</option>
                <option>Đã xác nhận</option>
                <option>Chờ xác nhận</option>
                <option>Đã hoàn thành</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
              Hôm nay
            </button>
            <button className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
              7 ngày tới
            </button>
            <button className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-1.5 font-medium text-white shadow-sm hover:from-sky-700 hover:to-indigo-700">
              + Tạo slot trống
            </button>
          </div>
        </div>
      </section>

      {/* Main content: 2 cột */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT: upcoming sessions */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Phiên hôm nay & sắp tới
            </h2>
            <span className="text-[11px] text-slate-500">
              {upcomingSessions.length} phiên
            </span>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((s) => (
              <article
                key={s.id}
                className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
              >
                <img
                  src={s.menteeAvatar}
                  alt={s.menteeName}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-100"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {s.menteeName}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {s.topic}
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>🗓</span>
                      {new Date(s.date).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>⏰</span>
                      {s.timeRange}
                    </span>
                  </div>

                  {s.note && (
                    <p className="mt-2 text-[11px] text-slate-500">
                      {s.note}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <button className="rounded-lg bg-sky-50 px-3 py-1 font-medium text-sky-700 hover:bg-sky-100">
                      Xem chi tiết
                    </button>
                    {s.status === "confirmed" && (
                      <button className="rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-1 font-medium text-white shadow-sm hover:from-sky-700 hover:to-indigo-700">
                        Vào phòng họp
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT: pending requests */}
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Yêu cầu chờ duyệt
            </h2>
            <span className="text-[11px] text-amber-600">
              {pendingRequests.length} yêu cầu
            </span>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((s) => (
              <article
                key={s.id}
                className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
              >
                <img
                  src={s.menteeAvatar}
                  alt={s.menteeName}
                  className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-100"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-900">
                        {s.menteeName}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-slate-600">
                        {s.topic}
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>🗓</span>
                      {new Date(s.date).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>⏰</span>
                      {s.timeRange}
                    </span>
                  </div>

                  {s.note && (
                    <p className="mt-2 text-[11px] text-slate-500">
                      {s.note}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <button className="rounded-lg bg-emerald-50 px-3 py-1 font-medium text-emerald-700 hover:bg-emerald-100">
                      Chấp nhận
                    </button>
                    <button className="rounded-lg bg-slate-50 px-3 py-1 font-medium text-slate-600 hover:bg-slate-100">
                      Từ chối
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold";

  if (status === "confirmed") {
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700`}>
        Đã xác nhận
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>
        Chờ xác nhận
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className={`${base} bg-slate-100 text-slate-600`}>
        Đã hoàn thành
      </span>
    );
  }
  return (
    <span className={`${base} bg-rose-50 text-rose-700`}>
      Đã hủy
    </span>
  );
}
