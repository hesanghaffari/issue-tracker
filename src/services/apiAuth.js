import axios from "axios";

export async function signup({ fullname, email, password }) {
  try {
    const response = await axios.post("http://localhost:5000/api/users", {
      email,
      password,
      fullname,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post("http://localhost:5000/api/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
}
