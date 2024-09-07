import axios from "axios";
import Cookies from "js-cookie";

const mainURL = "http://localhost:3000";

export async function signup({ fullname, email, password }) {
  try {
    const response = await axios.post(`${mainURL}/api/users`, {
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
    const response = await axios.post(`${mainURL}/api/forgetPassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${mainURL}/api/auth`, {
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
    const response = await axios.post(`${mainURL}/api/authAdmin`, {
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
    const response = await axios.post(`${mainURL}/api/users/otp`, {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
//////////////
export async function addAdmin({ fullname, email, password }) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `${mainURL}/api/admin`,
      {
        email,
        password,
        fullname,
      },
      {
        headers: {
          Authorization: token, // Correctly add the token to the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
