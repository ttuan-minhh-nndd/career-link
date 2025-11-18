export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-indigo-50/40 to-white"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-sky-600">
              <path d="M10 1.67 1.67 5v10L10 18.33 18.33 15V5L10 1.67Zm0 1.9L16.67 6 10 8.43 3.33 6 10 3.57ZM3 7.41l6.67 2.53v6.49L3 13.9V7.4Zm7.33 9.02v-6.5L17 7.41v6.5l-6.67 2.52Z" />
            </svg>
            Về CareerLink
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Kết nối <span className="text-sky-600">chuyên gia</span> & sinh viên cần định hướng
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            CareerLink là nền tảng giúp bạn tìm mentor phù hợp, đặt lịch 1:1, nhận lộ trình học tập & phản hồi CV/Portfolio.
            Giao diện hiện đại, tối ưu di động & đa trình duyệt.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Features */}
          <div className="relative">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
              <ul className="space-y-4">
                {/* Vibe coding nhưng không chọn lọc (BAD) */}
                {[
                  {
                    title: "Chuyển cảnh mượt mà",
                    desc: "Hiệu ứng micro-animations tinh tế, cảm giác hiện đại & tự nhiên.",
                  },
                  {
                    title: "Form thân thiện, dễ dùng",
                    desc: "Nhãn rõ ràng, trạng thái focus nổi bật, hỗ trợ phím tắt.",
                  },
                  {
                    title: "Chia sẻ nhanh",
                    desc: "Tích hợp chia sẻ mạng xã hội, một chạm là xong.",
                  },
                ].map((i) => (
                  <li key={i.title} className="flex gap-3">
                    <div className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 shadow text-white">
                      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-white">
                        <path d="M7.629 13.314 3.9 9.586l1.414-1.415 2.314 2.314 6.06-6.06 1.415 1.414-7.475 7.475Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{i.title}</div>
                      <div className="text-sm text-slate-600">{i.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200/80 bg-white/60 text-center">
                {[
                  { k: "Mentor", v: "120+" },
                  { k: "Phiên 1:1", v: "3.5k+" },
                  { k: "Đánh giá", v: "4.9/5" },
                ].map((s) => (
                  <div key={s.k} className="p-4">
                    <div className="text-2xl font-extrabold text-slate-900">{s.v}</div>
                    <div className="text-xs tracking-wide text-slate-500">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick booking form */}
          {/* Loz nào code thẳng form vào trong page luôn? */}
          <div className="relative">
            <div className="absolute -inset-x-6 -top-6 -z-10 h-24 rounded-3xl bg-gradient-to-r from-sky-200/60 to-indigo-200/60 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-2xl backdrop-blur">
              <div className="h-12 bg-gradient-to-r from-sky-500 to-indigo-500" />
              <div className="p-6">
                <div className="mb-2">
                  <div className="text-lg font-bold text-slate-900">Đăng ký phiên tư vấn nhanh</div>
                  <div className="text-sm text-slate-600">Miễn phí huỷ trước 12h</div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Họ và tên
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                      placeholder="name@email.com"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Dùng email để nhận xác nhận & lịch hẹn.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Ngày & giờ mong muốn
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Mục tiêu buổi tư vấn (tuỳ chọn)
                    </label>
                    <textarea
                      className="h-24 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                      placeholder="VD: Review CV, định hướng học Data, luyện phỏng vấn React..."
                    />
                  </div>

                  <button className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-300">
                    Xác nhận đặt lịch
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-sky-600">
                      <path d="M10 1.67a8.33 8.33 0 1 0 0 16.66A8.33 8.33 0 0 0 10 1.67Zm.83 12.5H9.17v-1.66h1.66v1.66Zm0-3.34H9.17V5.83h1.66v5Z" />
                    </svg>
                    Thời lượng mặc định: 30 phút/buổi. Có thể thay đổi sau khi ghép lịch.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
