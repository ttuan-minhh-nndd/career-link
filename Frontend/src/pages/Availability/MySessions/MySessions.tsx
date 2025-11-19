import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import path from "../../../constants/path";
import usersApi from "../../../apis/auth.api";

// type Session = {
//   id: number;
//   mentorId: number;
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

// const sessions: Session[] = [
//   {
//     id: 1,
//     mentorId: 7,
//     startTime: "2025-12-01T14:00:00.000Z",
//     endTime: "2025-12-01T15:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-16T06:34:06.816Z",
//     updatedAt: "2025-11-16T06:34:06.816Z",
//   },
//   {
//     id: 3,
//     mentorId: 7,
//     startTime: "2025-12-01T19:00:00.000Z",
//     endTime: "2025-12-01T20:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-16T06:34:06.816Z",
//     updatedAt: "2025-11-16T06:34:06.816Z",
//   },
//   {
//     id: 4,
//     mentorId: 7,
//     startTime: "2025-12-01T14:00:00.000Z",
//     endTime: "2025-12-01T15:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T16:31:19.650Z",
//     updatedAt: "2025-11-17T16:31:19.650Z",
//   },
//   {
//     id: 5,
//     mentorId: 7,
//     startTime: "2025-12-01T15:00:00.000Z",
//     endTime: "2025-12-01T16:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T16:31:19.650Z",
//     updatedAt: "2025-11-17T16:31:19.650Z",
//   },
//   {
//     id: 6,
//     mentorId: 7,
//     startTime: "2025-12-01T16:00:00.000Z",
//     endTime: "2025-12-01T17:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T16:31:19.650Z",
//     updatedAt: "2025-11-17T16:31:19.650Z",
//   },
//   {
//     id: 7,
//     mentorId: 7,
//     startTime: "2025-12-01T14:00:00.000Z",
//     endTime: "2025-12-01T15:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:17:06.161Z",
//     updatedAt: "2025-11-17T17:17:06.161Z",
//   },
//   {
//     id: 8,
//     mentorId: 7,
//     startTime: "2025-12-01T15:00:00.000Z",
//     endTime: "2025-12-01T16:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:17:06.161Z",
//     updatedAt: "2025-11-17T17:17:06.161Z",
//   },
//   {
//     id: 9,
//     mentorId: 7,
//     startTime: "2025-12-01T16:00:00.000Z",
//     endTime: "2025-12-01T17:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:17:06.161Z",
//     updatedAt: "2025-11-17T17:17:06.161Z",
//   },
//   {
//     id: 10,
//     mentorId: 7,
//     startTime: "2025-12-01T14:00:00.000Z",
//     endTime: "2025-12-01T15:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:19:20.746Z",
//     updatedAt: "2025-11-17T17:19:20.746Z",
//   },
//   {
//     id: 11,
//     mentorId: 7,
//     startTime: "2025-12-01T15:00:00.000Z",
//     endTime: "2025-12-01T16:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:19:20.746Z",
//     updatedAt: "2025-11-17T17:19:20.746Z",
//   },
//   {
//     id: 12,
//     mentorId: 7,
//     startTime: "2025-12-01T14:00:00.000Z",
//     endTime: "2025-12-01T15:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:19:23.744Z",
//     updatedAt: "2025-11-17T17:19:23.744Z",
//   },
//   {
//     id: 13,
//     mentorId: 7,
//     startTime: "2025-12-01T15:00:00.000Z",
//     endTime: "2025-12-01T16:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:19:23.744Z",
//     updatedAt: "2025-11-17T17:19:23.744Z",
//   },
//   {
//     id: 14,
//     mentorId: 7,
//     startTime: "2025-12-01T16:00:00.000Z",
//     endTime: "2025-12-01T17:00:00.000Z",
//     isBooked: false,
//     createdAt: "2025-11-17T17:19:23.744Z",
//     updatedAt: "2025-11-17T17:19:23.744Z",
//   },
// ];

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

export default function MentorSessions() {
  const getMentorsAvailabilityMutation = useQuery({
    queryKey: ["mentorAvailability"],
    queryFn: () => usersApi.getMentorsAvailability(),
  });

  const getMentorsAvailability =
    getMentorsAvailabilityMutation.data?.data ?? [];

  const sortedSessions = [...getMentorsAvailability].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Session đã tạo
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Quản lý các khung giờ mentoring bạn đã mở cho mentee.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Nút Create */}
            <Link
              to={path.create_session}
              className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:from-sky-700 hover:to-indigo-700"
            >
              + Create
            </Link>
          </div>
        </div>
        {/* List */}
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span className="w-1/3">Thời gian</span>
            <span className="w-1/4">Trạng thái</span>
            <span className="w-1/3">Ngày tạo / cập nhật</span>
          </div>

          <div className="divide-y divide-slate-100">
            {sortedSessions.map((s) => {
              const { day, timeRange } = formatDateTimeRange(
                s.startTime,
                s.endTime
              );

              const created = new Date(s.createdAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              const updated = new Date(s.updatedAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={s.id}
                  className="flex items-start py-3 text-sm text-slate-800"
                >
                  {/* Thời gian */}
                  <div className="w-1/3">
                    <p className="text-xs font-medium text-slate-900">{day}</p>
                    <p className="text-xs text-slate-600">{timeRange}</p>
                  </div>

                  {/* Trạng thái */}
                  <div className="w-1/4 flex items-center">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 " +
                        (s.isBooked
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                          : "bg-slate-50 text-slate-700 ring-slate-200")
                      }
                    >
                      {s.isBooked ? "Đã được đặt" : "Chưa được đặt"}
                    </span>
                  </div>

                  {/* Created & Updated */}
                  <div className="w-1/4">
                    <p className="text-[11px] text-slate-500">Tạo lúc</p>
                    <p className="text-xs text-slate-700">{created}</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-[11px] text-slate-500">Cập nhật lúc</p>
                    <p className="text-xs text-slate-700">{updated}</p>
                  </div>
                </div>
              );
            })}

            {sortedSessions.length === 0 && (
              <div className="py-6 text-center text-sm text-slate-500">
                Bạn chưa tạo session nào.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
