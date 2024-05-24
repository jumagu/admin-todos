import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export const metadata = {
  title: "Products",
  description: "Aliqua pariatur ipsum est nisi esse ipsum adipisicing aliqua.",
};

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-6xl mx-auto gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
