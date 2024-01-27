import { Box, Checkbox, FormControl, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const CheckBoxComponent = ({ isChecked, label, value, index, handleCheckBoxChange, isDisabled }) => {
  return (
    <FormControlLabel
      key={index}
      className="twocolelement"
      control={
        <Checkbox
          name={label}
          value={value}
          id={value}
          checked={isChecked}
          disabled={isDisabled}
          index={index}
          color="primary"
          onChange={handleCheckBoxChange}
        />
      }
      label={<Typography className={value} style={{
        padding: '0px 8px',
        borderRadius: '10px',
        fontSize: '14px'
      }}>{label}</Typography>}
    />
  )
}

export default CheckBoxComponent;