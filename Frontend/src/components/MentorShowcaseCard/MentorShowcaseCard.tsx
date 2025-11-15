import { Link } from "react-router-dom";

export type MentorShowcase = {
  id: number | string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  tags: string[];
  profileUrl?: string;
};

export default function MentorShowcaseCard({
  id,
  name,
  title,
  avatar,
  rating,
  tags,
  profileUrl
}: MentorShowcase) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-100 hover:shadow-lg transition-all duration-300">
      {/* Photo with rating badge */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={avatar}
          alt={name}
          className="h-[310px] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-sky-600/90 px-3 py-1 text-white shadow-md">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-white/95">
            <path d="M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.77L10 14.92l-5.18 2.53.99-5.77-4.2-4.09 5.8-.84L10 1.5z" />
          </svg>
          <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-slate-900">{name}</h3>
        <p className="mt-1 text-slate-600">{title}</p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 ring-1 ring-sky-100"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Link
          to={profileUrl ?? `/mentors/${id}`}
          className="block rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-md hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300"
        >
          Xem hồ sơ
        </Link>
      </div>
    </div>
  );
}
