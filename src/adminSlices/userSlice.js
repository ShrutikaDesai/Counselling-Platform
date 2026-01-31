import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { addUserApi } from "../adminApi/userApi";

/* ===================== THUNKS ===================== */

// ADD USER
export const addUser = createAsyncThunk(
  "users/addUser",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addUserApi(payload);
      return data; // { message, data }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add user");
    }
  }
);

// FETCH STUDENTS
export const fetchStudents = createAsyncThunk(
  "users/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/only-students/");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch students");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/users/${userId}/`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

/* ===================== SLICE ===================== */

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
      /* ---------- FETCH STUDENTS ---------- */
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
.addCase(fetchStudents.fulfilled, (state, action) => {
  state.loading = false;

  // Map users
  const mappedUsers = action.payload.map((u) => ({
    key: u.id,
    id: u.id,
    first_name: u.first_name || "",
    last_name: u.last_name || "",
    student_name: u.student_name || "",
    email: u.email || "",
    phone: u.phone || "",
    study_class: u.study_class || "",
    current_academic_stage: u.current_academic_stage || "",
    city: u.city || "",

    program: u.program_name || "N/A",
    package: u.package_name || "N/A",

    paymentStatus: u.payment_status
      ? u.payment_status
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "N/A",

    examStatus: u.exam_status?.completed > 0 ? "Completed" : "Pending",
reportStatus: u.is_report_locked ? "Unlocked" : "Locked",
    sessions: u.exam_status
      ? Object.values(u.exam_status).reduce((sum, val) => sum + val, 0)
      : "0",

    profile: {
      email: u.email || "",
      phone: u.phone || "",
      study_class: u.study_class || "",
      current_academic_stage: u.current_academic_stage || "",
      city: u.city || "",
      program_name: u.program_name || "",
      package_name: u.package_name || "",
      payment_status: u.payment_status || "",
    },
  }));

  // 🔥 Ensure newest users appear at the top
  state.list = mappedUsers.reverse(); // or sort by ID descending: mappedUsers.sort((a, b) => b.id - a.id)
})

      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ADD USER ---------- */
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage = action.payload.message;

        const u = action.payload.data;

        const newUser = {
          key: u.id,
          id: u.id,
          first_name: u.first_name || "",
          last_name: u.last_name || "",
          student_name: u.student_name || "",
          email: u.email || "",
          phone: u.phone || "",
          study_class: u.study_class || "",
          current_academic_stage: u.current_academic_stage || "",
          city: u.city || "",

          // FIXED: Access program_name and package_name directly
          program: u.program_name || "N/A",
          package: u.package_name || "N/A",

          paymentStatus: u.payment_status 
            ? u.payment_status.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')
            : "N/A",
            
          examStatus: u.exam_status?.completed > 0 ? "Completed" : "Pending",
          reportStatus: u.is_report_locked ? "Locked" : "Unlocked",
          sessions: u.exam_status 
            ? Object.values(u.exam_status).reduce((sum, val) => sum + val, 0)
            : "0",
            
          profile: {
            email: u.email || "",
            phone: u.phone || "",
            study_class: u.study_class || "",
            current_academic_stage: u.current_academic_stage || "",
            city: u.city || "",
            program_name: u.program_name || "",
            package_name: u.package_name || "",
            payment_status: u.payment_status || ""
          }
        };

        // Add new user at top
        state.list.unshift(newUser);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE USER ---------- */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (user) => user.id !== action.payload
        );
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;