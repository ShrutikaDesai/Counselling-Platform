import axiosInstance from "../axiosInstance";

export const getProgramsApi = async () => {
  const response = await axiosInstance.get(
    "/program-package/get-programs/"
  );
  return response.data;
};
