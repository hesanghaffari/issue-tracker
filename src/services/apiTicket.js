import axios from "axios";

export async function ticket({ fullname, email, password }) {
  try {
    const response = await axios.post("http://localhost:5000/api/tickets", {
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
