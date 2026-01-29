import axiosInstance from "../axiosInstance";

// ================= CREATE PAYMENT =================
export const submitPaymentApi = async (payload) => {
  const response = await axiosInstance.post(
    "/payment/payments/",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data", // for receipt upload
      },
    }
  );
  return response.data;
};
