import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../../context/app.context";
import path from "../../../constants/path";

type MentorProfile = {
  name: string;
  email: string;
  avatar: string;
  jobTitle: string;
  bio: string;
  hourlyRate: string;
  company?: string;
  expertise?: string;
  yearsOfExperience?: string;
};

export default function MentorProfile() {
  const { profile, setProfile } = useContext(AppContext);

  const handleInputChange = (field: keyof MentorProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: gọi API update mentor profile
    alert("Đã lưu thay đổi profile mentor (demo).");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* <MentorNavHeader /> */}

      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Mentor Profile
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Cập nhật thông tin hiển thị trên trang cá nhân và khi mentee đặt
              lịch.
            </p>
          </div>
          <Link
            to={path.update_mentor_profile}
            className="self-start md:self-auto rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-sky-700 hover:to-indigo-700"
          >
            Edit Profile
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card: Thông tin cơ bản */}
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">
              Thông tin cá nhân & hiển thị
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Thông tin này sẽ xuất hiện trên trang profile và trong trang đặt
              lịch.
            </p>

            <div className="mt-3 flex flex-col gap-4 md:flex-row">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-2 md:w-1/3">
                <img
                  src={
                    profile.avatarUrl ||
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop"
                  }
                  alt={profile.name}
                  className="h-40 w-40 rounded-2xl bg-slate-100 object-cover"
                />
                <button
                  type="button"
                  className="rounded-full border border-slate-300 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Đổi avatar
                </button>
                <p className="text-[10px] leading-snug text-slate-500 text-center">
                  Nên dùng ảnh rõ mặt, nền sáng, phù hợp môi trường chuyên
                  nghiệp.
                </p>
              </div>

              {/* Fields */}
              <div className="grid flex-1 grid-cols-2 gap-x-4 md:grid-cols-4 mx-auto w-full max-w-lg">
                <div className="col-span-2">
                  <label className="block text-[11px] font-medium text-slate-700">
                    Họ và tên
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="col-span-2 md:col-span-0">
                  <label className="block text-xs font-medium text-slate-700">
                    Email đăng nhập / liên hệ
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 shadow-inner"
                    value={profile.email}
                    disabled
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Email được dùng để đăng nhập & nhận thông báo từ mentee.
                  </p>
                </div>

                <div className="col-span-2 md:col-span-0">
                  <label className="block text-xs font-medium text-slate-700">
                    Chức danh / Job Title
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.mentorProfile.jobTitle ?? ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Ví dụ:{" "}
                    {`"PhD, Senior Lecturer in Digital Marketing @ International University, VNU-HCMC"`}
                    .
                  </p>
                </div>
                {/* ⭐ Average Rating */}
                <div className="col-span-2 md:col-span-0 mx-auto w-full max-w-xs">
                  <label className="block text-[11px] font-medium text-slate-700">
                    Điểm đánh giá trung bình
                  </label>
                  <input
                    disabled
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm text-slate-900 shadow-inner"
                    value={profile.mentorProfile?.averageRating ?? "0.00"}
                  />
                </div>

                {/* 📝 Total Reviews */}
                <div className="col-span-2 md:col-span-0 mx-auto w-full max-w-xs">
                  <label className="block text-[11px] font-medium text-slate-700">
                    Tổng số lượt đánh giá
                  </label>
                  <input
                    disabled
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm text-slate-900 shadow-inner"
                    value={profile.mentorProfile?.totalReviews ?? 0}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card: Bio & chuyên môn */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Giới thiệu & chuyên môn
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Phần này giúp mentee hiểu rõ hơn về background và phong cách
              mentoring của bạn.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Bio (giới thiệu ngắn)
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  value={profile.mentorProfile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder='VD: "Hi, my name is Ruby! It&apos;s a pleasure to have you in my network!"'
                />
              </div>
            </div>
          </section>

          {/* Card: Thông tin mentoring & rates */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Thông tin mentoring & mức phí
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Thiết lập mức phí mỗi giờ để hiển thị trên profile & khi mentee
              đặt lịch.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Mức phí mỗi giờ (hourlyRate)
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                    $
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.mentorProfile.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", e.target.value)
                    }
                    placeholder="VD: 69.00"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Giá hiển thị theo giờ. Hệ thống sẽ tính phí theo thời lượng
                  từng buổi.
                </p>
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
