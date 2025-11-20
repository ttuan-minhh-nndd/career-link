import React from "react";
import MentorShowcaseCard, {
  MentorShowcase,
} from "../../../components/MentorShowcaseCard";
import mentor1 from "../../../assets/mentors/mentor1.jpg";
import mentor2 from "../../../assets/mentors/mentor2.jpg";
import mentor3 from "../../../assets/mentors/mentor3.jpg";
import mentor4 from "../../../assets/mentors/mentor4.jpg";
import mentor5 from "../../../assets/mentors/mentor5.jpg";
import SearchBar from "../../../components/SearchBar";
import MentorChatWidget from "../../../components/MentorChatWidget";
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

];

export default function MenteeHomePage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative mx-auto grid min-h-[70vh] max-w-6xl place-items-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold text-slate-900">
            Chào mừng Mentee đến với{" "}
            <span className="text-sky-600">CareerLink</span>
          </h1>
          <p className="mt-4 text-slate-600">
            Nền tảng trực tuyến kết nối chuyên gia với sinh viên cần định
            hướng nghề nghiệp. Tìm mentor phù hợp, đặt lịch 1:1, nhận lộ
            trình học tập &amp; phản hồi CV/Portfolio.
          </p>

          <SearchBar to="/mentors" />

        </div>

      </section>

      


      {/* FEATURED MENTORS */}
      <section className="w-full bg-gradient-to-b from-sky-50 via-indigo-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Mentor nổi bật
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m) => (
              <MentorShowcaseCard key={m.id} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILL CATEGORIES */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-slate-900">
          Danh mục kỹ năng phổ biến
        </h2>
        <p className="mt-1 text-slate-600">
          Khám phá theo lĩnh vực bạn quan tâm.
        </p>

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
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
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
          <h2 className="text-2xl font-bold text-slate-900">
            Cảm nhận từ Mentee
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <blockquote
                key={i}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
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
                    <div className="text-xs text-slate-500">
                      Sinh viên / Fresher
                    </div>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    
      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-slate-900">
          Cách hoạt động
        </h2>
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
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 font-semibold text-white">
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
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-200 hover:bg-sky-50">
              Đăng ký tài khoản miễn phí
            </button>
          </div>
        </div>
      </section>

      <MentorChatWidget
        mentorName="Phạm Khôi Nguyên"
        mentorTitle="Backend Mentor"
        // mentorAvatar="link_ảnh_mentor_nếu_có"
      />

    </main>
  );
}
