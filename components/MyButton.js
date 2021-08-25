import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";

function MyButton({ children, onClick, tip }) {
  return (
    <Tooltip title={tip} placement="top">
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
}

export default MyButton;
