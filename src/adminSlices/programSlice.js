import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgramsApi } from "../adminApi/programApi";

// -------- THUNK --------
export const fetchPrograms = createAsyncThunk(
  "programs/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProgramsApi();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load programs"
      );
    }
  }
);

const programSlice = createSlice({
  name: "programs",
  initialState: {
    list: [],          // ✅ always array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ VERY IMPORTANT
        // backend returns { data: [...] }
        state.list = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      });
  },
});

export default programSlice.reducer;
