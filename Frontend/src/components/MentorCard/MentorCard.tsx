import Chip from "../Chip";
import Rating from "../Rating";
import { Link } from "react-router-dom";

export type Mentor = {
  id: number;
  name: string;
  title: string;
  bio: string;
  price: string;
  avatar: string;
  tags: string[];
  rating: number;
};

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{mentor.name}</h3>
              <p className="text-sm text-slate-600">Vị trí: {mentor.title}</p>
            </div>
            <Rating value={mentor.rating} />
          </div>
          <p className="mt-2 text-sm text-slate-700">{mentor.bio}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {mentor.tags.map((t) => (
              <Chip key={t}>{t}</Chip>  
            ))}
          </div>

          {mentor.price && (
            <span className="mt-5 inline-block text-sm font-semibold text-sky-700">
              {mentor.price}
            </span>
          )}           
          <div className="flex justify-end items-center gap-3 mt-0">
            <a
              href="#"
              className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700"
            >
              Đặt lịch
            </a>
            
            <Link
              to={`/mentors/${mentor.id}`}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 shadow hover:bg-sky-50"
            >
              Xem hồ sơ
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
