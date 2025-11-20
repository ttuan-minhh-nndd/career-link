import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import path from "../../../constants/path";
import EditSessionModal from "../EditSession";
import { useQuery } from "@tanstack/react-query";
import usersApi from "@/apis/auth.api";

// =========================
// TYPES
// =========================
type Session = {
  id: number;
  mentorId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
};

// =========================
// MOCK DATA
// =========================
const sessions: Session[] = [
  {
    id: 1,
    mentorId: 7,
    startTime: "2025-12-01T14:00:00.000Z",
    endTime: "2025-12-01T15:00:00.000Z",
    isBooked: true,
    createdAt: "2025-11-15T12:12:00Z",
    updatedAt: "2025-11-15T12:12:00Z",
  },
  {
    id: 2,
    mentorId: 7,
    startTime: "2025-12-01T15:00:00.000Z",
    endTime: "2025-12-01T16:00:00.000Z",
    isBooked: false,
    createdAt: "2025-11-16T08:00:00Z",
    updatedAt: "2025-11-17T10:00:00Z",
  },
  {
    id: 3,
    mentorId: 7,
    startTime: "2025-12-01T16:00:00.000Z",
    endTime: "2025-12-01T17:00:00.000Z",
    isBooked: false,
    createdAt: "2025-11-16T12:00:00Z",
    updatedAt: "2025-11-16T12:00:00Z",
  },
  {
    id: 4,
    mentorId: 7,
    startTime: "2025-12-02T14:00:00.000Z",
    endTime: "2025-12-02T15:00:00.000Z",
    isBooked: false,
    createdAt: "2025-11-18T09:00:00Z",
    updatedAt: "2025-11-18T09:00:00Z",
  },
];

// =========================
// POPUP DELETE
// =========================
function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  sessionId,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionId: number | null;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        <h2 className="mb-3 text-sm font-semibold text-slate-800">
          Xác nhận xóa session
        </h2>

        <p className="text-sm text-slate-600">
          Bạn có chắc muốn xóa session{" "}
          <b className="text-slate-700">ID {sessionId}</b>? Hành động này không
          thể hoàn tác.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================
// HELPERS
// =========================
function formatDateTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const day = start.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const startTime = start.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { day, timeRange: `${startTime} - ${endTime}` };
}

type DayGroup = {
  dateKey: string;
  dayLabel: string;
  slots: Session[];
};

function groupSessionsByDay(list: Session[]): DayGroup[] {
  const map: Record<string, DayGroup> = {};

  list.forEach((s) => {
    const dateKey = s.startTime.slice(0, 10);
    const { day } = formatDateTimeRange(s.startTime, s.endTime);

    if (!map[dateKey]) {
      map[dateKey] = {
        dateKey,
        dayLabel: day,
        slots: [],
      };
    }

    map[dateKey].slots.push(s);
  });

  return Object.values(map);
}

// =========================
// MAIN COMPONENT
// =========================
export default function MentorSessions() {
  const getMentorsAvailabilityMutation = useQuery({
    queryKey: ["mentorAvailability"],
    queryFn: () => usersApi.getMentorsAvailability(),
  });
  const availabilitiesData = getMentorsAvailabilityMutation.data?.data ?? [];

  const groups = groupSessionsByDay(availabilitiesData);

  // DELETE POPUP
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const openDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    alert("Đã xóa session ID " + deleteId);
    setDeleteOpen(false);
  };

  // EDIT POPUP
  const [editSession, setEditSession] = useState<Session | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);

  const openEdit = (s: Session) => {
    setEditSession(s);
    setEditOpen(true);
  };

  const handleSaveEdit = (updated: { startTime: string; endTime: string }) => {
    console.log("Updated session:", updated);
    alert("Đã cập nhật session!");
    setEditOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-slate-50 to-white">
      <section className="mx-auto max-w-5xl px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
              Mentor sessions
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Session đã tạo
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Quản lý những khung giờ mentoring bạn đã mở cho mentee.
            </p>
          </div>

          <Link
            to={path.create_session}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            <span className="text-base leading-none">＋</span>
            <span>Tạo session mới</span>
          </Link>
        </div>

        {/* List */}
        <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          {/* Header row */}
          <div className="mb-3 hidden grid-cols-5 gap-2 text-[11px] font-medium text-slate-500 md:grid">
            <span>Ngày</span>
            <span>Slot</span>
            <span className="text-right">Tạo</span>
            <span className="text-right">Cập nhật</span>
            <span className="text-right">Thao tác</span>
          </div>

          <div className="divide-y divide-slate-100">
            {groups.map((group) =>
              group.slots.map((s) => {
                const { day, timeRange } = formatDateTimeRange(
                  s.startTime,
                  s.endTime
                );

                const created = new Date(s.createdAt).toLocaleString("vi-VN");
                const updated = new Date(s.updatedAt).toLocaleString("vi-VN");

                return (
                  <div
                    key={s.id}
                    className="grid gap-3 py-3 text-sm text-slate-800 md:grid-cols-5"
                  >
                    {/* Ngày */}
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-sky-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {day}
                        </p>
                      </div>
                    </div>

                    {/* Slot */}
                    <div>
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-800 ring-1 ring-sky-100">
                        {timeRange}
                      </span>
                    </div>

                    {/* Created */}
                    <div className="text-xs text-slate-600 md:text-right">
                      {created}
                    </div>

                    {/* Updated */}
                    <div className="text-xs text-slate-600 md:text-right">
                      {updated}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="rounded-md p-1 text-slate-600 hover:bg-sky-100 hover:text-sky-700 transition"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openDelete(s.id)}
                        className="rounded-md p-1 text-slate-600 hover:bg-red-100 hover:text-red-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* POPUP DELETE */}
      <ConfirmDeleteModal
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        sessionId={deleteId}
      />

      {/* POPUP EDIT */}
      <EditSessionModal
        open={isEditOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        session={editSession}
      />
    </main>
  );
}
