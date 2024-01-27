import axios_instance from "../../shared/utils/axios_server";

const login = (data) => {
  return axios_instance.post(`user/login`, data);
};

const logout = (data) => {
  return axios_instance.post(`user/logoutUser?_id=${data?.id}`);
};

const LoginService = {
  login,
  logout
};

export default LoginService;