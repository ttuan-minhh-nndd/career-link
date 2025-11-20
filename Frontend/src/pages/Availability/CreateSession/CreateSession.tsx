import { useMemo, useState } from "react";

type Day = {
  key: string;
  label: string;
};

type TimeSlot = {
  id: string;
  label: string;
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
};

const DAYS: Day[] = [
  { key: "mon", label: "Thứ 2" },
  { key: "tue", label: "Thứ 3" },
  { key: "wed", label: "Thứ 4" },
  { key: "thu", label: "Thứ 5" },
  { key: "fri", label: "Thứ 6" },
  { key: "sat", label: "Thứ 7" },
  { key: "sun", label: "Chủ nhật" },
];


const TIME_SLOTS: TimeSlot[] = [
  { id: "1", label: "Tiết 1 (07:30 - 08:15)", start: "07:30", end: "08:15" },
  { id: "2", label: "Tiết 2 (08:15 - 09:00)", start: "08:15", end: "09:00" },
  { id: "3", label: "Tiết 3 (09:00 - 09:45)", start: "09:00", end: "09:45" },
  { id: "4", label: "Tiết 4 (10:00 - 10:45)", start: "10:00", end: "10:45" },
  { id: "5", label: "Tiết 5 (10:45 - 11:30)", start: "10:45", end: "11:30" },
  { id: "6", label: "Tiết 6 (13:00 - 13:45)", start: "13:00", end: "13:45" },
  { id: "7", label: "Tiết 7 (13:45 - 14:30)", start: "13:45", end: "14:30" },
  { id: "8", label: "Tiết 8 (14:30 - 15:15)", start: "14:30", end: "15:15" },
];

type SelectedKey = string; // `${day.key}-${slot.id}`

function combineDateAndTime(dateStr: string, timeStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const [h, m] = timeStr.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function getDateOfWeek(startDate: string, offset: number) {
  const d = new Date(startDate + "T00:00:00");
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export default function MentorCreateSessions() {
  // ngày bắt đầu tuần – default: hôm nay (dạng YYYY-MM-DD)
  const todayISO = useMemo(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }, []);

  const [weekStart, setWeekStart] = useState<string>(todayISO);
  const [selected, setSelected] = useState<Set<SelectedKey>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<"select" | "deselect">("select");

  const toggleCell = (dayKey: string, slotId: string, mode?: "select" | "deselect") => {
    setSelected((prev) => {
      const next = new Set(prev);
      const key = `${dayKey}-${slotId}`;
      const isSelected = next.has(key);
      const shouldSelect =
        mode === "select" ? true : mode === "deselect" ? false : !isSelected;

      if (shouldSelect) {
        next.add(key);
      } else {
        next.delete(key);
      }

      return next;
    });
  };

  const handleMouseDown = (dayKey: string, slotId: string) => {
    const key = `${dayKey}-${slotId}`;
    const isSelected = selected.has(key);
    const mode: "select" | "deselect" = isSelected ? "deselect" : "select";
    setDragMode(mode);
    setIsDragging(true);
    toggleCell(dayKey, slotId, mode);
  };

  const handleMouseEnter = (dayKey: string, slotId: string) => {
    if (!isDragging) return;
    toggleCell(dayKey, slotId, dragMode);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Tạo payload slots để gửi API
  const slotsPayload = useMemo(() => {
    const result: { startTime: string; endTime: string }[] = [];

    selected.forEach((key) => {
      const [dayKey, slotId] = key.split("-");
      const dayIndex = DAYS.findIndex((d) => d.key === dayKey);
      const slot = TIME_SLOTS.find((s) => s.id === slotId);
      if (dayIndex === -1 || !slot) return;

      const dateStr = getDateOfWeek(weekStart, dayIndex); // ngày cụ thể của tuần
      const startTime = combineDateAndTime(dateStr, slot.start);
      const endTime = combineDateAndTime(dateStr, slot.end);

      result.push({ startTime, endTime });
    });

    // sort theo startTime
    result.sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    return result;
  }, [selected, weekStart]);

  const handleCreateSessions = () => {
    if (!slotsPayload.length) return;

    const payload = { slots: slotsPayload };

    // TODO: call API create-slot ở đây
    console.log("Payload gửi API:", payload);
    alert(`Sẽ tạo ${slotsPayload.length} session. Xem console để xem payload.`);
  };

  return (
    <section
      className="min-h-screen bg-slate-50"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Tạo session 
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Kéo chọn các khung giờ cố định trong tuần để tạo nhiều session cùng lúc.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-xs md:items-end">
            <label className="text-[11px] font-medium text-slate-600">
              Tuần bắt đầu từ
            </label>
            <input
              type="date"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            <p className="text-[11px] text-slate-500">
              Các session sẽ được tạo theo ngày trong tuần này.
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="overflow-x-auto rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          {/* Header row for days */}
          <div className="grid grid-cols-[100px_repeat(7,minmax(130px,1fr))] border-b border-slate-200 text-xs font-semibold text-slate-600">
            <div className="px-2 py-2 text-center text-[11px] uppercase tracking-wide text-slate-500">
              Thời gian
            </div>
            {DAYS.map((d) => (
              <div
                key={d.key}
                className="px-2 py-2 text-center text-[11px] uppercase tracking-wide text-slate-600"
              >
                {d.label}
              </div>
            ))}
          </div>

          {/* Rows – time slots */}
          <div className="divide-y divide-slate-100">
            {TIME_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="grid grid-cols-[100px_repeat(7,minmax(130px,1fr))] text-xs"
              >
                {/* Time label on the left */}
                <div className="flex flex-col justify-center border-r border-slate-100 px-2 py-3 text-[11px] text-slate-600">
                  <span className="text-[11px] text-slate-500">
                    {slot.start} - {slot.end}
                  </span>
                </div>

                {/* Cells: each day */}
                {DAYS.map((day) => {
                  const key = `${day.key}-${slot.id}`;
                  const isSelected = selected.has(key);

                  return (
                    <button
                      key={day.key}
                      type="button"
                      onMouseDown={() => handleMouseDown(day.key, slot.id)}
                      onMouseEnter={() => handleMouseEnter(day.key, slot.id)}
                      className={`m-1 flex min-h-[56px] flex-col items-center justify-center rounded-xl border text-[11px] transition
                        ${
                          isSelected
                            ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm ring-2 ring-sky-100"
                            : "border-slate-200 bg-slate-50/40 text-slate-600 hover:border-sky-300 hover:bg-sky-50/60"
                        }
                      `}
                    >
                      {isSelected ? (
                        <>
                          <span className="font-medium">Đã chọn</span>
                          <span className="mt-0.5 text-[10px] text-slate-600">
                            {slot.start} - {slot.end}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px]">Chọn slot</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer summary */}
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] text-slate-500">
                Đã chọn{" "}
                <span className="font-semibold text-sky-700">
                  {slotsPayload.length}
                </span>{" "}
                khung giờ.
              </p>
              {slotsPayload.length > 0 && (
                <p className="mt-1 max-w-md text-[11px] text-slate-500">
                  Khi bấm <span className="font-semibold">Tạo session</span>, hệ
                  thống sẽ tạo ra {slotsPayload.length} session tương ứng với các
                  khung giờ đã chọn.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!slotsPayload.length}
              onClick={handleCreateSessions}
              className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition
                ${
                  slotsPayload.length
                    ? "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100"
                    : "cursor-not-allowed bg-slate-300"
                }
              `}
            >
              Tạo {slotsPayload.length || ""} session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
