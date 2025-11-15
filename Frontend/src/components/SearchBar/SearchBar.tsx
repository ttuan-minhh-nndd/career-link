import { FormEvent } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

type Props = {
  placeholder?: string;
  to?: string; // nơi chuyển hướng (mặc định: /mentors)
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  placeholder = "Tìm theo kỹ năng, chức danh… (ví dụ: React, Data, Security)",
  to = "/mentors",
  className = "",
  value = "",
  onChange,
}: Props) {
  const navigate = useNavigate();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = value ? `?${createSearchParams({ q: value })}` : "";
    navigate(`${to}${params}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mx-auto mt-8 flex w-full max-w-3xl items-center justify-center gap-3 ${className}`}
      role="search"
      aria-label="Tìm kiếm mentor"
    >
      {/* Ô input */}
      <input
        value={value}
        onChange={onChange}
        className="flex-grow rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-300 focus:outline-none"
        placeholder={placeholder}
        aria-label="Ô tìm kiếm"
      />

      {/* Nút tìm kiếm */}
      <button
        type="submit"
        className="h-[38px] rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Tìm kiếm
      </button>
    </form>
  );
}
