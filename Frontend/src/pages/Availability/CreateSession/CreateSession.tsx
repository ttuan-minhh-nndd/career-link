import React, { useState } from "react";

type Slot = {
  id: number;
  mentorId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
};

type CreateSessionResponse = {
  created: number;
  slots: Slot[];
};

export default function CreateSessionPage() {
  const [date, setDate] = useState("2025-12-01");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(60); // phút

  const [result, setResult] = useState<CreateSessionResponse | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // DEMO: mock response y như bạn đưa
    const mock: CreateSessionResponse = {
      created: 3,
      slots: [
        {
          id: 15,
          mentorId: 7,
          startTime: "2025-12-01T14:00:00.000Z",
          endTime: "2025-12-01T15:00:00.000Z",
          isBooked: false,
          createdAt: "2025-11-17T17:55:48.255Z",
          updatedAt: "2025-11-17T17:55:48.255Z",
        },
        {
          id: 16,
          mentorId: 7,
          startTime: "2025-12-01T15:00:00.000Z",
          endTime: "2025-12-01T16:00:00.000Z",
          isBooked: false,
          createdAt: "2025-11-17T17:55:48.255Z",
          updatedAt: "2025-11-17T17:55:48.255Z",
        },
        {
          id: 17,
          mentorId: 7,
          startTime: "2025-12-01T16:00:00.000Z",
          endTime: "2025-12-01T17:00:00.000Z",
          isBooked: false,
          createdAt: "2025-11-17T17:55:48.255Z",
          updatedAt: "2025-11-17T17:55:48.255Z",
        },
      ],
    };

    // Thực tế: gọi API create slots xong setResult(res.data)
    setResult(mock);
  };

  const formatSlotTime = (iso: string) =>
    new Date(iso).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Tạo session mới
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Chọn ngày và khung giờ, hệ thống sẽ tạo các slot mentoring tương ứng.
            </p>
          </div>
        </div>

        {/* Card form */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end"
          >
            {/* Date */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-700">
                Ngày
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Start time */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-700">
                Giờ bắt đầu
              </label>
              <input
                type="time"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            {/* End time */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-700">
                Giờ kết thúc
              </label>
              <input
                type="time"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            {/* Duration */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-700">
                Độ dài mỗi slot (phút)
              </label>
              <input
                type="number"
                min={15}
                step={15}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            {/* Action */}
            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:from-sky-700 hover:to-indigo-700"
              >
                Create Sessions
              </button>
            </div>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Kết quả tạo session
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Hệ thống đã tạo {result.created} slot.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700 ring-1 ring-sky-100">
                Total created: {result.created}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Mentor</th>
                    <th className="px-3 py-2 text-left">Thời gian</th>
                    <th className="px-3 py-2 text-left">Trạng thái</th>
                    <th className="px-3 py-2 text-left">Created At</th>
                    <th className="px-3 py-2 text-left">Updated At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {result.slots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-xs text-slate-800">
                        #{slot.id}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-700">
                        Mentor #{slot.mentorId}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-700">
                        <div className="flex flex-col">
                          <span>{formatSlotTime(slot.startTime)}</span>
                          <span className="text-[11px] text-slate-500">
                            đến {formatSlotTime(slot.endTime)}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 " +
                            (slot.isBooked
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                              : "bg-slate-50 text-slate-700 ring-slate-200")
                          }
                        >
                          {slot.isBooked ? "Đã được đặt" : "Chưa được đặt"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-600">
                        {formatSlotTime(slot.createdAt)}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-600">
                        {formatSlotTime(slot.updatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
