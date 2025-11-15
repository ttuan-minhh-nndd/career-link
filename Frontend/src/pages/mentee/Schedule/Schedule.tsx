import SectionTitle from "../../../components/SectionTitle";

export default function Schedule() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const slots = ["09:00 – Định hướng", "13:30 – Review CV", "20:00 – 1:1 Mentoring"];

  return (
    <section id="schedule" className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle title="Lịch trình gợi ý cho tuần định hướng" subtitle="Tham khảo các phiên 1:1, workshop và review CV" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
        {days.map((d) => (
          <div key={d} className="flex flex-col gap-2 rounded-2xl bg-white p-3 shadow">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{d}</div>
              <div className="h-2 w-2 rounded-full bg-sky-500" />
            </div>
            {slots.map((s) => (
              <div key={s} className="rounded-xl bg-slate-50 px-3 py-2 text-xs">{s}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
