export default function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "fill-yellow-400" : "fill-gray-300"}`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.59 5.25 5.8.84-4.2 4.09.99 5.77L10 14.92l-5.18 2.53.99-5.77-4.2-4.09 5.8-.84L10 1.5z" />
    </svg>
  );
}
