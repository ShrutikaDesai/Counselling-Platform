import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitPaymentApi } from "../adminApi/paymentApi";

// ================= THUNK =================
export const submitPayment = createAsyncThunk(
  "payment/submit",
  async (payload, { rejectWithValue }) => {
    try {
      return await submitPaymentApi(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment failed");
    }
  }
);

// ================= SLICE =================
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
