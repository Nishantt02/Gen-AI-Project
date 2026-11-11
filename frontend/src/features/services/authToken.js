const TOKEN_STORAGE_KEY = "authToken";

export const saveAuthToken = (token) => {
  if (typeof token !== "string" || token.length === 0) {
    throw new Error(
      "The API did not return an auth token. Deploy the updated backend, then log in again.",
    );
  }

  window.sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearAuthToken = () => {
  window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const authRequestConfig = () => {
  const token = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
  return {
    withCredentials: true,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  };
};
