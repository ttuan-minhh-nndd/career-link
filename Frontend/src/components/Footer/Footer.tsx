export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-600 md:flex-row">
        <div>© {new Date().getFullYear()} Career Link. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a className="hover:text-sky-700" href="#">Điều khoản</a>
          <a className="hover:text-sky-700" href="#">Bảo mật</a>
          <a className="hover:text-sky-700" href="#">Hỗ trợ</a>
        </div>
      </div>
    </footer>
  );
}
