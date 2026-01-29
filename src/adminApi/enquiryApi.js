import axiosInstance from "../axiosInstance";

//add enquiry
export const addEnquiryApi = async (payload) => {
  const response = await axiosInstance.post(
    "/lead-registeration/add-enquiry/",
    payload
  );
  return response.data;
};

//get enquiries
export const getEnquiriesApi = async () => {
  const response = await axiosInstance.get(
    "/lead-registeration/leads/"
  );
  return response.data;
};