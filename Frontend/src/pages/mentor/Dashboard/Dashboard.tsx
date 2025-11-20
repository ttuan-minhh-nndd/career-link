import { AppContext } from "../../../../context/app.context";
import {
  User,
  Wallet,
  BadgeCheck,
  CalendarClock,
  Clock3,
  ListChecks,
} from "lucide-react";
import { useContext } from "react";

/* =========================
    RANDOM SESSION LOGIC 
========================= */

type Session = {
  id: string;
  start: string;
  end: string;
  title: string;
};

const avail = [
  "Mon 10:00",
  "Tue 17:00",
  "Wed 12:30",
  "Thu 20:00",
  "Fri 10:30",
  "Sat 18:00",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SESSION_TITLES = [
  "1:1 Mentoring",
  "Review CV",
  "Mock Interview",
  "Career Orientation",
  "Portfolio Feedback",
];

// Một số khung giờ mẫu (start/end)
const TIME_SLOTS = [
  { start: "09:00", end: "10:00" },
  { start: "10:30", end: "11:30" },
  { start: "13:30", end: "14:30" },
  { start: "15:00", end: "16:00" },
  { start: "19:00", end: "20:00" },
  { start: "20:00", end: "21:00" },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random sessions for 1 day
function generateRandomSessionsForDay(day: string): Session[] {
  if (day === "Sun" && Math.random() > 0.3) return [];

  const numSessions = getRandomInt(1, 3);
  const usedSlots = new Set<number>();
  const sessions: Session[] = [];

  for (let i = 0; i < numSessions; i++) {
    let slotIndex = getRandomInt(0, TIME_SLOTS.length - 1);
    while (usedSlots.has(slotIndex)) {
      slotIndex = getRandomInt(0, TIME_SLOTS.length - 1);
    }
    usedSlots.add(slotIndex);

    const time = TIME_SLOTS[slotIndex];
    const title = SESSION_TITLES[getRandomInt(0, SESSION_TITLES.length - 1)];

    sessions.push({
      id: `${day}-${i}`,
      start: time.start,
      end: time.end,
      title,
    });
  }

  return sessions;
}

// Generate weekly data once
const WEEKLY_SESSIONS: Record<string, Session[]> = days.reduce(
  (acc, day) => {
    acc[day] = generateRandomSessionsForDay(day);
    return acc;
  },
  {} as Record<string, Session[]>
);

/* =========================
        COMPONENT 
========================= */

export default function MentorDashboard() {
  const { profile } = useContext(AppContext);

  return (
    <section className="relative min-h-screen bg-slate-50/80 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#38bdf81a,_transparent_55%),_radial-gradient(circle_at_bottom,_#4f46e51a,_transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl space-y-8 px-4">
        {/* =========================
            TOP SECTION (2 COLUMNS)
        ========================== */}
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* LEFT MAIN COLUMN */}
          <div className="flex-1 space-y-6">
            {/* WELCOME CARD */}
            <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 p-6 text-white shadow-xl lg:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="mt-1 text-2xl font-bold">
                    Chào mừng trở lại,{" "}
                    <span className="whitespace-nowrap">
                      Mentor {profile.name}
                    </span>
                  </h1>
                  <p className="mt-2 text-sm text-sky-50/90">
                    Quản lý lịch rảnh, phiên mentoring và thu nhập trong tuần.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <div className="flex items-center gap-1 font-semibold">
                      <BadgeCheck className="h-3 w-3" /> Mentor cấp cao
                    </div>
                    <div className="text-sky-100/90">
                      Chuyên ngành Career & CV
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/15 p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-sky-100/90">
                      <Wallet className="h-4 w-4" />
                      Số dư ví
                    </div>
                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px]">
                      Có thể rút
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-extrabold">5.050.000 VND</p>
                  <p className="mt-1 text-xs text-sky-100/90">
                    +350.000 VND tuần này
                  </p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4">
                  <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-sky-100/90">
                    <BadgeCheck className="h-4 w-4" />
                    Sessions thành công
                  </div>
                  <p className="mt-2 text-2xl font-extrabold">100</p>
                  <p className="mt-1 text-xs text-sky-100/90">
                    Tỉ lệ hoàn thành:{" "}
                    <span className="font-semibold text-white">98%</span>
                  </p>
                </div>
              </div>

              {/* AVAILABILITY */}
              <div className="mt-5 rounded-2xl bg-white p-4 text-slate-800 shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Clock3 className="h-3 w-3" />
                      Lịch rảnh trong tuần
                    </p>
                    <p className="text-xs text-slate-400">
                      Học viên có thể đặt slot trực tiếp.
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {avail.map((t) => (
                    <button
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 shadow-sm hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Clock3 className="h-3 w-3" />
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* WEEKLY SCHEDULE */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-sky-600" />
                  <h3 className="text-lg font-bold">Lịch phiên trong tuần</h3>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                {days.map((d) => {
                  const daySessions = WEEKLY_SESSIONS[d];
                  const hasSessions = daySessions.length > 0;

                  return (
                    <div
                      key={d}
                      className="rounded-2xl border bg-slate-50/60 p-3 hover:bg-sky-50"
                    >
                      <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase">
                        {d}
                        {hasSessions ? (
                          <CalendarClock className="h-3 w-3 text-sky-600" />
                        ) : (
                          <Clock3 className="h-3 w-3 text-slate-300" />
                        )}
                      </div>

                      {hasSessions ? (
                        <div className="mt-2 space-y-2">
                          {daySessions.map((s) => (
                            <div
                              key={s.id}
                              className="rounded-xl bg-white px-3 py-2 text-[11px] text-slate-700 shadow-sm"
                            >
                              <div className="font-semibold">
                                {s.start} – {s.end}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {s.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 rounded-xl border border-dashed bg-white/40 px-3 py-3 text-[11px] text-slate-400">
                          Chưa có phiên nào.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full space-y-4 lg:w-80">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-sky-600" />
                <h4 className="text-sm font-semibold">Phiên sắp diễn ra</h4>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock3 className="h-3 w-3" />
                    Hôm nay • 20:00
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Mock Interview
                  </p>
                </div>

                <div className="rounded-2xl border border-dashed p-3 text-xs">
                  <p className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock3 className="h-3 w-3" />
                    Ngày mai • 13:30
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Review CV
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-slate-50 shadow-sm">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <h4 className="text-sm font-semibold">
                  Tips cho mentor tuần này
                </h4>
              </div>
              <p className="mt-2 text-xs">
                Gửi tài liệu trước cho học viên để buổi mentoring hiệu quả hơn.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
