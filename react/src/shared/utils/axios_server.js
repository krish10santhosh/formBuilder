import axios from "axios";
import TokenService from "./tokenUtillService";

let originalConfig;

const getData = async () => {
  const response = await fetch(process.env.REACT_APP_IP_ADDRESS_DEV)
  const data = await response.json()
  return data.ip;
}

const getRefreshToken = () => axios_instance.post('/user/refreshtoken', { refreshToken: TokenService.getLocalRefreshToken(), ipAddress: getData() }, {
}).then((data) => {
  return data;
})

const axios_instance = axios.create({
});

axios_instance.interceptors.request.use((config, error) => {
  let user = JSON.parse(localStorage.getItem("userData"));
  config.baseURL = process.env.REACT_APP_API_URL_DEV;
  config.headers['Authorization'] = `Bearer: ${user?.jwttoken}`
  return config;
});

axios_instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      if (!originalConfig) {
        originalConfig = getRefreshToken().then(token => {
          originalConfig = null
          return token.data
        })
      }
      return originalConfig.then(token => {
        error.config.headers['authorization'] = `Bearer: ${token?.jwttoken}`
        TokenService.updateLocalAccessToken(token?.jwttoken);
        return axios_instance(error.config);
      })
    }
    return Promise.reject(error);
  }
);

export const logoutUser = async () => {
  TokenService.removeUser();
}

export default axios_instance;