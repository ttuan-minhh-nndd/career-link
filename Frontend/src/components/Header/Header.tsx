import { Link, NavLink} from "react-router-dom";
import Logo from "../Logo/Logo";
import SearchButton from "../SearchButton/SearchButton";
import path from "../../constants/path";
export default function Header() {
  const navLink =
    "text-sm font-medium text-slate-700 hover:text-sky-700 px-3 py-1.5 rounded-lg hover:bg-slate-50";

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
                  <div className="flex items-center gap-3">
          <Logo className="h-10" />  
        </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navLink} end>Trang chủ</NavLink>
          <NavLink to="/about" className={navLink}>Giới thiệu</NavLink>
          <SearchButton />
        </nav>


        <div className="flex items-center gap-2">
          <Link
            to={path.login}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
          >
            Đăng nhập
          </Link>
          <Link
            to={path.register}
            className="rounded-xl bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-sky-700"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
