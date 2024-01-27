import axios_instance from "../utils/axios_server";

const getAllImagesData = (params) => {
  return axios_instance.get(`/pin/getPinList?page=${params.page}&limit=${params.count}`);
};

const HomeService = {
  getAllImagesData,
};

export default HomeService;