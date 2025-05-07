const API_ROOT = "http://localhost:5000";
const API_ORIGIN = "/api/auth";
const LOGIN_API = `${API_ROOT}${API_ORIGIN}/login`;
const REGISTER_API = `${API_ROOT}${API_ORIGIN}/register`;
const REFRESH_API = `${API_ROOT}${API_ORIGIN}/refresh`;

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

  if (!res.ok) {
    return {
      message: data.message || "Registration failed",
      success: false,
    };
  }

  return {
    message: "Registration successful",
    success: true,
    data,
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

    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err.message);
    return null;
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
    if (!newAccessToken) return res;

    // Retry the request once with new token
    return secureFetch(url, options, false);
  }

  return res;
};

export { login, register, refreshToken, secureFetch };
