import api from "../api";

export const login = async (username, password) => {
  const res = await api.post("api/login/", { username, password });
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
};

export const register = async (userData) => {
  await api.post("api/register/", userData);
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getUser = async () => {
  const res = await api.get("api/user/");
  return res.data;
};
