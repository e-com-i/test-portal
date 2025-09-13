"use client";
import React, { FunctionComponent, useState } from "react";
import { CircleX, ChevronRight } from "lucide-react";
import imageEmpty from "@/assets/images/empty_cart.webp";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { useAppSelector } from "@/store";
import { pricewithDiscount } from "@/utils/PriceWithDiscount";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import CustomerDetailsModal from "../CustomerDetailsModal";
import AddToCartButton from "./cart/AddToCartButton";

interface DisplayCartItem {
  close: () => void;
}

const DisplayCartItem: FunctionComponent<DisplayCartItem> = ({ close }) => {
  const router = useRouter();
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useAppSelector((state) => state.cartItem.cart);
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // Use NEXT_PUBLIC_ prefix for env variables accessible in the browser
  const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (values: FormValues) => {
    if (!ACCESS_KEY) {
      console.error("Missing ACCESS_KEY");
      toast.error("Configuration error, try again later.");
      return;
    }
setLoading(true);
    const submitData = new FormData();
    submitData.append("access_key", ACCESS_KEY);
    submitData.append("fullName", values.fullName);
    submitData.append("email", values.email);
    submitData.append("countryCode", values.countryCode); // fixed key usage
    submitData.append("phone", values.phone);
    submitData.append("address", values.address || "");

    // Order information
    submitData.append("order_date", new Date().toISOString());
    submitData.append("order_items_count", cartItem.length.toString());
    submitData.append("grand_total", totalPrice.toFixed(2));

    cartItem.forEach((item, index) => {
      submitData.append(`product_${index + 1}_id`, item._id);
      submitData.append(`product_${index + 1}_name`, item.productId.name);
      submitData.append(
        `product_${index + 1}_price`,
        pricewithDiscount(
          item.productId.price,
          item.productId.discount
        ).toString()
      );
      submitData.append(
        `product_${index + 1}_quantity`,
        item.quantity.toString()
      );
      submitData.append(
        `product_${index + 1}_total`,
        (item.productId.price * item.quantity).toFixed(2)
      );
    });
    const detailedMessage = `
🛒 NEW ECOMMERCE ORDER RECEIVED!

📋 ORDER DETAILS:

Order Date: ${new Date().toISOString()}
Total Items: ${cartItem.length}

👤 CUSTOMER INFORMATION:
Name: ${values.fullName}
Email: ${values.email}
countryCode: ${values.countryCode}
Phone: ${values.phone}
Address: ${values.address}



💰 ORDER SUMMARY:
Subtotal: $${totalPrice}
GRAND TOTAL: $${totalPrice}

⚡ This order was automatically generated from your ecommerce website.
Please process this order and contact the customer for payment confirmation.
      `;
    // submitData.append('ccemail', 'sales@company.com;manager@company.com;orders@company.com;sanjeev.kukanur@gmail.com');
    // submitData.append('bccemail', 'backup@company.com');
    submitData.append("message", detailedMessage);
    // Send additional metadata
    submitData.append("website_url", window.location.origin);
    submitData.append("user_agent", navigator.userAgent);
    submitData.append("order_status", "Pending Payment");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        toast.success("Form submitted successfully");

        const dataParam = encodeURIComponent(JSON.stringify(result.data));
        const cartParam = encodeURIComponent(JSON.stringify(cartItem));
        const totalPriceParam = encodeURIComponent(totalPrice.toString());
        const totalQtyParam = encodeURIComponent(totalQty.toString());

        router.push(
          `/success?data=${dataParam}&cd=${cartParam}&tp=${totalPriceParam}&tq=${totalQtyParam}`
        );
      } else {
        setStatus("error");
        toast.error("Form submission error");
        console.error("Form submission error:", result);
      }
    } catch (error) {
      setStatus("error");
      toast.error("Network error");
      console.error("Network error:", error);
    }finally {
    setLoading(false); // end loading
  }
  };

  return (
    <section className="bg-neutral/90 fixed inset-0 bg-black/50 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Cart</h2>
          <Link href="/" className="lg:hidden" onClick={close}>
            <CircleX size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <CircleX size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4 overflow-auto">
          {cartItem.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5">
                {cartItem.map((item) => (
                  <div
                    key={item._id + "cartItemDisplay"}
                    className="flex w-full gap-4"
                  >
                    <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
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
                    <AddToCartButton data={item} />
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
                  <p>
                    {totalQty} item{totalQty !== 1 ? "s" : ""}
                  </p>
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
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-1"
                disabled={loading}
              >
                Proceed
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
        <CustomerDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      </div>
    </section>
  );
};

export default DisplayCartItem;
