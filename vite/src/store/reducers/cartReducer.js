import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
  data: [],
  totalItem: 0,
  amount: 0,
};

const cartReducer = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    updateCart(state, action) {
      let totalItems = 0;
      const { amount } = action.payload.reduce(
        (acc, item) => {
          totalItems++;
          acc.amount += item.price; // Assuming each item has a 'price' field
          return acc;
        },
        { totalItems: 0, amount: 0 }
      );
      state.isAuthenticated = false;
      state.loading = true;
      state.message = "Successfully Added To Cart";
      state.data = action.payload;
      state.totalItem = totalItems;
      state.amount = amount;
    },
    cleanCart(state, action) {
      state.loading = false;
      state.message = "Successfully Removed From Cart";
      state.data = [];
      state.totalItem = 0;
      state.amount = 0;
    },
  },
});

export const { updateCart, cleanCart } = cartReducer.actions;

export default cartReducer.reducer;
