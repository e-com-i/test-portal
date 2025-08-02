import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single cart item
export interface CartItem {
  _id: string;
  quantity: number;
  productId: {
    price: number;
    discount: number;
    [key: string]: any; // optional: if productId may contain other dynamic keys
  };
}

// Define the type for the slice state
interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    handleAddItemCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = [...action.payload];
    },
  },
});

export const { handleAddItemCart } = cartSlice.actions;

export default cartSlice.reducer;
