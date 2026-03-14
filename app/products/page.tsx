import products from "@/data/products.json";
import { ProductsView } from "@/components/ProductsView";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Products</h1>
      <p className="text-sm text-gray-500 mb-6">Manage your product catalog</p>
      <ProductsView products={products} />
    </div>
  );
}
