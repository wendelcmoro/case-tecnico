import axios from "./client";

// Login
export const login = async (data: any): Promise<any> => {
  try {
    const response = await axios.post("/auth/login", data);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
