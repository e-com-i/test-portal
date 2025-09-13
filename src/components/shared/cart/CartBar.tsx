"use client";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DisplayCartItem from "../DisplayCartItem";

const CartBar = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const [visible, setVisible] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);
  useEffect(() => {
    if (totalQty) {
      // Delay setting visible to true for transition start
      const timeout = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [totalQty]);

  if (!totalQty) return null;

  return (
    <>
      {" "}
      <div
        className={`
        fixed bottom-4 md:hidden left-4 right-4 bg-green-700 text-white rounded-lg shadow-lg flex items-center justify-between p-2 z-50
        transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-600 rounded-md">
            <ShoppingCartIcon className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p>
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </p>
            <p className="font-semibold text-sm">₹ {totalPrice}</p>
          </div>
        </div>
        <button
          onClick={() => setOpenCartSection(true)} // add if needed
          className="text-lg font-medium hover:underline"
          aria-label="View Cart"
        >
          View Cart &gt;
        </button>
      </div>
      {openCartSection && (
        <div className="cart-overlay">
          {" "}
          <DisplayCartItem close={() => setOpenCartSection(false)} />
        </div>
      )}
    </>
  );
};

export default CartBar;
