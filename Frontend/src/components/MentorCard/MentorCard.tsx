import Chip from "../Chip";
import Rating from "../Rating";
import { Link , generatePath } from "react-router-dom";
import path from "../../constants/path";

export type Mentor = {
  userId: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  jobTitle: string | null;
  hourlyRate: string;
  averageRating: string;
  totalReviews: number;
  expertiseTags: number[];
};

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const ratingValue = Number(mentor.averageRating) || 0;
  const hourly = Number(mentor.hourlyRate || "0");

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={
            mentor.avatarUrl ??
            `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}`
          }
          alt={mentor.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow"
        />

        <div className="flex-1">
          {/* Name + Title + Rating */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {mentor.name}
              </h3>
              <p className="text-sm text-slate-600">
                Vị trí: {mentor.jobTitle ?? "Chưa cập nhật"}
              </p>
            </div>
            <Rating value={ratingValue} />
          </div>

          {/* Bio */}
          {mentor.bio && (
            <p className="mt-2 text-sm text-slate-700">{mentor.bio}</p>
          )}

          {/* Tags / expertise */}
          {mentor.expertiseTags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {mentor.expertiseTags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}

          {/* Hourly rate (nếu > 0) */}
          {hourly > 0 && (
            <span className="mt-5 inline-block text-sm font-semibold text-sky-700">
              {`$${mentor.hourlyRate} / hour`}
            </span>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-end gap-3">

            <Link
             to={generatePath(path.mentor_details, { id: mentor.userId })}
              className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white ring-1 ring-sky-200 shadow hover:bg-sky-500"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
