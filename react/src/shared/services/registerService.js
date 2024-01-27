import axios_instance from "../utils/axios_server";

const registerUser = (data) => {
  return axios_instance.post(`user/createUser`, data);
};

const OTPValidation = (data) => {
  return axios_instance.post(`user/otpValidation`, data);
};

const RegisterService = {
  registerUser,
  OTPValidation
};

export default RegisterService;