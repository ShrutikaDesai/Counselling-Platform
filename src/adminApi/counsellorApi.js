import axiosInstance from "../axiosInstance";

/*** Fetch all lead counsellors */
export const fetchLeadCounsellorsApi = async () => {
  const response = await axiosInstance.get("/counselling_slot/lead-counsellor/");
  return response.data;
};

/*** Fetch all normal counsellors */
export const fetchNormalCounsellorsApi = async () => {
  const response = await axiosInstance.get("/counselling_slot/counsellor/");
  return response.data;
};
