export function ProductCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col gap-3 shadow-sm w-60 animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-200 rounded-lg h-40" />

      {/* Category badge placeholder */}
      <div className="bg-gray-200 rounded-full h-4 w-20" />

      {/* Name placeholder */}
      <div className="flex flex-col gap-1.5">
        <div className="bg-gray-200 rounded h-3.5 w-full" />
        <div className="bg-gray-200 rounded h-3.5 w-3/4" />
      </div>

      {/* Price + stock placeholder */}
      <div className="flex items-center justify-between">
        <div className="bg-gray-200 rounded h-5 w-16" />
        <div className="bg-gray-200 rounded h-3.5 w-20" />
      </div>

      {/* Button placeholder */}
      <div className="bg-gray-200 rounded-lg h-9" />
    </div>
  );
}
