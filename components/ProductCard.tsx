import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  const inStock = product.stock > 0;

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col gap-3 shadow-sm w-60">
      {/* Image */}
      <div className="relative bg-gray-100 rounded-lg h-40 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        )}
      </div>

      {/* Category badge */}
      <span className="self-start bg-blue-50 text-blue-500 text-xs font-semibold px-2 py-0.5 rounded-full">
        {product.category}
      </span>

      {/* Name */}
      <Link
        href={`/products/${product.id}`}
        className="font-semibold text-sm text-gray-900 leading-snug hover:underline"
      >
        {product.name}
      </Link>

      {/* Price + stock */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <span className={`text-xs font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Add to cart */}
      <button
        aria-label={`Add ${product.name} to cart`}
        disabled={!inStock}
        onClick={() => onAddToCart?.(product)}
        className={`py-2.5 rounded-lg font-semibold text-sm transition-colors ${
          inStock
            ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Add to cart
      </button>
    </div>
  );
}
