"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "@/store/slice/addressSlice";
import { setOrder } from "@/store/slice/orderSlice";
import { handleAddItemCart } from "@/store/slice/cartProduct";
import AxiosToastError from "@/utils/AxiosToastError";
import { useAppSelector } from "@/store";


type GlobalContextType = {
  fetchCartItem: () => Promise<void>;
  updateCartItem: (id: string, qty: number) => Promise<any>;
  deleteCartItem: (cartId: string) => Promise<void>;
  fetchAddress: () => Promise<void>;
  fetchOrder: () => Promise<void>;
  totalPrice: number;
  totalQty: number;
  notDiscountTotalPrice: number;
};

const defaultContext: GlobalContextType = {
  fetchCartItem: async () => {},
  updateCartItem: async () => ({}),
  deleteCartItem: async () => {},
  fetchAddress: async () => {},
  fetchOrder: async () => {},
  totalPrice: 0,
  totalQty: 0,
  notDiscountTotalPrice: 0,
};

export const GlobalContext = createContext<GlobalContextType>(defaultContext);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
  children: ReactNode;
};

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const cartItem = useAppSelector((state) => state.cartItem.cart);
  const user = useAppSelector((state) => state.user);

  const fetchCartItem = async () => {
    try {
      // const response = await Axios({ ...SummaryApi.getCartItem });
      // const { data: responseData } = response;

      // if (responseData.success) {
      //   dispatch(handleAddItemCart(responseData.data));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id: string, qty: number) => {
    try {
      // const response = await Axios({
      //   ...SummaryApi.updateCartItemQty,
      //   data: { _id: id, qty },
      // });
      // const { data: responseData } = response;

      // if (responseData.success) {
      //   await fetchCartItem();
      //   return responseData;
      // }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId: string) => {
    try {
      // const response = await Axios({
      //   ...SummaryApi.deleteCartItem,
      //   data: { _id: cartId },
      // });
      // const { data: responseData } = response;

      // if (responseData.success) {
      //   toast.success(responseData.message);
      //   await fetchCartItem();
      // }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {

    const qty = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
    setTotalQty(qty);

    const discounted = cartItem.reduce((prev, curr) => {
      const price = pricewithDiscount(curr?.productId?.price, curr?.productId?.discount);
      return prev + price * curr.quantity;
    }, 0);
    setTotalPrice(discounted);

    const raw = cartItem.reduce((prev, curr) => {
      return prev + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(raw);
  }, [cartItem]);

  const handleLogoutOut = () => {
    // localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      // const response = await Axios({ ...SummaryApi.getAddress });
      // const { data: responseData } = response;
      // if (responseData.success) {
      //   dispatch(handleAddAddress(responseData.data));
      // }
    } catch (error) {
      // AxiosToastError(error);
    }
  };

  const fetchOrder = async () => {
    try {
      // const response = await Axios({ ...SummaryApi.getOrderItems });
      // const { data: responseData } = response;
      // if (responseData.success) {
      //   dispatch(setOrder(responseData.data));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
    handleLogoutOut();
    fetchAddress();
    fetchOrder();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrder,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
