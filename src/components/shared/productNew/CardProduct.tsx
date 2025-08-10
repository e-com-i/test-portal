import React, { useState } from "react";
import toast from "react-hot-toast";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { pricewithDiscount } from "@/utils/PriceWithDiscount";
import { valideURLConvert } from "@/utils/valideURLConvert";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";

interface ProductType {
  _id: string;
  name: string;
  image: string[];
  unit: string;
  price: number;
  discount: number;
  stock: number;
}

interface CardProductProps {
  data: ProductType;
}
// /product/nandini-toned-milk/productid/37083
const CardProduct: React.FC<CardProductProps> = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}/productid/${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={url}
      className="border relative py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-30 lg:min-w-45 rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down lg:scale-125"
        />
        {Boolean(data.discount) && (
          <p className="absolute top-2 right-2 text-green-600 bg-green-100 px-2 py-0.5 text-xs rounded-full shadow">
            {data.discount}% OFF
          </p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
          10 min
        </div>
      </div>

      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>

      <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base">
        {data.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center flex flex-col">
          <div className="font-semibold">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
          {Boolean(data.discount) && (
            <div className="font-semibold text-sm text-gray-500 line-through">
              {DisplayPriceInRupees(data.price)}
            </div>
          )}
        </div>

        <div>
          {data.stock === 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
