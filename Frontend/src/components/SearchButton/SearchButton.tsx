import searchIcon from "../../assets/search.svg";

export default function SearchButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 p-2 rounded-full hover:bg-gray-100 transition ${className}`}
      aria-label="Search"
    >
      <img
        src={searchIcon}
        alt="Search"
        className="h-5 w-5 select-none"
        loading="lazy"
        decoding="async"
      />
    </button>
  );
}
