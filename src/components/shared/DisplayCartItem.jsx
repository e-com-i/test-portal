"use client";
import React from "react";
import { CircleX, ChevronRight } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import imageEmpty from "@/assets/images/empty_cart.webp";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { useAppSelector } from "@/store";
import { pricewithDiscount } from "@/utils/PriceWithDiscount";
import { useGlobalContext } from "@/providers/GlobalProvider";

const DisplayCartItem = ({ close }) => {
  const router = useRouter();
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useAppSelector((state) => state.cartItem.cart);
  const user = useAppSelector((state) => state.user);

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      router.push("/checkout");
      close?.();
    } else {
      toast("Please Login");
    }
  };

  console.log(cartItem)

  return (
    <section className="bg-neutral/90 fixed top-0 bottom-0 right-0 left-0 inset-0 bg-black/50 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link href="/" className="lg:hidden">
            <CircleX size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <CircleX size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {cartItem.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem.map((item) => (
                  <div key={item?._id + "cartItemDisplay"} className="flex w-full gap-4">
                    <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                      <img
                        src={item?.productId?.image?.[0]}
                        className="object-scale-down w-full h-full"
                        alt={item?.productId?.name}
                      />
                    </div>
                    <div className="w-full max-w-sm text-xs">
                      <p className="text-xs text-ellipsis line-clamp-2">
                        {item?.productId?.name}
                      </p>
                      <p className="text-neutral-400">{item?.productId?.unit}</p>
                      <p className="font-semibold">
                        {DisplayPriceInRupees(
                          pricewithDiscount(item?.productId?.price, item?.productId?.discount)
                        )}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item?.productId} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill details</h3>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Items total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  <p>{totalQty} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center">
              <img
                src={imageEmpty}
                className="w-full h-full object-scale-down"
                alt="Empty Cart"
              />
              <Link
                href="/"
                onClick={close}
                className="block bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem.length > 0 && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
                Proceed
                <span>
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
