"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

import { Star } from "./Star";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/shopping-cart/actions/actions";

interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({ id, name, price, rating, image }: Props) => {
  const router = useRouter();

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  };

  const onRemoveFromCart = () => {
    removeProductFromCart(id);
    router.refresh();
  };

  return (
    <div className="shadow rounded-lg max-w-sm bg-gray-800 border-gray-100">
      {/* Product Image */}
      <div className="p-2">
        <Image
          className="rounded"
          src={image}
          width={500}
          height={500}
          alt={name}
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-white">
            {name}
          </h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Stars */}
          {Array(rating)
            .fill(0)
            .map((value, index) => (
              <Star key={index} />
            ))}

          {/* Rating Number */}
          <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-white">${price}</span>

          <div className="flex">
            <button
              className="text-white mr-2 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={onAddToCart}
            >
              <IoAddCircleOutline size={20} />
            </button>
            <button
              className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
              onClick={onRemoveFromCart}
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
