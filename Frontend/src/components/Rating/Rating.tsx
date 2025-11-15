import Star from "../Star";

export default function Rating({ value = 0 }: { value?: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(value));
  return (
    <div className="flex items-center gap-1">
      {stars.map((s, i) => (
        <Star key={i} filled={s} />
      ))}
      <span className="text-xs text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
}
