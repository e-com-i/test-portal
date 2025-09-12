"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { Minus, Plus } from "lucide-react";
import { useGlobalContext } from "@/providers/GlobalProvider";
import { useAppDispatch, useAppSelector } from "@/store";
import Axios from "@/utils/Axios";
import SummaryApi from "@/common/SummaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import { handleAddItemCart } from "@/store/slice/cartProduct";
import { Button } from "../ui/button";

interface ProductData {
  _id: string;
  [key: string]: any; // extend if you need more product fields
}

interface AddToCartButtonProps {
  data: ProductData;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useAppSelector((state) => state.cartItem.cart as CartItem[]);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState<
    CartItem | undefined
  >();

  const handleADDTocart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const newCartItem: CartItem = {
      _id: data._id, // product ID
      quantity: 1, // default quantity
      productId: {
        price: data.price,
        discount: data.discount,
        ...data, // if productId needs more properties
      },
    };
    try {
      setLoading(true);
      dispatch(handleAddItemCart([...cartItem, newCartItem]));

      // thought api call

      // const response = await Axios({
      //   ...SummaryApi.addTocart,
      //   data: {
      //     productId: data?._id,
      //   },
      // });

      // const { data: responseData } = response;

      // if (responseData.success) {
      //   toast.success(responseData.message);
      //   if (fetchCartItem) {
      //     fetchCartItem();
      //   }
      // }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailableCart(checkingItem);

    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity || 0);
    setCartItemsDetails(product);
  }, [data, cartItem]);

  const increaseQty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;

    // const response = await updateCartItem(cartItemDetails._id, qty + 1);

    // if (response?.success) {
    //   toast.success('Item added');
    // }

    const updatedData = cartItem.map((item) => {
      if (item._id === cartItemDetails?._id) {
        if (item?.productId?.stock < cartItemDetails?.quantity) {
          toast.success("Sorry, You con't add more the items");
        } else {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
      }
      return item;
    });

    dispatch(handleAddItemCart(updatedData));
  };

  const decreaseQty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;

    if (qty === 1) {
      // deleteCartItem(cartItemDetails._id);
      // Remove item with matching _id from cartItem array
      const updatedData = cartItem.filter(
        (item) => item._id !== cartItemDetails._id
      );

      dispatch(handleAddItemCart(updatedData));
      toast.success("Item removed");
    } else {
      // const response = await updateCartItem(cartItemDetails._id, qty - 1);
      // if (response?.success) {
      //   toast.success('Item removed');
      // }
      const updatedData = cartItem.map((item) => {
        if (item._id === cartItemDetails?._id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      if (updatedData) {
        toast.success("Item removed");
      }

      dispatch(handleAddItemCart(updatedData));
    }
  };

  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex bg-green-600 w-full h-full text-white rounded">
          <Button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <Minus />
          </Button>

          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <Button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <Plus />
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleADDTocart}
          className="bg-green-100 border border-green-700 text-green-700 px-2 lg:px-4 py-1 rounded-full text-sm font-medium"
        >
          {loading ? <Loading /> : "Add"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
