import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks for API Calls
export const ShowProducts = createAsyncThunk("ShowProducts", async () => {
  const response = await axios.get(`http://localhost:3000/product`);
  return response.data;
});

export const createProduct = createAsyncThunk(
  "createProduct",
  async (payload) => {
    const response = await axios.post(`http://localhost:3000/product`, payload);
    return response.data;
  }
);

// Product Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    cart: [],
    isLoading: false,
    isError: false,
    wishlist: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        // Add the new quantity to existing quantity
        existingItem.quantity =
          (existingItem.quantity || 1) + (action.payload.quantity || 1);
      } else {
        // Add new item with the specified quantity or default to 1
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload; // `type` can be 'increment' or 'decrement'
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        if (type === "increment") {
          existingItem.quantity += 1;
        } else if (type === "decrement" && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else if (type === "decrement" && existingItem.quantity === 1) {
          // Optional: Remove the item when quantity reaches 0
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    loadCartFromLocalStorage: (state) => {
      const storedCart = localStorage.getItem("productCartData");
      if (storedCart) {
        state.cart = JSON.parse(storedCart);
      }
    },
    addToWishlist: (state, action) => {
      const exists = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("productCartData");
    },
  },
  extraReducers: (builder) => {
    // Handle ShowProducts API Call
    builder.addCase(ShowProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(ShowProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(ShowProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Handle createProduct API Call
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.product.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Sync Cart with Local Storage
    builder.addMatcher(
      (action) =>
        action.type.startsWith("product/") && action.type.endsWith("Cart"),
      (state) => {
        localStorage.setItem("productCartData", JSON.stringify(state.cart));
      }
    );
  },
});

export const {
  addToCart,
  removeFromCart,
  loadCartFromLocalStorage,
  updateQuantity,
  addToWishlist,
  removeFromWishlist,
  clearCart,
} = productSlice.actions;
export default productSlice.reducer;
