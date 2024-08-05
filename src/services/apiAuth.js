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
    // Access the response data directly since it's plain text
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
export async function pass({ email }) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/forgetPassword",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    // Access the response data directly since it's plain text
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
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
    // Access the response data directly since it's plain text
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
export async function loginAdmin({ email, password }) {
  try {
    const response = await axios.post("http://localhost:5000/api/authAdmin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Access the response data directly since it's plain text
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
