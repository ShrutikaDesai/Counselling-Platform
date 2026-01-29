import { configureStore } from "@reduxjs/toolkit";

//  ================ ADMIN REDUCERS =================
import authReducer from "./adminSlices/authSlice";
import forgotPasswordReducer from "./adminSlices/forgotPasswordSlice";
import resetPasswordReducer from "./adminSlices/resetPasswordSlice";
import addEnquiryReducer from "./adminSlices/addEnquirySlice";
import enquiryListReducer from "./adminSlices/enquiryListSlice";
import programReducer from "./adminSlices/programSlice";
import userReducer from "./adminSlices/userSlice";
import packageReducer from "./adminSlices/packageSlice";

const store = configureStore({
  reducer: {
        auth: authReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        addEnquiry: addEnquiryReducer,
        enquiryList: enquiryListReducer,
        programs: programReducer, 
        users: userReducer,
        packages: packageReducer,
  },
});

export default store;
