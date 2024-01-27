import { TextField } from "@mui/material";
import { createStyles, makeStyles } from '@mui/styles';
import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState } from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {

    }
  })
);

const TextBoxComponent = ({ placeholder, handleChange, value }) => {
  const ref = useRef(null);
  const classes = useStyles();
  // const [Emojivalue, setEmojiValue] = useState("");
  const [emojiopen, setEmojiOpen] = useState(false);

  const onEmojiOpen = () => {
    setEmojiOpen(true);
  }

  const onEmojiClick = (event, emojiObject) => {
    // const cursor = ref.current.selectionStart;
    // const text = value.slice(0, cursor) + emojiObject.emoji + value.slice(cursor);
    // setEmojiValue(text);
    setEmojiOpen(false);
  };

  return (
    <div>
      <TextField
        id="id"
        multiline
        rows={4}
        ref={ref}
        value={value}
        onChange={(event) => handleChange({component: "feed", data: event.target.value})}
        label={placeholder}
        variant="outlined"
        style={{
          backgroundColor: "white",
          width: "100%"
        }}
        InputProps={{
          endAdornment:
            (<><SentimentSatisfiedAltIcon onClick={onEmojiOpen}
              style={{
                marginTop: '70px',
                cursor: 'pointer',
                color: 'gray',
                position: "absolute"
              }} /></>),
          className: classes.root
        }}
        InputLabelProps={{ shrink: true }} 
      />

      {emojiopen ? <EmojiPicker onEmojiClick={onEmojiClick} /> : null}
    </div>

  )
}

export default TextBoxComponent;