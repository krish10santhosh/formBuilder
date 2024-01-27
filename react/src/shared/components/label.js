import { Typography } from "@mui/material";
import React from "react";

const LabelComponent = ({ placeholder, handleChange, value }) => {
  return (
    <div>
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ margin: "0px", color: 'rgb(63, 81, 181)' }}>
        {value}
      </Typography>
    </div>

  )
}

export default LabelComponent;