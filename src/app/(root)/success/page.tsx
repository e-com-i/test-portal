"use client";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import { pricewithDiscount } from "@/utils/PriceWithDiscount";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlinkitStyleOrderSummary() {
  const searchParams = useSearchParams();
  const router = useRouter();
   const dataParam = searchParams.get("data");
  const cartParam = searchParams.get("cd");
  const totalPriceParam = searchParams.get("tp");
  const totalQtyParam = searchParams.get("tq");
  function safeDecodeURIComponent(param: string | null) {
  if (!param) return null;
  try {
    return JSON.parse(param);
  } catch (err) {
    console.warn("Failed to decode or parse param:", param, err);
    return null;
  }
}

const data = safeDecodeURIComponent(dataParam);
const cart = safeDecodeURIComponent(cartParam);


  return (
   <main className="max-w-md mx-auto p-4 space-y-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Thank you for your order!
      </h1>

      {/* Order Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {cart && cart.length > 0 ? (
            cart.map((item:CartItem) => (
              <div
                key={item._id + "cartItemDisplay"}
                className="flex w-full gap-4 py-3"
              >
                <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded flex items-center justify-center">
                  <img
                    src={item.productId.image?.[0]}
                    className="object-scale-down w-full h-full"
                    alt={item.productId.name}
                  />
                </div>
                <div className="w-full max-w-sm text-xs">
                  <p className="text-xs text-ellipsis line-clamp-2">
                    {item.productId.name}
                  </p>
                  <p className="text-neutral-400">{item.productId.unit}</p>
                  <p className="font-semibold">
                    {DisplayPriceInRupees(
                                              pricewithDiscount(
                                                item.productId.price,
                                                item.productId.discount
                                              )
                                            )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No items found</p>
          )}
        </div>
        <div className="flex justify-between font-bold mt-4 text-gray-900 text-lg">
          <span>Subtotal</span>
          <span>₹{totalPriceParam}</span>
        </div>
      </section>

      {/* Billing Details */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Billing Details</h2>
        {data ? (
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Name: </span>
              {data.fullName}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {data.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {data.countryCode} {data.phone}
            </p>
            {data.address && (
              <p>
                <span className="font-semibold">Address: </span>
                {data.address}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Billing details not available.</p>
        )}
      </section>

      {/* Grand Total */}
      <section className="border-t pt-4 text-center space-y-4">
        <p className="text-xl font-bold text-green-700">
          Grand Total: ₹ {totalPriceParam}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => generateInvoicePdf(cart, data)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap"
          >
            Download Invoice
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 whitespace-nowrap"
          >
            Back Home
          </button>
        </div>
      </section>
    </main>
  );
}
