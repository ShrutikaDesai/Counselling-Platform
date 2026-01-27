import { configureStore } from "@reduxjs/toolkit";

//  ================ ADMIN REDUCERS =================
import authReducer from "./adminSlices/authSlice";
import forgotPasswordReducer from "./adminSlices/forgotPasswordSlice";
import resetPasswordReducer from "./adminSlices/resetPasswordSlice";
import addEnquiryReducer from "./adminSlices/addEnquirySlice";
import programReducer from "./adminSlices/programSlice";

const store = configureStore({
  reducer: {
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        addEnquiry: addEnquiryReducer,
        programs: programReducer, 
  },
});

export default store;
