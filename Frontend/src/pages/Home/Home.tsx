import { Link } from "react-router-dom";
import path from "../../constants/path";
import MentorShowcaseCard, {MentorShowcase} from "../../components/MentorShowcaseCard";
import SearchBar from "../../components/SearchBar";
import HeroSection from "../../components/HeroSection";
import mentor1 from "../../assets/mentors/mentor1.jpg";
import mentor2 from "../../assets/mentors/mentor2.jpg";
import mentor3 from "../../assets/mentors/mentor3.jpg";
import mentor4 from "../../assets/mentors/mentor4.jpg";
import mentor5 from "../../assets/mentors/mentor5.jpg";

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
export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid min-h-[70vh] max-w-8xl place-items-center px-4">
        <div className="text-center max-w-3xl">
            <h1 className="text-5xl font-extrabold text-slate-900">
            Chào mừng đến với <span className="text-sky-600">CareerLink</span>
            </h1>
             <p className="mt-4 text-slate-600">
          Nền tảng trực tuyến kết nối chuyên gia với sinh viên cần định hướng nghề nghiệp.
          Tìm mentor phù hợp, đặt lịch 1:1, nhận lộ trình học tập & phản hồi CV/Portfolio.
            </p>
            <SearchBar to="/mentors" />
              <div className="mt-6 flex flex-wrap justify-center gap-4">              
                <Link to={path.login}
                className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Đăng nhập
              </Link>
              <Link
                to={path.register}
                className="rounded-xl border border-sky-600 px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
              >
                Đăng ký
              </Link>
              <Link
                to={path.about}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
      </section>
      <HeroSection />
      {/* Showcase list */}
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

    </>
  );
}