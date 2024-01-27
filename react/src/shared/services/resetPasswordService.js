import axios_instance from "../utils/axios_server";

const resetPassword = (data) => {
  return axios_instance.post(`passwordReset/`, data);
};

const reset = (data) => {
  return axios_instance.post(`resetPassword`, data);
};

const ResetPasswordService = {
  resetPassword,
  reset
};

export default ResetPasswordService;