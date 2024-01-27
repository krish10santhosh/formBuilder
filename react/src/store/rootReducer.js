import { combineReducers } from "@reduxjs/toolkit";
import dashboardreducer from "../slices/dashbaordSlice";
import profilereducer from "../slices/profileSlice";
import homereducer from "../slices/homeSlice";
import loginreducer from "../slices/loginSlice";

const rootReducer = combineReducers({
  dashboardreducer: dashboardreducer,
  homereducer: homereducer,
  profilereducer: profilereducer,
  loginreducer: loginreducer
});

export default rootReducer;
