import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const RadioButtonComponent = ({ value, handleChange, data }) => {
  return (
    <RadioGroup sx={{
      flexDirection: 'row'
    }}>
      {
        data.map((val, index) => (
          <FormControlLabel key={index}
            control={<Radio checked={value === val.key} />}
            onClick={() => handleChange(val.key)}
            label={val.key} />
        ))
      }
    </RadioGroup>
  );
}
export default RadioButtonComponent;
