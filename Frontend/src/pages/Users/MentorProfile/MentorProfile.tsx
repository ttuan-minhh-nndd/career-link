import React, { useState } from "react";

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

const initialMentorProfile: MentorProfile = {
  name: "Ruby Lieu",
  email: "mentor@example.com",
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
  bio: "Hi, my name is Ruby! It's a pleasure to have you in my network!",
  jobTitle:
    "PhD, Senior Lecturer in Digital Marketing @ International University, Vietnam National University, HCMC",
  hourlyRate: "69.00",
  company: "International University, VNU-HCMC",
  expertise: "Digital Marketing, Performance Marketing, Branding",
  yearsOfExperience: "8+ năm",
};

export default function MentorProfile() {
  const [profile, setProfile] = useState<MentorProfile>(initialMentorProfile);

  const handleInputChange = (
    field: keyof MentorProfile,
    value: string
  ) => {
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
              Cập nhật thông tin hiển thị trên trang cá nhân và khi mentee đặt lịch.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card: Thông tin cơ bản */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Thông tin cá nhân & hiển thị
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Thông tin này sẽ xuất hiện trên trang profile và trong trang đặt lịch.
            </p>

            <div className="mt-5 flex flex-col gap-6 md:flex-row">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 md:w-1/3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-90 w-0-90 rounded-2xl bg-slate-100 object-cover"
                />
                <button
                  type="button"
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Đổi avatar 
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  Nên dùng ảnh rõ mặt, nền sáng, phù hợp môi trường chuyên nghiệp.
                </p>
              </div>

              {/* Fields */}
              <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-2 md:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700">
                    Họ và tên
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
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
                    value={profile.company ?? ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Ví dụ: {`"PhD, Senior Lecturer in Digital Marketing @ International University, VNU-HCMC"`}.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Đơn vị công tác / Company
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.company ?? ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Số năm kinh nghiệm
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.yearsOfExperience ?? ""}
                    onChange={(e) =>
                      handleInputChange("yearsOfExperience", e.target.value)
                    }
                    placeholder="VD: 5+ năm, 10+ năm..."
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
              Phần này giúp mentee hiểu rõ hơn về background và phong cách mentoring của bạn.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Bio (giới thiệu ngắn)
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  value={profile.bio}
                  onChange={(e) =>
                    handleInputChange("bio", e.target.value)
                  }
                  placeholder='VD: "Hi, my name is Ruby! It&apos;s a pleasure to have you in my network!"'
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Lĩnh vực & thế mạnh mentoring
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  value={profile.expertise ?? ""}
                  onChange={(e) =>
                    handleInputChange("expertise", e.target.value)
                  }
                  placeholder="VD: Digital Marketing, Performance Ads, Personal Branding..."
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
              Thiết lập mức phí mỗi giờ để hiển thị trên profile & khi mentee đặt lịch.
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
                    value={profile.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", e.target.value)
                    }
                    placeholder="VD: 69.00"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Giá hiển thị theo giờ. Hệ thống sẽ tính phí theo thời lượng từng buổi.
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:from-sky-700 hover:to-indigo-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
