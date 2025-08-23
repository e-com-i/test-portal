import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for your state


// State interface
interface ProductState {
  allCategory: Category[];
  loadingCategory: boolean;
  allSubCategory: SubCategory[];
  product: Product[];
}

// Initial state with typing
const initialValue: ProductState = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action: PayloadAction<Category[]>) => {
      state.allCategory = [...action.payload];
    },
    setLoadingCategory: (state, action: PayloadAction<boolean>) => {
      state.loadingCategory = action.payload;
    },
    setAllSubCategory: (state, action: PayloadAction<SubCategory[]>) => {
      state.allSubCategory = [...action.payload];
    },
    // Add reducers for product if needed
  },
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } = productSlice.actions;

export default productSlice.reducer;
