import React from 'react'
import Tooltip from "@material-ui/core/Tooltip";
export default function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip style={{ transition: "all 500ms" }} open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
