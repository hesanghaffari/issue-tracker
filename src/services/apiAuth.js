import axios from "axios";
import Cookies from "js-cookie";

const mainURL = "https://itk.maynd.ir/api";
// https://itk.maynd.ir
export async function signup({
  fullname,
  email,
  password,
  company,
  licenseCode,
}) {
  try {
    const response = await axios.post(`${mainURL}/users`, {
      email,
      password,
      fullname,
      company,
      licenseCode,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}

export async function pass({ email }) {
  try {
    const response = await axios.post(`${mainURL}/forgetPassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
//////////////////////
export async function resend({ email }) {
  try {
    const response = await axios.post(`${mainURL}/users/resend-otp`, {
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
/////////////////////

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${mainURL}/auth`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}

export async function loginAdmin({ email, password }) {
  try {
    const response = await axios.post(`${mainURL}/authAdmin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
////////-------------------verifyEmail------------------//////

export async function verifyEmail({ otp, email }) {
  try {
    const response = await axios.post(`${mainURL}/users/otp`, {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
//////////////
export async function addAdmin({ fullname, email, password }) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `${mainURL}/admin`,
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
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}

//////////////////////////////////////
export async function updatePassword({ password, token }) {
  try {
    const response = await axios.put(
      `${mainURL}/users`,
      {
        password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
//////////////////////////////////////////
export async function addChild({
  fullname,
  email,
  password,
  company,
  licenseCode,
}) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.post(
      `${mainURL}/users/add-child`,
      {
        email,
        password,
        fullname,
        company,
        licenseCode,
      },
      {
        headers: {
          Authorization: token, // Correctly add the token to the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
///////////////////////////////////
export async function addMom({
  title,
  description,
  password,
  daart,
  webengage,
  customer,
  date,
  company,
  userId,
}) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.post(
      `${mainURL}/mom`,
      {
        title,
        description,
        password,
        daart,
        webengage,
        customer,
        date,
        company,
        userId, // Add userId to the payload
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
