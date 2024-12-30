import Cookies from "js-cookie";
const BASE_URL = 'http://localhost:3004/api/';

const apiFetch = async (endpoint, options = {}) => {
  const token = Cookies.get("jwtToken");
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, //Further developement - This is for the additional headers required for updating user Profile Picture
    },
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      Cookies.remove('jwtToken');
      window.location.href = '/login';
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    throw error;
  }
};

export default apiFetch;
