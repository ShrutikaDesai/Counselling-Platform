import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordApi } from "../adminApi/authApi";

// ================= THUNK =================
export const sendResetLink = createAsyncThunk(
  "forgotPassword/sendResetLink",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await forgotPasswordApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to send otp to your email"
      );
    }
  }
);

// ================= SLICE =================
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearForgotPasswordState: (state) => {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendResetLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendResetLink.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearForgotPasswordState } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
