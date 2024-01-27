import axios_instance from "../utils/axios_server";

const getProfileData = (id) => {
  return axios_instance.get(`profile/getUserProfile/${id}`);
};

const setProfileServerData = (id, data) => {
  return axios_instance.post(`profile/updateUserProfile/${id}`, data);
};

const getUserPinsDataInfo = (id) => {
  return axios_instance.get(`pin/getUserPinsData/${id}`);
};

const createProfileImage = (data) => {
  return axios_instance.post(`profile/addprofilepicture/${data.id}`, { url: data.url, oldProfilePicturename: data.oldProfilePicturename, newProfilePicturename: data.newProfilePicturename});
};

const createCoverImage = (data) => {
  return axios_instance.post(`addcoverpicture?id=${data.id}`, { url: data.url, oldCoverPicturename: data.oldCoverPicturename, newCoverPicturename: data.newCoverPicturename});
};

const ProfileService = {
  getProfileData,
  setProfileServerData,
  getUserPinsDataInfo,
  createProfileImage,
  createCoverImage
};

export default ProfileService;