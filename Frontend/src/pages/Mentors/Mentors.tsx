import SectionTitle from "../../components/SectionTitle";
import MentorCard from "../../components/MentorCard";
import { mentorsSeed } from "../../constants/mentors";

export default function Mentors() {
  return (
    <section id="mentors" className="mx-auto max-w-7xl px-4 py-12">
      

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <SectionTitle title="Danh sách Mentor" />
          <div className="space-y-4">
            {mentorsSeed.map((m) => (
              <MentorCard key={m.id} mentor={m} />
            ))}
          </div>
        </div>

        <aside className="md:col-span-1">
          <SectionTitle title="Top CareerLinkers" subtitle="Bảng xếp hạng tuần" />
          <div className="rounded-3xl bg-white p-4 shadow">
            {mentorsSeed
              .slice()
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((m, i) => (
                <div key={m.id} className="flex items-center gap-3 rounded-2xl p-3 hover:bg-slate-50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 font-bold text-white shadow">
                    {i + 1}
                  </div>
                  <img src={m.avatar} alt={m.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{m.name}</div>
                    <div className="text-xs text-slate-600">{m.title}</div>
                  </div>
                  <span className="text-xs font-semibold">{m.rating.toFixed(1)}</span>
                </div>
              ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
