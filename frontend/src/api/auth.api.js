const { VITE_AUTH_API_ENDPOINT } = import.meta.env || {};
const LOGIN_API = `${VITE_AUTH_API_ENDPOINT}/login`;
const REGISTER_API = `${VITE_AUTH_API_ENDPOINT}/register`;
const REFRESH_API = `${VITE_AUTH_API_ENDPOINT}/refresh`;
const LOGOUT_API = `${VITE_AUTH_API_ENDPOINT}/logout`;

const login = async (email, password) => {
  if (!email || !password)
    ({ message: "Email and Password is required", success: false });

  const res = await fetch(LOGIN_API, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      message: data.message || "Login failed",
      success: false,
    };
  }

  localStorage.setItem("accessToken", data.accessToken);

  return {
    message: "Login successful",
    success: true,
    data,
  };
};

const register = async (username, email, password) => {
  if (!username || !email || !password) {
    return {
      message: "Username, Email and Password is required",
      success: false,
    };
  }

  const res = await fetch(REGISTER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  const { message, success, name } = data;

  return {
    message,
    success,
    name,
  };
};

const refreshToken = async () => {
  try {
    const res = await fetch(REFRESH_API, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Refresh failed");
    }
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err.message);
    return null;
  }
};

const logout = async () => {
  try {
    const response = await fetch(LOGOUT_API, {
      method: "POST",
      credentials: "include", // Ensure cookies (like refreshToken) are sent
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      // Optional: Clear tokens, user state, and redirect
      localStorage.removeItem("accessToken");
    } else {
      const error = await response.json();
      console.error("Logout failed:", error.message);
    }
  } catch (err) {
    console.error("Logout error:", err.message);
  }
};

const secureFetch = async (url, options = {}, retry = true) => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.status === 401 && retry) {
    const newAccessToken = await refreshToken();
    localStorage.setItem("accessToken", newAccessToken);
    if (!newAccessToken) return res;

    // Retry the request once with new token
    return secureFetch(url, options, false);
  }

  return res;
};

export { login, register, refreshToken, secureFetch, logout };
