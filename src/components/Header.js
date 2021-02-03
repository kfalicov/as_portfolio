import { IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";
import React from "react";
import Switch from "../Switch";

const styles = (theme) => ({
  root: {
    zIndex: theme.zIndex.appBar,
    background: theme.palette.primary.main,
    width: "100%",
    position: "relative",
    "&::before": {
      background: "inherit",
      position: "absolute",
      content: "''",
      left: 0,
      width: "100%",
      transformOrigin: "right",
      height: (props) =>
        `calc(100vw * ${Math.tan((props.angle * 3.14159) / 180)})`,
      top: (props) =>
        `calc(100% - (100vw * ${Math.tan((props.angle * 3.14159) / 180)}))`,
      transform: (props) => `skewY(-${props.angle}deg)`,
    },
  },
  toolbar: {
    color: "white",
    paddingBottom: theme.spacing(4),
    minHeight: theme.spacing(8),
    [theme.breakpoints.up("md")]: { paddingBottom: 0 },
  },
  tiltNav: {
    transformOrigin: "bottom right",
    position: "absolute",
    transform: (props) => `rotate(-${props.angle}deg)`,
    right: 0,
    paddingRight: 48,
    bottom: 0,
  },
});

const Header = ({ children, classes, ...props }) => {
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography variant="h6" style={{ textTransform: "uppercase" }}>
            Ashley Sowell
          </Typography>
          <Typography variant="subtitle1" style={{ lineHeight: "initial" }}>
            digital content creator • illustrator
          </Typography>
        </div>
        <IconButton
          edge="end"
          color="inherit"
          style={{ zIndex: 1 }}
          onClick={() => props.setDarkTheme((prev) => !prev)}
        >
          <Switch on={!props.darkTheme} />
        </IconButton>
      </Toolbar>
      <svg
        viewBox="0 0 200 10"
        // height="20"
        style={{
          position: "absolute",
          overflow: "visible",
          marginTop: 20,
          top: "100%",
        }}
      >
        <filter
          x="-4%"
          y="-4%"
          width="108%"
          height="108%"
          filterUnits="objectBoundingBox"
          id="noise"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            result="layer1"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="2"
            result="layer2"
          />
          <feBlend in="layer1" in2="layer2" mode="add" result="combined" />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="2"
            in="SourceGraphic"
            in2="combined"
            result="newSource"
          />
        </filter>

        <line
          vectorEffect="non-scaling-stroke"
          x1="0"
          y1={200 * Math.tan((props.angle * 3.14) / 180)}
          x2="200"
          y2="0"
          stroke="black"
          strokeWidth="4"
          filter="url(#noise)"
        />
      </svg>
      <div className={classes.tiltNav}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(Header);
