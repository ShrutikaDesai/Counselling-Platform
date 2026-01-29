import axiosInstance from "../axiosInstance";

// ADD USER API
export const addUserApi = async (payload) => {
  const response = await axiosInstance.post(
    "/lead-registeration/add-users/",
    payload
  );
  return response.data;
};


// Fetch all students API
export const fetchStudentsApi = async () => {
  const response = await axiosInstance.get("/only-students/");
  return response.data;
};