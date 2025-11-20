export default function MentorDashboard() {
  const avail = ["Mon 10:00", "Tue 17:00", "Wed 12:30", "Thu 20:00", "Fri 10:30", "Sat 18:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sessions = ["10:00 – 1:1", "13:30 – Review CV", "20:00 – Mock Interview"];

  return (
    <section className="relative min-h-screen bg-slate-50/80 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#38bdf81a,_transparent_55%),_radial-gradient(circle_at_bottom,_#4f46e51a,_transparent_55%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row">
        {/* Left column */}
        <div className="flex-1 space-y-6">
          {/* Welcome / hero card */}
          <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 p-6 text-white shadow-xl lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="mt-1 text-2xl font-bold leading-tight">
                  Chào mừng trở lại,{" "}
                  <span className="whitespace-nowrap">Mentor Tuấn Minh</span>
                </h1>
                <p className="mt-2 text-sm text-sky-50/90">
                  Quản lý lịch rảnh, phiên mentoring và thu nhập của bạn trong tuần.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm md:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-lg font-bold text-sky-600">
                  TM
                </div>
                <div className="text-xs">
                  <div className="font-semibold">Mentor cấp cao</div>
                  <div className="text-sky-100/80">Chuyên ngành Career &amp; CV</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/15 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-sky-100/90">
                    Số dư ví
                  </p>
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-medium">
                    Có thể rút
                  </span>
                </div>
                <p className="mt-2 text-2xl font-extrabold tracking-tight">
                  5.050.000 VND
                </p>
                <p className="mt-1 text-xs text-sky-100/90">
                  +350.000 VND tuần này
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4">
                <p className="text-xs uppercase tracking-wide text-sky-100/90">
                  Sessions thành công
                </p>
                <p className="mt-2 text-2xl font-extrabold tracking-tight">
                  100
                </p>
                <p className="mt-1 text-xs text-sky-100/90">
                  Tỉ lệ hoàn thành:{" "}
                  <span className="font-semibold text-white">98%</span>
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sky-100/25">
                  <div className="h-full w-[86%] rounded-full bg-white/90" />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-5 rounded-2xl bg-white p-4 text-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-500">
                    Lịch rảnh trong tuần
                  </p>
                  <p className="text-xs text-slate-400">
                    Học viên có thể đặt slot trực tiếp trong khung giờ này.
                  </p>
                </div>
                <button className="hidden rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 sm:inline-flex">
                  Cập nhật
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {avail.map((t) => (
                  <button
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700 shadow-sm transition hover:-translate-y-[1px] hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/70 focus:ring-offset-2"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button className="mt-3 inline-flex text-xs font-medium text-sky-600 hover:underline sm:hidden">
                Cập nhật lịch rảnh
              </button>
            </div>
          </div>

          {/* Weekly schedule */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Lịch phiên trong tuần
                </h3>
                <p className="text-xs text-slate-500">
                  Xem nhanh các phiên mentoring đã được đặt.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-1 font-medium text-sky-700">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Có phiên
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  Chưa có
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
              {days.map((d) => {
                const hasSessions = d !== "Sun";

                return (
                  <div
                    key={d}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition hover:-translate-y-[2px] hover:border-sky-200 hover:bg-sky-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {d}
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          hasSessions ? "bg-sky-500" : "bg-slate-300"
                        }`}
                      />
                    </div>
                    {hasSessions ? (
                      <div className="space-y-2">
                        {sessions.map((s) => (
                          <div
                            key={`${d}-${s}`}
                            className="rounded-xl bg-white px-3 py-2 text-[11px] leading-snug text-slate-700 shadow-sm"
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-1 rounded-xl border border-dashed border-slate-200 bg-white/40 px-3 py-3 text-[11px] text-slate-400">
                        Chưa có phiên nào.{" "}
                        <span className="font-medium text-sky-600">
                          Gợi ý mở thêm lịch rảnh.
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <aside className="w-full space-y-4 lg:w-80">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h4 className="text-sm font-semibold text-slate-900">
              Phiên sắp diễn ra
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Hãy chuẩn bị tài liệu trước khi vào phòng.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2 rounded-2xl bg-slate-50 p-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Hôm nay • 20:00
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Mock Interview
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Học viên: Nguyễn Anh Tuấn • Backend
                  </p>
                </div>
                <button className="rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-sky-600">
                  Vào phòng
                </button>
              </div>

              <div className="flex items-start justify-between gap-2 rounded-2xl border border-dashed border-slate-200 p-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Ngày mai • 13:30
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Review CV
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Học viên: Lê Minh Châu • Product
                  </p>
                </div>
                <button className="rounded-full px-3 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100">
                  Chi tiết
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-5 text-slate-50 shadow-sm">
            <h4 className="text-sm font-semibold">Tips cho mentor tuần này</h4>
            <p className="mt-2 text-xs text-slate-200">
              Thử gửi tài liệu trước cho học viên ít nhất 3 giờ trước phiên
              để tăng chất lượng buổi mentoring.
            </p>
            <button className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-100">
              Xem gợi ý chi tiết
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
