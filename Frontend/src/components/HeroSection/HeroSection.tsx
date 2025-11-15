import { Link } from "react-router-dom";
import mentor1 from "../../assets/mentors/mentor1.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-indigo-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            <span className="block text-sky-300">Trong tầm tay bạn:</span>
            <span className="block mt-2 text-white">Cố vấn nghề nghiệp tận tâm</span>
          </h1>

          <p className="mt-4 text-sky-100/90 text-lg max-w-lg">
            Bạn đang tìm kiếm định hướng cho nghề nghiệp mơ ước? Muốn nâng cao kỹ năng, 
            khởi nghiệp, hoặc định hướng lại con đường sự nghiệp? CareerLink kết nối bạn 
            với mentor phù hợp để đồng hành 1-1, chia sẻ lộ trình, và giúp bạn tiến xa hơn.
          </p>

          {/* Key points */}
          <ul className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {[
              "Cá nhân hóa cố vấn",
              "Đa dạng hình thức hỗ trợ",
              "Tích hợp công nghệ",
              "Hệ thống đánh giá & phản hồi",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/mentors"
              className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:from-sky-600 hover:to-indigo-700 transition"
            >
              Tìm mentor
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>

        {/* Right Section: Mockup */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/90 shadow-2xl backdrop-blur">
            <div className="h-12 bg-gradient-to-r from-sky-200 to-indigo-200" />
            <img
              src={mentor1}
              alt="App demo"
              className="h-[420px] w-full object-cover"
            />
            <div className="p-5">
              <div className="text-sm font-bold text-slate-800">
                Mentor: Phạm Khôi Nguyên
              </div>
              <div className="text-xs text-slate-600">
                Chuyên viên Developer tại Shopee
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
                  Java
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
                  API
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
                  Database
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
