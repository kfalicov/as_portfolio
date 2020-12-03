import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  panel: {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  },
  slider: {
    fill: "currentColor",
    transition: "transform 100ms linear",
  },
}));

const Switch = ({ on, ...props }) => {
  const classes = useStyles();
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <g id="layer1">
        <rect
          className={classes.panel}
          ry="1"
          y="3"
          x="6"
          height="18"
          width="12"
          id="rect12"
        />
        <rect
          className={classes.slider}
          ry="0"
          y="6"
          x="9"
          height="5"
          width="6"
          id="rect837"
          transform={`translate(0 ${on ? 0 : 7})`}
        />
      </g>
    </svg>
  );
};

export default Switch;
