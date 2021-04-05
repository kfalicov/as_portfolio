import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  theater: {
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: (props) => (props.reverse ? "column-reverse" : "column"),
    "& > img": {
      maxWidth: "100%",
      maxHeight: "75%",
    },
    "& > div": {
      marginTop: (props) => (props.reverse ? undefined : theme.spacing(2)),
    },
    [`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
      flexDirection: (props) => "row",
      "& > img": {
        maxWidth: "50%",
        maxHeight: "100%",
      },
      "& > div": {
        marginTop: 0,
        marginLeft: theme.spacing(2),
      },
    },
  },
  paragraph: {
    "& > p": {
      fontSize: 14,
    },
  },
}));

export const SideBySide = ({ children, reverse = false }) => {
  const classes = useStyles({ reverse });
  return <div className={classes.theater}>{children}</div>;
};
