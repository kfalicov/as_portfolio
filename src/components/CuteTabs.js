import { Tab, Tabs, withStyles } from "@material-ui/core";

export const CuteTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.common.black,
  },
}))(Tabs);

export const CuteTab = withStyles((theme) => ({
  root: {
    textTransform: "lowercase",
    fontSize: theme.typography.h6.fontSize,
  },
  textColorInherit: {
    color: "rgba(0,0,0,0.87)",
  },
}))(Tab);
