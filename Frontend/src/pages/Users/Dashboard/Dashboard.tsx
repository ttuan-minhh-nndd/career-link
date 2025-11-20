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

      <MentorChatWidget
        mentorName="Phạm Khôi Nguyên"
        mentorTitle="Backend Mentor"
        // mentorAvatar="link_ảnh_mentor_nếu_có"
      />

    </main>
  );
}
