import React from "react";
import MentorShowcaseCard from "../../../components/MentorShowcaseCard";
import mentor1 from "../../../assets/mentors/mentor1.jpg";
import mentor2 from "../../../assets/mentors/mentor2.jpg";
import mentor3 from "../../../assets/mentors/mentor3.jpg";
import mentor4 from "../../../assets/mentors/mentor4.jpg";
import mentor5 from "../../../assets/mentors/mentor5.jpg";
import { MentorShowcase } from "../../../components/MentorShowcaseCard";

const mentors: MentorShowcase[] = [
  {
    id: 1,
    name: "Phạm Khôi Nguyên",
    title: "Developer",
    avatar: mentor1,
    rating: 5.0,
    tags: ["Java", "API", "Database"],
  },
  {
    id: 2,
    name: "Đỗ Thị Như Ý",
    title: "Senior Backend Developer",
    avatar: mentor2,
    rating: 4.9,
    tags: ["Java", "Backend", "Microservices"],
  },
  {
    id: 3,
    name: "Trần Kim Ngân",
    title: "Data Scientist",
    avatar: mentor3,
    tags: ["Python", "Machine Learning", "SQL"],
    rating: 4.8,
  },
  {
    id: 4,
    name: "Nguyễn Trương Yến Nhi",
    title: "Cybersecurity Specialist",
    avatar: mentor4,
    tags: ["Security", "Network", "DevSecOps"],
    rating: 4.7,
  },
  {
    id: 5,
    name: "Trần Ngọc Thảo Vy",
    title: "Product Manager",
    avatar: mentor5,
    tags: ["Product", "Management", "Business"],
    rating: 4.8,
  },
  {
    id: 6,
    name: "Trần Minh Anh",
    title: "UI/UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    tags: ["Figma", "UI", "UX"],
    rating: 4.9,
  },
  {
    id: 7,
    name: "Nguyễn Văn Tài",
    title: "AI Research Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    tags: ["AI", "NLP", "LLM"],
    rating: 4.7,
  },
  {
    id: 8,
    name: "Phạm Thu Hà",
    title: "Marketing Strategist",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
    tags: ["Branding", "Digital Marketing", "Content"],
    rating: 4.7,
  },
  {
    id: 9,
    name: "Vũ Ngọc Hưng",
    title: "DevOps Engineer",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop",
    tags: ["DevOps", "AWS", "Kubernetes"],
    rating: 4.8,
  },
  {
    id: 10,
    name: "Trần Quốc Dũng",
    title: "Mobile Developer",
    avatar:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format&fit=crop",
    tags: ["Flutter", "React Native", "Mobile"],
    rating: 4.9,
  },
  {
    id: 11,
    name: "Lưu Thanh Tùng",
    title: "Data Engineer",
    avatar:
      "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop",
    tags: ["ETL", "Big Data", "Airflow"],
    rating: 4.8,
  },
  {
    id: 12,
    name: "Phan Bảo Ngọc",
    title: "Career Coach",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop",
    tags: ["Career Coaching", "Soft Skills", "CV Review"],
    rating: 4.8,
  },
];

export default function MenteeHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Text */}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Chào mừng Mentee đến với CareerLink!
              </h1>
              <p className="mt-4 text-slate-600">
                Cùng khám phá và kết nối với những mentor hàng đầu để phát triển
                sự nghiệp của bạn. Chọn lĩnh vực bạn yêu thích và bắt đầu hành
                trình học hỏi ngay hôm nay.
              </p>

              {/* Search & CTAs */}
              <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                {/* Input with icon */}
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    {/* magnifier icon */}
                    <svg
                      className="h-5 w-5 text-slate-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.5 3a5.5 5.5 0 1 1 3.9 9.4l3.2 3.2a1 1 0 0 1-1.4 1.4l-3.2-3.2A5.5 5.5 0 0 1 8.5 3Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    placeholder="Tìm mentor về Java, UI/UX, Data..."
                    className="w-full rounded-2xl border-0 bg-white pl-11 pr-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                    aria-label="Tìm kỹ năng"
                  />
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 gap-3">
                  <button className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-300">
                    Tìm Mentor ngay
                  </button>
                  <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 shadow-sm hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-300">
                    Khám phá kỹ năng
                  </button>
                </div>
              </div>
            </div>

            {/* Illustration card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1280&auto=format&fit=crop"
                  alt="Mentor và mentee đang trao đổi"
                  className="h-80 w-full object-cover md:h-[420px]"
                />
                {/* subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
              </div>

              {/* floating pill */}
              <div className="absolute -bottom-4 left-6 hidden md:flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Trực tuyến • Lịch linh hoạt
              </div>
            </div>
          </div>
        </div>

        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Lợi ích dành cho Mentee
          </h2>
          <p className="mt-2 text-slate-600">
            Học nhanh hơn, đúng trọng tâm và hiệu quả hơn.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Mentor chất lượng",
              desc: "Được kiểm duyệt & đánh giá minh bạch.",
            },
            { title: "Học theo mục tiêu", desc: "Tập trung đúng kỹ năng bạn cần." },
            { title: "Lịch linh hoạt", desc: "Đặt buổi học dễ dàng, phù hợp thời gian." },
            { title: "Tư vấn 1:1", desc: "Học trực tiếp, cá nhân hóa lộ trình." },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-100 shadow-sm"
            >
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {b.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENTORS */}
      <section className="w-full bg-gradient-to-b from-sky-50 via-indigo-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Mentor nổi bật</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m) => (
              <MentorShowcaseCard key={m.id} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILL CATEGORIES */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Danh mục kỹ năng phổ biến</h2>
        <p className="mt-1 text-slate-600">Khám phá theo lĩnh vực bạn quan tâm.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Java",
            "Python",
            "JavaScript",
            "React",
            "Data Science",
            "UX/UI Design",
            "Product Management",
            "Marketing",
            "Career Coaching",
          ].map((t) => (
            <button
              key={t}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
              aria-label={`Xem mentor theo kỹ năng ${t}`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-sky-50/50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-bold text-slate-900">Cảm nhận từ Mentee</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <blockquote
                key={i}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-100 shadow-sm"
              >
                <p className="text-slate-700">
                  “Nhờ mentor X, tôi đã vượt qua vòng phỏng vấn ở công ty Y!”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/64?img=${i}`}
                    alt="Avatar mentee"
                    className="h-10 w-10 rounded-full ring-1 ring-slate-100"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Mentee {i}
                    </div>
                    <div className="text-xs text-slate-500">Sinh viên / Fresher</div>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Cách hoạt động</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              n: 1,
              title: "Tìm mentor phù hợp",
              desc: "Lọc theo kỹ năng, mức phí, kinh nghiệm.",
            },
            {
              n: 2,
              title: "Đặt lịch linh hoạt",
              desc: "Chọn thời gian phù hợp và gửi yêu cầu.",
            },
            {
              n: 3,
              title: "Trao đổi 1:1",
              desc: "Tham gia buổi hẹn và nhận phản hồi cá nhân hóa.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-100 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Sẵn sàng phát triển cùng mentor của bạn?
          </h2>
          <p className="mt-2 text-slate-600">
            Khám phá mạng lưới mentor đa lĩnh vực và bắt đầu ngay hôm nay.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-sky-700 hover:to-indigo-700">
              Khám phá mentor ngay
            </button>
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 shadow-sm hover:bg-sky-50">
              Đăng ký tài khoản miễn phí
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
