import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../Logo";
import SearchButton from "../SearchButton";
import path from "../../constants/path";

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
  createdAt: string;
  isRead: boolean;
}

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
    message: "Bạn có buổi hẹn với mentor Đỗ Thị Như Ý vào ngày 20/11 lúc 19:30.",
    createdAt: "2025-11-14T07:00:00.000Z",
    isRead: false,
  },
  {
    id: 3,
    type: "session_feedback",
    title: "Đừng quên đánh giá mentor",
    message:
      "Hãy đánh giá buổi hẹn gần đây với mentor Trần Kim Ngân để cải thiện trải nghiệm cho cộng đồng.",
    createdAt: "2025-11-10T15:00:00.000Z",
    isRead: true,
  },
];

export default function MenteeNavHeader() {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openNotifMenu, setOpenNotifMenu] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(seedNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const toggleRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );

  // --- refs for click outside ---
  const searchRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setOpenSearchMenu(false);

      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setOpenNotifMenu(false);

      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setOpenProfileMenu(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* LEFT: Logo */}
        <Link to={path.mentee_home}>
          <Logo className="h-8 w-auto" />
        </Link>

        {/* CENTER menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to={path.mentee_home}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-sky-600"
                : "text-sm font-medium text-slate-600 hover:text-slate-900"
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to={path.get_mentors}
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-sky-600"
                : "text-sm font-medium text-slate-600 hover:text-slate-900"
            }
          >
            Mentors
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* 🔍 SEARCH POPUP */}
          <div className="relative" ref={searchRef}>
            <SearchButton
              onClick={() => {
                setOpenSearchMenu((v) => !v);
                setOpenNotifMenu(false);
                setOpenProfileMenu(false);
              }}
            />

            {openSearchMenu && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 p-3 text-sm">
                <div className="flex items-center gap-2 bg-slate-50 ring-1 ring-slate-200 rounded-xl px-3 py-2">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M8.5 3a5.5 5.5 0 0 1 4.384 8.87l3.123 3.123a.75.75 0 1 1-1.06 1.06l-3.123-3.122A5.5 5.5 0 1 1 8.5 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <input
                    autoFocus
                    placeholder="Tìm mentor theo kỹ năng, lĩnh vực..."
                    className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <p className="mt-3 mb-1 text-[11px] font-semibold text-slate-500">
                  Gợi ý nhanh
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Java Backend", "UI/UX", "Data Analyst", "Career Coaching"].map(
                    (t) => (
                      <button
                        key={t}
                        className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100 hover:bg-sky-100"
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-3 border-t border-slate-100 pt-2">
                  <Link
                    to={path.get_mentors}
                    className="text-[11px] font-medium text-sky-700 hover:text-sky-800"
                  >
                    Mở trang tìm kiếm mentor →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 🔔 NOTIFICATION POPUP */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setOpenNotifMenu((v) => !v);
                setOpenSearchMenu(false);
                setOpenProfileMenu(false);
              }}
              className="relative h-9 w-9 flex items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 hover:bg-sky-50"
            >
              <svg
                className="h-4 w-4 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3a6 6 0 0 0-6 6v2.586l-.707.707A1 1 0 0 0 6 14h12a1 1 0 0 0 .707-1.707L18 11.586V9a6 6 0 0 0-6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M10 18a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>

              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-semibold rounded-full px-[4px] py-[1px]">
                  {unreadCount}
                </span>
              )}
            </button>

            {openNotifMenu && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg ring-1 ring-slate-200 py-2">
                <div className="flex justify-between px-3 pb-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Thông báo</p>
                    <p className="text-[11px] text-slate-500">{unreadCount} chưa đọc</p>
                  </div>

                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-medium text-sky-700"
                  >
                    Đánh dấu tất cả
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto px-1 space-y-1">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => toggleRead(n.id)}
                      className={`flex w-full gap-2 rounded-xl px-3 py-2 text-left text-xs ${
                        n.isRead ? "bg-white" : "bg-sky-50/70"
                      } hover:bg-slate-50`}
                    >
                      <NotificationIcon type={n.type} />

                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{n.title}</p>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-slate-400 block">
                          {new Date(n.createdAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {!n.isRead && <span className="h-2 w-2 rounded-full bg-sky-600 mt-1" />}
                    </button>
                  ))}
                </div>

                <Link
                  to={path.mentee_notifications}
                  className="block px-3 py-2 text-[11px] font-medium text-sky-700 hover:bg-slate-50 border-t border-slate-100"
                >
                  Xem tất cả →
                </Link>
              </div>
            )}
          </div>

          {/* 👤 PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setOpenProfileMenu((v) => !v);
                setOpenNotifMenu(false);
                setOpenSearchMenu(false);
              }}
              className="flex items-center gap-2 rounded-full bg-slate-50 pl-1 pr-3 py-1 ring-1 ring-slate-200 hover:bg-sky-50"
            >
              <img
                src="https://i.pravatar.cc/64?img=8"
                className="h-8 w-8 rounded-full"
                alt=""
              />
              <span className="hidden sm:inline text-sm text-slate-800 font-medium">
                Mentee
              </span>

              <svg
                className="h-4 w-4 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.24 4.52a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
              </svg>
            </button>

            {openProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-slate-100 w-44 py-2 text-sm">
                <Link
                  to={path.mentee_my_sessions}
                  className="block px-3 py-2 hover:bg-slate-50"
                >
                  My sessions
                </Link>
                <Link
                  to={path.mentee_profile}
                  className="block px-3 py-2 hover:bg-slate-50"
                >
                  My account
                </Link>
              </div>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}

/* icon renderer */
function NotificationIcon({ type }: { type: NotificationType }) {
  const base =
    "mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold";

  switch (type) {
    case "session_accepted":
      return <span className={`${base} bg-emerald-50 text-emerald-600`}>✓</span>;
    case "session_reminder":
      return <span className={`${base} bg-sky-50 text-sky-600`}>⏰</span>;
    case "session_feedback":
      return <span className={`${base} bg-amber-50 text-amber-600`}>★</span>;
    default:
      return <span className={`${base} bg-slate-100 text-slate-500`}>ℹ</span>;
  }
}
