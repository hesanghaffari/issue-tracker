import axios from "axios";
import Cookies from "js-cookie";

const mainURL = "https://itk.maynd.ir/api";

export async function ticket(data) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.post(`${mainURL}/tickets`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
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

    const response = await axios.get(`${mainURL}/tickets/users`, {
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

    const response = await axios.get(`${mainURL}/tickets/users/${id}`, {
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

    const response = await axios.get(`${mainURL}/chat/${ticketId}`, {
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

    const response = await axios.post(`${mainURL}/chat/${ticketId}`, reply, {
      headers: {
        Authorization: token,
      },
    });

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

    const response = await axios.get(`${mainURL}/tickets`, {
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

    const response = await axios.get(`${mainURL}/tickets/myTickets`, {
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

    const response = await axios.get(`${mainURL}/tickets/${id}`, {
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
      `${mainURL}/tickets/assign`,
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
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
///////////////////////////////

// export async function finishTicket(ticketId) {
//   try {
//     const token = Cookies.get("authToken");

//     const response = await axios.put(
//       `http://localhost:3000/tickets/${ticketId}/finish`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
//     throw new Error(errorMessage);
//   }
// }

export async function updateTicketStatus(ticketId, status) {
  try {
    const token = Cookies.get("authToken");

    const response = await axios.put(
      `${mainURL}/tickets/${ticketId}`,
      { status },
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

export async function finishTicket(ticketId) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.put(
      `${mainURL}/tickets/${ticketId}/finish`,
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

    const response = await axios.get(`${mainURL}/admin`, {
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
export async function listUsersMom() {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(`${mainURL}/users?limit=9999999999999`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
}
//////////////////
export async function listUsers(page = 1) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }
    const params = page;

    const response = await axios.get(`${mainURL}/users`, {
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

export async function exportTicketsExcel() {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    const response = await axios.get(`${mainURL}/tickets/export/excel`, {
      headers: {
        Authorization: token,
      },
      responseType: "blob", // Important to handle file downloads
    });

    // Create a URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tickets.xlsx"); // Filename for the download
    document.body.appendChild(link);
    link.click();

    // Clean up after download
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Failed to export tickets: ${error.message}`);
  }
}
////////////////////////
export async function deleteAdmin(adminId) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.delete(`${mainURL}/admin/${adminId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
///////////////////////////
export async function deleteUser(userId) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.delete(`${mainURL}/users/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
/////////////////////////////////////
export async function listChild(page = 1) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }
    const params = page;

    const response = await axios.get(`${mainURL}/users/children`, {
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
//////////////////////////////////////
export async function deleteChild(ChildId) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.delete(
      `${mainURL}/users/delete-child/${ChildId}`,
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
////////////////////////////
export async function updateTicketStatusToPending(ticketId) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }

    // Payload with the status update
    const payload = {
      status: "در انتظار وب انگیج", // Set the status to pending on WebEngage
    };

    const response = await axios.put(
      `${mainURL}/tickets/${ticketId}`,
      payload, // Send the payload in the request body
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to update the ticket status: ${error.message}`);
  }
}

///////////////////////////

export async function listMom(page = 1) {
  try {
    const token = Cookies.get("authToken");

    if (!token) {
      throw new Error("Auth token not found in cookies");
    }
    const params = page;

    const response = await axios.get(`${mainURL}/mom`, {
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
//////////////////////////////
export async function deleteMom(MomId) {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.delete(`${mainURL}/mom/${MomId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "لطفا مجددا امتحان کنید.";
    throw new Error(errorMessage);
  }
}
