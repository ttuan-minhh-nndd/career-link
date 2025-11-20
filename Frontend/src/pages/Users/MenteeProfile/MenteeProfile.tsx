import React, { useState } from "react";

type NotificationSettings = {
  emailReminder: boolean;
  emailMarketing: boolean;
  emailUpdates: boolean;
};

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  headline: string;
  university?: string;
  major?: string;
  year?: string;
};

const initialProfile: UserProfile = {
  name: "Nguyễn Văn A",
  email: "mentee@example.com",
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
  headline: "Sinh viên Công nghệ thông tin, mong muốn trở thành Backend Developer",
  university: "ĐH Công nghệ Thông tin",
  major: "Khoa học máy tính",
  year: "Năm 3",
};

const initialNotificationSettings: NotificationSettings = {
  emailReminder: true,
  emailMarketing: false,
  emailUpdates: true,
};

export default function MyAccount() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [notifications, setNotifications] = useState<NotificationSettings>(
    initialNotificationSettings
  );

  const handleInputChange = (
    field: keyof UserProfile,
    value: string
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: gọi API update profile ở đây
    // hiện tại chỉ log tạm
    // console.log(profile, notifications);
    alert("Đã lưu thay đổi (demo).");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* <MenteeNavHeader /> */} 

      <section className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Tài khoản
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Card: Thông tin cơ bản */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Thông tin cá nhân
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Thông tin này sẽ được hiển thị cho mentor khi bạn đặt buổi hẹn.
            </p>

            <div className="mt-5 flex flex-col gap-6 md:flex-row">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 md:w-1/3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-90 w-0-90 rounded-2xl object-cover bg-slate-100"
                />
                <button
                  type="button"
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Đổi avatar 
                </button>
              </div>

              {/* Fields */}
              <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
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

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Email đăng nhập
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 shadow-inner"
                    value={profile.email}
                    disabled
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Email được dùng để đăng nhập & nhận thông báo.
                  </p>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Headline / Giới thiệu ngắn
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Trường / Đơn vị
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.university ?? ""}
                    onChange={(e) =>
                      handleInputChange("university", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Chuyên ngành
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.major ?? ""}
                    onChange={(e) =>
                      handleInputChange("major", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Năm học / Trình độ
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                    value={profile.year ?? ""}
                    onChange={(e) =>
                      handleInputChange("year", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card: Mục tiêu học tập */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Mục tiêu học tập
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Chia sẻ mục tiêu để mentor hiểu rõ hơn và hỗ trợ bạn tốt hơn.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Vị trí bạn hướng tới
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  placeholder="VD: Backend Java Fresher, Data Analyst..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Thời gian dự kiến đạt mục tiêu
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  placeholder="VD: 6 tháng, 1 năm..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  Mong muốn từ mentor
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  placeholder="VD: Định hướng roadmap, review CV, luyện phỏng vấn, giải đáp thắc mắc khi học..."
                />
              </div>
            </div>
          </section>

          {/* Card: Cài đặt thông báo */}
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Thông báo & Email
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Chọn những loại email bạn muốn nhận từ CareerLink.
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  checked={notifications.emailReminder}
                  onChange={() =>
                    handleNotificationChange("emailReminder")
                  }
                />
                <span>
                  <span className="font-medium text-slate-900">
                    Nhắc lịch buổi hẹn
                  </span>
                  <p className="text-xs text-slate-600">
                    Gửi email nhắc trước mỗi buổi mentoring (trước 24h và 1h).
                  </p>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  checked={notifications.emailUpdates}
                  onChange={() =>
                    handleNotificationChange("emailUpdates")
                  }
                />
                <span>
                  <span className="font-medium text-slate-900">
                    Cập nhật tính năng & hệ thống
                  </span>
                  <p className="text-xs text-slate-600">
                    Nhận thông báo về tính năng mới, thay đổi quan trọng.
                  </p>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  checked={notifications.emailMarketing}
                  onChange={() =>
                    handleNotificationChange("emailMarketing")
                  }
                />
                <span>
                  <span className="font-medium text-slate-900">
                    Tin tức & ưu đãi
                  </span>
                  <p className="text-xs text-slate-600">
                    Nhận email về khóa học, workshop, ưu đãi từ CareerLink.
                  </p>
                </span>
              </label>
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
