import React, { useState } from "react";
import { X } from "lucide-react";
import { TIME_SLOTS } from "../../../constants/timeslot";

export type EditSessionModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (updated: { startTime: string; endTime: string }) => void;
  session: {
    id: number;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  } | null;
};

function combineDateAndTime(dateStr: string, timeStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const [h, m] = timeStr.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

export default function EditSessionModal({
  open,
  onClose,
  onSave,
  session,
}: EditSessionModalProps) {
  // ❗ ALWAYS RUN HOOKS FIRST (even if open=false)
  const sessionDate = session?.startTime?.slice(0, 10) ?? "";

  const currentSlot = TIME_SLOTS.find(
    (slot) =>
      session &&
      slot.start === session.startTime.slice(11, 16) &&
      slot.end === session.endTime.slice(11, 16)
  );

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(
    currentSlot?.id ?? null
  );


  if (!open || !session) return null;

  const handleSave = () => {
    const slot = TIME_SLOTS.find((s) => s.id === selectedSlotId);
    if (!slot) return;

    onSave({
      startTime: combineDateAndTime(sessionDate, slot.start),
      endTime: combineDateAndTime(sessionDate, slot.end),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">
            Chỉnh sửa session
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date */}
        <p className="mb-3 text-xs text-slate-500">
          Ngày: <span className="font-medium text-slate-700">{sessionDate}</span>
        </p>

        {/* Slot list */}
        <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-slate-100">
          {TIME_SLOTS.map((slot) => {
            const isCurrent = slot.id === selectedSlotId;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition
                  ${
                    isCurrent
                      ? "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/60"
                  }
                `}
              >
                <span className="font-medium">{slot.label}</span>
                {isCurrent && (
                  <span className="text-xs font-semibold text-sky-600">
                    Đang chọn
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            disabled={!selectedSlotId}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow
              ${
                selectedSlotId
                  ? "bg-sky-600 hover:bg-sky-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}