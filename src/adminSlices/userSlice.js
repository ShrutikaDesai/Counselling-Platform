import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { addUserApi } from "../adminApi/userApi";

// ================= THUNKS =================
export const addUser = createAsyncThunk(
  "users/addUser",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/only-students/");
      
      // Handle different possible response structures
      let students = [];
      if (Array.isArray(response.data)) {
        students = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        students = response.data.data;
      } else if (response.data?.students && Array.isArray(response.data.students)) {
        students = response.data.students;
      } else if (response.data?.users && Array.isArray(response.data.users)) {
        students = response.data.users;
      }
      
      return students;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

// In THUNKS section
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// ================= SLICE =================
const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false,
    successMessage: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null;
    },
  },
 extraReducers: (builder) => {
  builder
    // ================= FETCH STUDENTS =================
    .addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;

      state.list = action.payload.map(user => ({
        id: user.id,
        key: user.id,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        program: user.program?.name || "",
        package: user.package?.name || "",
        paymentStatus: user.payment_status || "Verification Pending",
        paymentAmount: user.payment_amount || "₹0",
        examStatus: user.exam_status || "Pending",
        reportStatus: user.report_status || "Locked",
        sessions: user.sessions || "0/0",
      }));
    })

    .addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ================= ADD USER =================
    .addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })

    .addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.successMessage = action.payload.message;

      const user = action.payload.data;

      const newUser = {
        id: user.id,
        key: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        program: user.program?.name || "",
        package: user.package?.name || "",
        paymentStatus: "Verification Pending",
        paymentAmount: "₹0",
        examStatus: "Pending",
        reportStatus: "Locked",
        sessions: "0/0",
      };

      state.list.unshift(newUser);
    })

    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
}

});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;