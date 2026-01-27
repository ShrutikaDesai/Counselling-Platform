import axiosInstance from "../axiosInstance";

export const addEnquiryApi = async (payload) => {
  const response = await axiosInstance.post(
    "/lead-registeration/add-enquiry/",
    payload
  );
  return response.data;
};
