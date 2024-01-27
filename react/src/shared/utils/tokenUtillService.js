const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user;
  };
  
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("userData"));
    user.jwttoken = token;
    localStorage.setItem("userData", JSON.stringify(user));
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
  
  const setUser = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
  };
  
  const removeUser = () => {
    localStorage.removeItem("userData");
  };
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default TokenService;