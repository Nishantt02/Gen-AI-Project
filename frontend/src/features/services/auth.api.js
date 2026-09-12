import axios from "axios";

export async function registerUser({ username, email, password }) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
      username,
      email,
      password,

    },
    {
          withCredentials:true
    })
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
      email,
      password,
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
}

export async function getme() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/get-me`, {
      withCredentials: true,
    });
    return response.data;
    console.log("get me data", response.data);
  } catch (error) {
    console.error("Error getting me data:", error);
    throw error;
  }
}
