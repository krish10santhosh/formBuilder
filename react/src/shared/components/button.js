import { Box, Button } from "@mui/material";
import React from "react";

const ButtonComponent = ({ disabled, handleClick, title, variant, color }) => {
  return (
    <div>
      <Box
        component="div"
        noValidate
        autoComplete="off"
      >
        <Button variant="contained">{title}</Button>
      </Box>
    </div>

  )
}

export default ButtonComponent;