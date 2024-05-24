import { cookies } from "next/headers";

import { WidgetItem } from "../../../components/widget-item/WidgetItem";

import { CartItem } from "@/shopping-cart";
import { products, type Product } from "@/products/data/products";

export const metadata = {
  title: "Cart Products",
  description: "Consequat elit magna sunt excepteur ipsum occaecat.",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);

    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce(
    (previous, current) => current.product.price * current.quantity + previous,
    0
  );

  return (
    <div className="bg-white p-4 rounded-xl max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Cart Products</h1>

      {productsInCart.length < 1 ? (
        <div className="flex justify-center items-center">
          <p className="text-lg font-medium py-3">Your Cart is Empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 w-full lg:w-8/12">
            {productsInCart.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
              />
            ))}
          </div>

          <div className="flex flex-col w-full lg:w-4/12">
            <WidgetItem title="Total due">
              <span className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </span>
              <span className="font-bold text-gray-500">
                Tax 15%: ${(totalToPay * 0.15).toFixed(2)}
              </span>
            </WidgetItem>
          </div>
        </div>
      )}
    </div>
  );
}
