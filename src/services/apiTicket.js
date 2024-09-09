import axios from "axios";
import Cookies from "js-cookie";

const mainURL = " http://localhost:3000";

export async function ticket(data) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.post(`${mainURL}/api/tickets`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

//////////
export async function ticketlist({
  filter = null,
  problemType = null,
  page = 1,
  search = "",
  date = null,
}) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const params = { page };

    if (filter) {
      params[filter.field] = filter.value;
    }

    if (problemType) {
      params.problemType = problemType;
    }

    if (search) {
      params.search = search;
    }

    if (date) {
      params.date = date; // Add createdAt to the params
    }

    const response = await axios.get(`${mainURL}/api/tickets/users`, {
      params,
      headers: {
        Authorization: token,
      },
    });

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

    const response = await axios.get(`${mainURL}/api/tickets/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });

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

    const response = await axios.get(`${mainURL}/api/chat/${ticketId}`, {
      headers: {
        Authorization: token,
      },
    });

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
      `${mainURL}/api/chat/${ticketId}`,
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
/////////////////
export async function ticketlistAdmin({
  filter = null,
  problemType = null,
  page = 1,
  search = "",
  date = null,
}) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const params = { page };

    if (filter) {
      params[filter.field] = filter.value;
    }

    if (problemType) {
      params.problemType = problemType;
    }

    if (search) {
      params.search = search;
    }

    if (date) {
      params.date = date; // Add createdAt to the params
    }

    const response = await axios.get(`${mainURL}/api/tickets`, {
      params,
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}

////////////////////////////////////
export async function ticketlistAdminMyTicket({
  filter = null,
  problemType = null,
  page = 1,
  search = "",
  date = null,
}) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const params = { page };

    if (filter) {
      params[filter.field] = filter.value;
    }

    if (problemType) {
      params.problemType = problemType;
    }

    if (search) {
      params.search = search;
    }

    if (date) {
      params.date = date; // Add createdAt to the params
    }

    const response = await axios.get(`${mainURL}/api/tickets/myTickets`, {
      params,
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
/////////////////////////////
export async function getTicketAdminById(id) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(`${mainURL}/api/tickets/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
/////////////////////////////
export async function assignTicketToUser(ticketId, email) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.put(
      `${mainURL}/api/tickets/assign`,
      {
        ticketId,
        email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}
///////////////////////////////

// export async function finishTicket(ticketId) {
//   try {
//     const token = Cookies.get("authToken");

//     const response = await axios.put(
//       `http://localhost:3000/api/tickets/${ticketId}/finish`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response?.data || "An error occurred";
//     throw new Error(errorMessage);
//   }
// }

export async function updateTicketStatus(ticketId, status) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.put(
      `${mainURL}/api/tickets/${ticketId}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
}

export async function finishTicket(ticketId) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.put(
      `${mainURL}/api/tickets/${ticketId}/finish`,
      {}, // Empty object for the payload, since PUT requests usually expect one
      {
        headers: {
          Authorization: token, // Correctly add the token to the headers
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to finish the ticket: ${error.message}`);
  }
}
//////////////////////////////////////
export async function listAdmin(page = 1) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }
    const params = page;

    const response = await axios.get(`${mainURL}/api/admin`, {
      params,

      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
///////////////////////
export async function listUsers(page = 1) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }
    const params = page;

    const response = await axios.get(`${mainURL}/api/users`, {
      params,

      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
