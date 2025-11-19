import { useQuery } from "@tanstack/react-query";

import SectionTitle from "../../../components/SectionTitle";
import MentorCard from "../../../components/MentorCard";
import usersApi from "../../../apis/auth.api";

export default function Mentors() {
  const mentorsData = useQuery({
    queryKey: ["mentors"],
    queryFn: () => usersApi.getMentors(),
  });
  const mentors = mentorsData.data?.data ?? [];
  return (
    <section id="mentors" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          <SectionTitle title="Danh sách Mentor" />

          <div className="space-y-4">
            {mentors.map((m) => <MentorCard key={m.userId} mentor={m} />) ?? []}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="md:col-span-1">
          <SectionTitle
            title="Top CareerLinkers"
            subtitle="Bảng xếp hạng tuần"
          />

          <div className="rounded-3xl bg-white p-4 shadow">
            {mentors
              .slice()
              .sort((a, b) => Number(b.averageRating) - Number(a.averageRating))
              .slice(0, 3)
              .map((m, i) => (
                <div
                  key={m.userId}
                  className="flex items-center gap-3 rounded-2xl p-3 hover:bg-slate-50"
                >
                  {/* Rank Number */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 font-bold text-white shadow">
                    {i + 1}
                  </div>

                  {/* Avatar */}
                  <img
                    src={
                      m.avatarUrl ??
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(m.name)
                    }
                    alt={m.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  {/* Name + Job Title */}
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{m.name}</div>
                    <div className="text-xs text-slate-600">
                      {m.jobTitle ?? "Chưa cập nhật"}
                    </div>
                  </div>

                  {/* Rating */}
                  <span className="text-xs font-semibold">
                    {Number(m.averageRating).toFixed(1)}
                  </span>
                </div>
              )) ?? []}
          </div>
        </aside>
      </div>
    </section>
  );
}
