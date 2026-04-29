interface Props {
  rating: number;
  reviews: number;
}

export default function StarRating({ rating, reviews }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.min(1, Math.max(0, rating - (i - 1)));
          return (
            <span
              key={i}
              className="material-symbols-outlined text-xs"
              style={{ fontVariationSettings: `'FILL' ${fill}` }}
            >
              star
            </span>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-slate-400">
        ({reviews.toLocaleString()} Reviews)
      </span>
    </div>
  );
}
