export default function MentorDashboard() {
  const avail = ["Mon 10:00","Tue 17:00","Wed 12:30","Thu 20:00","Fri 10:30","Sat 18:00"];
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const sessions = ["10:00 – 1:1","13:30 – Review CV","20:00 – Mock Interview"];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-gradient-to-br from-sky-400/90 to-indigo-400/90 p-6 text-white shadow-xl">
            <div className="text-sm opacity-90">Welcome back</div>
            <div className="text-xl font-bold">Mentor Tuấn Minh</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/20 p-4">
                <div className="text-sm opacity-90">Wallet</div>
                <div className="text-2xl font-extrabold">5.050.000 VND</div>
              </div>
              <div className="rounded-2xl bg-white/20 p-4">
                <div className="text-sm opacity-90">Sessions thành công</div>
                <div className="text-2xl font-extrabold">100</div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-white p-4 text-slate-800">
              <div className="mb-2 text-sm font-semibold">Cập nhật lịch rảnh</div>
              <div className="flex flex-wrap gap-2 text-xs">
                {avail.map((t) => (
                  <span key={t} className="rounded-full bg-slate-100 px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-bold">Lịch phiên trong tuần</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
              {days.map((d) => (
                <div key={d} className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{d}</div>
                    <div className="h-2 w-2 rounded-full bg-sky-500" />
                  </div>
                  {sessions.map((s) => (
                    <div key={s} className="rounded-xl bg-white px-3 py-2 text-xs shadow-sm">{s}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-bold">Thông báo gần đây</h3>
            <div className="space-y-3 text-sm">
              {[
                {n:"Nguyễn Hoàng Minh Ngọc", t:"3/10/2025 | 10:00 - 10:30", m:"đã đặt lịch tư vấn."},
                {n:"Đặng Trung Anh", t:"3/10/2025 | 11:00 - 12:00", m:"đã đặt lịch tư vấn."},
                {n:"Nguyễn Ngọc Hải Đăng", t:"", m:"đã để lại Feedback 5★."},
              ].map((x,i)=>(
                <div key={i} className="rounded-2xl bg-slate-50 p-3">
                  <div className="font-semibold">{x.n}</div>
                  <div className="text-slate-600">{x.t}</div>
                  <div>{x.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
