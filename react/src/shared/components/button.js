import { Box, Button } from "@mui/material";
import React from "react";

const ButtonComponent = ({ handleClick, title, variant, color }) => {
  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
        sx={{ margin: "0 10px 0 0" }}
      >
        <Button variant={variant} color={color} onClick={handleClick}>{title}</Button>
      </Box>
    </div>

  )
}

export default ButtonComponent;