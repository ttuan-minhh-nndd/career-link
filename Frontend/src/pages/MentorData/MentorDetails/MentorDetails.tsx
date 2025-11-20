import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../../constants/path";
import ConfirmBookingModal from "../../../components/ConfimBookingModal";
import usersApi from "@/apis/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

type AvailableSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

// type MentorDetailData = {
//   userId: number;
//   name: string;
//   email: string;
//   avatarUrl: string | null;
//   bio: string | null;
//   jobTitle: string | null;
//   hourlyRate: string;
//   averageRating: string;
//   totalReviews: number;
//   expertiseTags: string[];
//   availableSlots: AvailableSlot[];
// };

// // 👉 MOCK DATA
// const MOCK_MENTOR: MentorDetailData = {
//   userId: 7,
//   name: "Ruby Lieu",
//   email: "rubylieu@testgmail.com",
//   avatarUrl: null,
//   bio: "Hi, my name is Ruby! It's a pleasure to have you in my network!",
//   jobTitle:
//     "PhD, Senior Lecturer in Digital Marketing @ International University, Vietnam National University, HCMC",
//   hourlyRate: "69.00",
//   averageRating: "4.80",
//   totalReviews: 12,
//   expertiseTags: ["Digital Marketing", "Performance Marketing", "Branding"],
//   availableSlots: [
//     {
//       id: 5,
//       startTime: "2025-12-01T15:00:00.000Z",
//       endTime: "2025-12-01T16:00:00.000Z",
//     },
//     {
//       id: 6,
//       startTime: "2025-12-01T16:00:00.000Z",
//       endTime: "2025-12-01T17:00:00.000Z",
//     },
//     {
//       id: 7,
//       startTime: "2025-12-01T14:00:00.000Z",
//       endTime: "2025-12-01T15:00:00.000Z",
//     },
//     {
//       id: 8,
//       startTime: "2025-12-01T15:00:00.000Z",
//       endTime: "2025-12-01T16:00:00.000Z",
//     },
//   ],
// };

export default function MentorDetailPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  //   const mentorsData = useQuery({
  //     queryKey: ["mentors"],
  //     queryFn: () => usersApi.getMentors(),
  //   });
  //   const mentors = mentorsData.data?.data ?? [];

  const { id } = useParams<{ id: string }>();
  const mentorId = Number(id);

  const navigate = useNavigate();

  const { data: mentorDetailsData } = useQuery({
    queryKey: ["mentors_detail", mentorId],
    queryFn: () => usersApi.getMentorDetails(mentorId),
    enabled: !!mentorId,
  });

  const mentor = mentorDetailsData?.data ?? null;

  const sortedSlots = useMemo(() => {
    if (!mentor?.availableSlots) return [];
    return [...mentor.availableSlots].sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, [mentor]);

  const handleSelectSlot = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    setShowConfirm(true);

    console.log("Selected slot:", {
      mentorId: mentor?.userId,
      slotId: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  };

  const handleConfirmBooking = () => {
    if (!mentor || !selectedSlot) return;

    navigate(path.booking, {
      state: {
        mentorId: mentor.userId,
        mentorName: mentor.name,
        slotId: selectedSlot.id,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      },
    });
  };

  //   if (loading) {
  //     return (
  //       <section className="min-h-screen bg-blue-50">
  //         <div className="mx-auto flex max-w-4xl items-center justify-center px-4 py-16">
  //           <div className="rounded-xl bg-white px-4 py-3 text-sm text-blue-700 shadow-sm border border-blue-100">
  //             Đang tải thông tin mentor (mock)...
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   }

  if (!mentor) {
    return (
      <section className="min-h-screen bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-blue-800 shadow-sm border border-red-100">
            Không tìm thấy mentor.
          </div>
        </div>
      </section>
    );
  }

  const avatarSrc =
    mentor.avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}`;

  const ratingValue = Number(mentor.averageRating) || 0;
  const hourly = Number(mentor.hourlyRate || "0");

  return (
    <section className="min-h-screen bg-blue-50/40">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 bg-white hover:bg-blue-50"
          >
            <span className="text-base">←</span>
            <span>Quay lại</span>
          </button>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
              Mentor Profile
            </p>
            <h1 className="text-lg font-semibold text-slate-800">
              Thông tin chi tiết mentor
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* LEFT CARD */}
          <aside className="md:col-span-1">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={avatarSrc}
                  className="h-24 w-24 rounded-full object-cover mb-3 border border-blue-100"
                />
                <h2 className="text-base font-semibold text-slate-800">
                  {mentor.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">{mentor.jobTitle}</p>

                {/* Stats */}
                <div className="mt-4 grid w-full grid-cols-3 gap-2 text-xs">
                  <div className="flex flex-col items-center rounded-lg bg-blue-50/60 px-2 py-2">
                    <span className="font-semibold text-slate-800">
                      {ratingValue.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-slate-500">Đánh giá</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-blue-50/60 px-2 py-2">
                    <span className="font-semibold text-slate-800">
                      {mentor.totalReviews}
                    </span>
                    <span className="text-[11px] text-slate-500">Review</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-blue-50/60 px-2 py-2">
                    <span className="font-semibold text-slate-800">
                      {hourly > 0 ? `$${mentor.hourlyRate}` : "Free"}
                    </span>
                    <span className="text-[11px] text-slate-500">/ giờ</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                    Email
                  </span>
                  <span className="text-sm font-medium text-slate-700 break-words">
                    {mentor.email}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                    Giới thiệu
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {mentor.bio}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                    Chuyên môn
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(mentor.expertiseTags ?? []).map((tag, index) => {
                      // If tag is a string, use it directly
                      if (typeof tag === "string") {
                        return (
                          <span
                            key={`${tag}-${index}`}
                            className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700"
                          >
                            {tag}
                          </span>
                        );
                      }

                      // If tag is an object generated by faker
                      const label =
                        tag.name ??
                        tag.label ??
                        tag.title ??
                        `Tag ${index + 1}`;

                      return (
                        <span
                          key={tag.id ?? label ?? index} // prefer id if exists, then label, then index
                          className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-blue-50">
                    Nhắn tin
                  </button>
                  <button
                    onClick={() => navigate(path.booking)}
                    className="flex-1 rounded-full bg-sky-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
                  >
                    Đặt lịch nhanh
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT TABLE */}
          <main className="md:col-span-2">
            <div className="h-full rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-800">
                    Available slots
                  </h2>
                  <p className="text-xs text-slate-600">
                    Chọn khung giờ phù hợp để đặt lịch cùng{" "}
                    <span className="font-medium text-slate-800">
                      {mentor.name}
                    </span>
                  </p>
                </div>

                <div className="rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-medium text-sky-700">
                  {sortedSlots.length} slot mở
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-blue-50/60 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                        Ngày
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                        Bắt đầu
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                        Kết thúc
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                        Hành động
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedSlots.map((slot) => {
                      const start = new Date(slot.startTime);
                      const end = new Date(slot.endTime);

                      return (
                        <tr
                          key={slot.id}
                          className="border-t border-slate-200 hover:bg-blue-50/40"
                        >
                          <td className="px-4 py-3 text-slate-700">
                            {start.toLocaleDateString("vi-VN")}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {start.toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {end.toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleSelectSlot(slot)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-500"
                            >
                              Chọn slot
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal đặt ngoài table, chỉ render 1 lần */}
      <ConfirmBookingModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmBooking}
      />
    </section>
  );
}
