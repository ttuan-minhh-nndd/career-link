import QuickBookingForm from "@/components/QuickBookingForm";

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
          <QuickBookingForm />
        </div>

      </div>
    </section>
  );
}
