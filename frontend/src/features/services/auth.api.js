import axios from "axios";
import { authRequestConfig, clearAuthToken, saveAuthToken } from "./authToken.js";

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
    saveAuthToken(response.data.token);
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
    saveAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
      authRequestConfig(),
    );
    clearAuthToken();
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
}


export async function getme() {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/auth/get-me`,
            authRequestConfig()
        );

        return response.data;
    } catch (error) {
        if (error.response?.status !== 401) {
            console.error(
                "Error getting user:",
                error.response?.data || error.message
            );
        }

        throw error;
    }
  }
