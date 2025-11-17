import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import path from "../../../constants/path";

type AvailableSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

type MentorDetailData = {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
  expertiseTags: string[];
  availableSlots: AvailableSlot[];
};

export default function MentorDetail() {
  const { id } = useParams(); // lấy :id từ /api/v1/mentors/:id
  const [mentor, setMentor] = useState<MentorDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMentor = async () => {
      try {
        const res = await fetch(`/api/v1/mentors/${id}`);
        const data: MentorDetailData = await res.json();
        setMentor(data);
      } catch (err) {
        console.error("Failed to fetch mentor detail", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p>Đang tải thông tin mentor...</p>
      </section>
    );
  }

  if (!mentor) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p>Không tìm thấy mentor.</p>
      </section>
    );
  }

  const avatarSrc =
    mentor.avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}`;

  const ratingValue = Number(mentor.averageRating) || 0;
  const hourly = Number(mentor.hourlyRate || "0");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {/* Main layout: Left = Avatar (small), Right = Profile */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* LEFT: Avatar card */}
        <aside className="md:col-span-4">
          <div className="rounded-2xl bg-white p-10 shadow ring-1 ring-slate-100">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-sky-50 to-white p-2">
              <img
                src={avatarSrc}
                alt={mentor.name}
                className="mx-auto h-100 w-full max-w-[280px] rounded-lg object-contain"
              />
            </div>

            {/* quick badges under avatar */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                ★ {ratingValue.toFixed(1)} / 5
              </span>
              {hourly > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                  ${mentor.hourlyRate} / giờ
                </span>
              )}
            </div>

            {/* CTA block */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <button className="rounded-lg border border-slate-200 px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">
                Nhắn tin
              </button>
              <Link
                to={path.booking}
                className="text-center rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 px-3 py-2 font-medium text-white hover:from-sky-700 hover:to-indigo-700"
              >
                Đặt lịch
              </Link>
            </div>
          </div>
        </aside>

        {/* RIGHT: Profile content */}
        <div className="md:col-span-8">
          <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-100">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900">
                {mentor.name}
              </h1>
              <p className="font-semibold text-sky-700">
                {mentor.jobTitle ?? "Chức danh / Vị trí"}
              </p>
            </div>

            <p className="mt-4 leading-relaxed text-slate-700">
              {mentor.bio ?? "Mentor chưa cập nhật phần giới thiệu cá nhân."}
            </p>

            {/* Tags / Skills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {(mentor.expertiseTags.length
                ? mentor.expertiseTags
                : ["Digital Marketing", "Performance Marketing", "Branding"]
              ).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-100">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Lịch rảnh trong tuần
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {(mentor.availableSlots ?? []).map((slot) => {
                const date = new Date(slot.startTime);
                const label = date.toLocaleString("vi-VN", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div
                    key={slot.id}
                    className="rounded-xl bg-sky-50 px-3 py-2 text-center text-sm text-slate-800 ring-1 ring-sky-100"
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback (static, giữ nguyên UI) */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-100">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Đánh giá từ mentee
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: "Người dùng A",
                  feedback:
                    "Mentor giải thích rất rõ ràng, ví dụ thực tế hữu ích.",
                },
                {
                  name: "Người dùng B",
                  feedback:
                    "Buổi 1:1 chất lượng, góp ý chi tiết cho CV & dự án.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm"
                >
                  <p className="font-semibold text-sky-700">{f.name}</p>
                  <p className="mt-1 text-sm text-slate-700">{f.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
