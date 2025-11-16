import { Link } from "react-router-dom";
import path from "../../../constants/path";

export default function Booking() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          to={path.mentee_mentors}
          className="text-sm font-medium text-sky-700 hover:underline"
        >
          ← Quay lại danh sách Mentor
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* LEFT: Thông tin mentor + tóm tắt booking */}
        <aside className="space-y-6 md:col-span-4">
          {/* Mentor card */}
          <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=280&auto=format&fit=crop"
                alt="Mentor"
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <div className="text-base font-bold text-slate-900">
                  Tên Mentor
                </div>
                <div className="text-sm text-slate-600">Chức danh / Vị trí</div>
                <div className="mt-1 inline-flex items-center gap-2">
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                    ★ 4.9
                  </span>
                  <span className="text-xs font-semibold text-indigo-700">
                    200k–500k VND/buổi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking summary */}
          <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-slate-100">
            <div className="mb-3 text-sm font-semibold text-slate-900">
              Tóm tắt booking
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Loại phiên</span>
                <span className="font-medium text-slate-800">
                  1:1 Mentoring
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Thời lượng dự kiến</span>
                <span className="font-medium text-slate-800">60 phút</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Đơn giá</span>
                <span className="font-medium text-slate-800">
                  {/* Giá thật sẽ đến từ backend */}
                  300.000 VND
                </span>
              </div>
              <hr className="my-2 border-slate-200" />
              <div className="flex items-center justify-between text-base">
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Sau khi bạn bấm <span className="font-semibold">Tạo booking</span>, hệ
              thống sẽ tạo một booking mới với trạng thái{" "}
              <span className="font-mono text-[11px]">"pending"</span> cùng{" "}
              <span className="font-mono text-[11px]">sessionPrice</span> từ
              backend.
            </p>
          </div>

          {/* Bảo đảm / lưu ý */}
        </aside>

        {/* RIGHT: Form đặt lịch (UI-only) */}
        <div className="md:col-span-8">
          <form
            className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-100"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Step header (UI only, phù hợp với backend hiện tại) */}
            <div className="mb-6 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white">
                  1
                </span>
                <span className="font-semibold text-slate-900">
                  Chọn lịch & slot (availability)
                </span>
              </div>
              <div className="h-px flex-1 bg-slate-200" />
              <div className="flex items-center gap-2 opacity-70">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                  2
                </span>
                <span>Xác nhận booking (pending)</span>
              </div>
            </div>

            {/* Selects (chỉ mang tính mô tả UI) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Ngày
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Giờ bắt đầu
                </label>
                <input
                  type="time"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Thời lượng
                </label>
                <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <option>30 phút</option>
                  <option>45 phút</option>
                  <option>60 phút</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Loại phiên
                </label>
                <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <option>1:1 Mentoring</option>
                  <option>Review CV/Portfolio</option>
                  <option>Mock Interview</option>
                </select>
              </div>
            </div>

            {/* Note */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Ghi chú cho mentor (tuỳ chọn)
                </label>
              </div>
              <textarea
                className="h-28 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Mục tiêu buổi tư vấn, background, câu hỏi chính…"
              />
            </div>

            {/* Contact info (UI only) */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Họ và tên
                  </label>
                  <span className="text-xs text-slate-400">UI-only</span>
                </div>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Email nhận xác nhận
                  </label>
                  <span className="text-xs text-slate-400">UI-only</span>
                </div>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            {/* Payment info (chỉ mô tả, không phải bước thanh toán) */}
            <div className="mt-6">
              <div className="mb-1 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Thông tin thanh toán
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-dashed border-slate-200 p-3 text-slate-400">
                  <input type="radio" name="pay" disabled />
                  <span className="text-sm">Momo</span>
                </label>
                <label className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-dashed border-slate-200 p-3 text-slate-400">
                  <input type="radio" name="pay" disabled />
                  <span className="text-sm">Zalopay</span>
                </label>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                Tạo booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
