import React, { useMemo, useState } from "react";
// import MenteeNavHeader from "../../components/layout/MenteeNavHeader"; // nếu bạn muốn xài layout chung

type NotificationType =
  | "session_accepted"
  | "session_reminder"
  | "session_feedback"
  | "system";

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string; // ISO
  isRead: boolean;
}

// Demo data – sau này bạn thay bằng API
const seedNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "session_accepted",
    title: "Mentor đã chấp nhận yêu cầu của bạn",
    message:
      "Mentor Phạm Khôi Nguyên đã chấp nhận yêu cầu hẹn 1:1 về lộ trình Java Backend.",
    createdAt: "2025-11-15T09:30:00.000Z",
    isRead: false,
  },
  {
    id: 2,
    type: "session_reminder",
    title: "Nhắc lịch buổi hẹn sắp diễn ra",
    message:
      "Bạn có buổi hẹn với mentor Đỗ Thị Như Ý vào ngày 20/11 lúc 19:30.",
    createdAt: "2025-11-14T07:00:00.000Z",
    isRead: false,
  },
  {
    id: 3,
    type: "session_feedback",
    title: "Đừng quên đánh giá mentor",
    message:
      "Hãy dành 1 phút đánh giá buổi hẹn gần đây với mentor Trần Kim Ngân để cải thiện trải nghiệm cho cộng đồng.",
    createdAt: "2025-11-10T15:00:00.000Z",
    isRead: true,
  },
  {
    id: 4,
    type: "system",
    title: "Cập nhật tính năng mới",
    message:
      "CareerLink vừa cập nhật tính năng lọc mentor theo mục tiêu nghề nghiệp. Hãy thử ngay!",
    createdAt: "2025-11-05T10:00:00.000Z",
    isRead: true,
  },
];

export default function MenteeNotifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(seedNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const filteredNotifications = useMemo(
    () =>
      filter === "all"
        ? notifications
        : notifications.filter((n) => !n.isRead),
    [notifications, filter]
  );

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Nếu dùng NavHeader chung: <MenteeNavHeader /> */}

      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Thông báo
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Xem các cập nhật mới nhất về buổi hẹn, phản hồi từ mentor
              và thông báo hệ thống.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>{unreadCount} thông báo chưa đọc</span>
          </div>
        </div>

        {/* Filters + actions */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={[
                "rounded-full px-4 py-1.5 text-xs font-medium",
                filter === "all"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={[
                "rounded-full px-4 py-1.5 text-xs font-medium",
                filter === "unread"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              Chưa đọc
            </button>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-medium text-sky-700 hover:text-sky-800"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        {/* List / empty state */}
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-14 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3a6 6 0 0 0-6 6v2.586l-.707.707A1 1 0 0 0 6 14h12a1 1 0 0 0 .707-1.707L18 11.586V9a6 6 0 0 0-6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-slate-900">
              Không có thông báo nào
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Khi có mentor chấp nhận yêu cầu, nhắc lịch buổi hẹn hoặc các cập nhật hệ thống, bạn sẽ thấy tại đây.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onToggleRead={() => toggleRead(n.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ---------- Sub components ---------- */

function NotificationCard({
  notification,
  onToggleRead,
}: {
  notification: NotificationItem;
  onToggleRead: () => void;
}) {
  const { title, message, createdAt, isRead, type } = notification;

  const dateObj = new Date(createdAt);
  const formatted = dateObj.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      className={[
        "flex gap-3 rounded-2xl p-4 text-sm shadow-sm ring-1",
        isRead
          ? "bg-white ring-slate-200"
          : "bg-sky-50/80 ring-sky-200",
      ].join(" ")}
    >
      {/* Icon + unread dot */}
      <div className="mt-1 flex flex-col items-center gap-2">
        <NotificationIcon type={type} />
        {!isRead && (
          <span className="h-2 w-2 rounded-full bg-sky-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>
        <p className="mt-1 text-xs text-slate-700">{message}</p>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>{formatted}</span>
          <button
            type="button"
            onClick={onToggleRead}
            className="font-medium text-sky-700 hover:text-sky-800"
          >
            {isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
          </button>
        </div>
      </div>
    </article>
  );
}

function NotificationIcon({ type }: { type: NotificationType }) {
  if (type === "session_accepted") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        ✓
      </span>
    );
  }
  if (type === "session_reminder") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600">
        ⏰
      </span>
    );
  }
  if (type === "session_feedback") {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        ★
      </span>
    );
  }
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
      ℹ
    </span>
  );
}
