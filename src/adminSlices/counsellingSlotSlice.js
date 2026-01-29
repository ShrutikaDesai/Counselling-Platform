import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCounsellingSlotApi,
  getCounsellingSlotsApi,
  updateCounsellingSlotApi,
  deleteCounsellingSlotApi,
} from "../adminApi/counsellingSlotApi";

/* -------------------- THUNKS -------------------- */

// Create slot
export const createCounsellingSlot = createAsyncThunk(
  "counsellingSlot/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await createCounsellingSlotApi(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create slot"
      );
    }
  }
);

// Get slots
export const fetchCounsellingSlots = createAsyncThunk(
  "counsellingSlot/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getCounsellingSlotsApi();
    } catch (error) {
      return rejectWithValue("Failed to fetch slots");
    }
  }
);

// Update slot
export const updateCounsellingSlot = createAsyncThunk(
  "counsellingSlot/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateCounsellingSlotApi(id, payload);
    } catch (error) {
      return rejectWithValue("Failed to update slot");
    }
  }
);

// Delete slot
export const deleteCounsellingSlot = createAsyncThunk(
  "counsellingSlot/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCounsellingSlotApi(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete slot");
    }
  }
);

/* -------------------- SLICE -------------------- */

const counsellingSlotSlice = createSlice({
  name: "counsellingSlot",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSlotState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createCounsellingSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCounsellingSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.unshift(action.payload);
      })
      .addCase(createCounsellingSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH
      .addCase(fetchCounsellingSlots.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // UPDATE
      .addCase(updateCounsellingSlot.fulfilled, (state, action) => {
        state.list = state.list.map((slot) =>
          slot.id === action.payload.id ? action.payload : slot
        );
      })

      // DELETE
      .addCase(deleteCounsellingSlot.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (slot) => slot.id !== action.payload
        );
      });
  },
});

export const { resetSlotState } = counsellingSlotSlice.actions;
export default counsellingSlotSlice.reducer;
