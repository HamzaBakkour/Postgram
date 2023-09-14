import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import axios from "axios";

function useUserActions() {
  const navigate = useNavigate();

  
  return {
    login,
    register,
    logout,
    edit,
  };


  // Login the user
  function login(data) {
    // axios.defaults.baseURL = "http://localhost:80";
    return axios.post(`/api/auth/login/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate("/");
    });
  }

  // Register the user
  function register(data) {
    return axios.post(`/api/auth/register/`, data).then((res) => {
      // Registering the account and tokens in the store
      setUserData(res.data);
      navigate("/verify/");
    });
  }

  // Edit the user
  function edit(data, userId) {
    return axiosService
      .patch(`/api/user/${userId}/`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        // Registering the account in the store
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: getAccessToken(),
            refresh: getRefreshToken(),
            user: res.data,
          })
        );
      });
  }

  // Logout the user
  function logout() {
    return axiosService
      .post(`/api/auth/logout/`, { refresh: getRefreshToken() })
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/login");
      });
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}

export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
