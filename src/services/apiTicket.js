import axios from "axios";
import Cookies from "js-cookie";

export async function ticket(data) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.post(
      "http://localhost:3000/api/tickets",
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

//////////

export async function ticketlist() {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(
      `http://localhost:3000/api/tickets/users?page=1`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
//////////////////////
export async function getTicketById(id) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(
      `http://localhost:3000/api/tickets/users/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
/////////////
export async function getRepliesByTicketId(ticketId) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(
      `http://localhost:3000/api/chat/${ticketId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch replies: ${error.message}`);
  }
}
///////////////////////////
export async function submitReply(ticketId, reply) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.post(
      `http://localhost:3000/api/chat/${ticketId}`,
      reply,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to submit reply: ${error.message}`);
  }
}
