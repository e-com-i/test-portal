"use client";
import React, { useState } from "react";
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import CustomerDetailsModal from "../CustomerDetailsModal";

const DisplayCartItem = ({ close }) => {
  const router = useRouter();
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useAppSelector((state) => state.cartItem.cart);
  const user = useAppSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (values: FormValues) => {
    console.log("Customer Data Submitted:", values);



  const doc = new jsPDF();

  // Store Information
  doc.setFontSize(16);
  doc.text("Your Store Name", 14, 15);
  doc.setFontSize(10);
  doc.text("Your Store Address Line 1", 14, 22);
  doc.text("Your Store Address Line 2", 14, 28);
  doc.text("Phone: XXXXXXXX", 14, 34);
  doc.text("Email: store@example.com", 14, 40);

  // Title
  doc.setFontSize(14);
  doc.text("Invoice", 105, 50, { align: "center" });

  // Prepare table columns and rows
  const tableColumn = ["S.No", "Product Name", "Unit", "Quantity", "Price (₹)", "Total (₹)"];
  const tableRows: (string | number)[][] = [];

  cartItem.forEach((item, index) => {
    tableRows.push([
      index + 1,
      item.productId.name,
      item.productId.unit,
      item.quantity,
      item.productId.price.toFixed(2),
      (item.quantity * item.productId.price).toFixed(2)
    ]);
  });

  // Add table using autoTable plugin
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 55,
  });

  // Calculate totals
  const totalQuantity = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItem.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

  // Get final Y coordinate of table and add summary
  const finalY = (doc as any).lastAutoTable?.finalY || 65;
  doc.text(`Total Quantity: ${totalQuantity}`, 14, finalY + 10);
  doc.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 14, finalY + 16);

  // Payment terms
  doc.text("Payment due within 15 days.", 14, finalY + 30);
  doc.text("Thank you for your business!", 14, finalY + 36);

  // Save the PDF
  // doc.save("invoice.pdf");
  };

  // const redirectToCheckoutPage = () => {
  //   if (user?._id) {
  //     router.push("/checkout");
  //     close?.();
  //   } else {
  //     toast("Please Login");
  //   }
  // };





  console.log(cartItem)

    const result = cartItem.reduce(
  (acc, item) => {
    acc.totalQuantity += item.quantity;
    acc.totalPrice += item.quantity * item.productId.price;
    return acc;
  },
  { totalQuantity: 0, totalPrice: 0 }
);

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
                    {/* <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span> */}
                    {/* <span>{DisplayPriceInRupees(totalPrice)}</span> */}
                    <span>{DisplayPriceInRupees(result?.totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity total</p>
                  {/* <p>{totalQty} item</p> */}
                  <p>{result?.totalQuantity} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="font-semibold flex items-center justify-between gap-4">
                  <p>Grand total</p>
                  {/* <p>{DisplayPriceInRupees(totalPrice)}</p> */}
                  <p>{DisplayPriceInRupees(result?.totalPrice)}</p>
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
              {/* <div>{DisplayPriceInRupees(totalPrice)}</div> */}
              <div>{DisplayPriceInRupees(result?.totalPrice)}</div>
              {/* <button onClick={redirectToCheckoutPage} className="flex items-center gap-1"> */}
              <button onClick={() =>setIsModalOpen(true)} className="flex items-center gap-1">
                Proceed
                <span>
                  <ChevronRight />
                </span>
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
