import React from "react";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    overflow: "auto",
    flexGrow: 1,
    "&::-webkit-scrollbar": {
      background: theme.palette.action.hover,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.action.focus,
      "&:hover": {
        background: theme.palette.action.disabled,
      },
      "&:active": {
        background: theme.palette.action.active,
      },
    },
  },
});

const Content = withStyles(styles)(({ classes, ...props }) => (
  <div {...props} className={classes.root} />
));

export default Content;
