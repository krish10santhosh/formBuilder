import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenDetails } from "../../slices/dashbaordSlice";
import { useDispatch } from "react-redux";
import TokenService from "./tokenUtillService";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updates, setUpdates] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (JSON.parse(data) !== null) {
      TokenService.setUser(JSON.parse(data));
      dispatch(TokenDetails(JSON.parse(data)));
      setUpdates(true);
    }
    else {
      setUpdates(false);
      // navigate('/login')
    }
  }, [])

  return (
    <div>
      {
        updates ? children : null
      }
    </div>
  )
}

export default ProtectedRoute;