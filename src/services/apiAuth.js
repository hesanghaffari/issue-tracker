import axios from "axios";

export async function signup({ fullname, email, password }) {
  try {
    const response = await axios.post("http://localhost:3000/api/users", {
      email,
      password,
      fullname,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

export async function pass({ email }) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/forgetPassword",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post("http://localhost:3000/api/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

export async function loginAdmin({ email, password }) {
  try {
    const response = await axios.post("http://localhost:3000/api/authAdmin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
////////-------------------verifyEmail------------------//////

export async function verifyEmail({ otp, email }) {
  try {
    const response = await axios.post("http://localhost:3000/api/users/otp", {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
