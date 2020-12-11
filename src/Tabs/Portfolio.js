import React, { useContext } from "react";
import { Backdrop, Fab, makeStyles, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { SideBySide } from "../Utils/SideBySide";
import { BucketContext } from "../App";

const useStyles = makeStyles((theme) => ({
  masonry: {
    columnCount: "auto",
    columnWidth: 300,
    columnGap: 0,
    overflow: "visible",
    paddingTop: theme.spacing(2),
  },
  tile: {
    padding: 4,
    zIndex: 0,
    breakInside: "avoid",
    position: "relative",
    backfaceVisibility: "hidden",
    "& > img": {
      willChange: "transform",
      width: "100%",
      zIndex: 0,
      transition: `transform ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
      "&:hover": {
        transform: "scale(1.25)",
        cursor: "pointer",
      },
      boxShadow: theme.shadows[2],
    },
    "&:hover": {
      zIndex: 10,
    },
  },
  bigPicture: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 1200,
    background: "#000000dd",
    padding: theme.spacing(2),

    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  description: {
    padding: theme.spacing(2),
    color: "white",
    overflow: "auto",
    maxWidth: 400,
    maxHeight: 400,
  },
  scrollButton: {
    flexShrink: 0,
    marginTop: "auto",
    marginBottom: "auto",
  },
  paragraph: {
    "& > p": {
      fontSize: 14,
    },
  },
}));

const Portfolio = () => {
  const [pictures, setPictures] = React.useState([]);
  const [bigPicture, setBigPicture] = React.useState(-1);
  const classes = useStyles();
  const { bucket } = useContext(BucketContext);
  React.useEffect(() => {
    bucket &&
      bucket
        .getObjects({
          type: "pictures",
          props: "slug,title,metadata,content",
          limit: 20,
        })
        .then((data) => {
          console.log(data.objects);
          setPictures(data.objects);
        });
  }, [bucket]);
  return (
    <>
      <div className={classes.masonry}>
        {pictures.map((picture, index) => (
          <div key={picture.slug} className={classes.tile}>
            <img
              src={`${picture.metadata.photo.imgix_url}?auto=format,compress,&w=400`}
              key={picture.slug}
              alt={picture.title}
              onClick={() => {
                setBigPicture(index);
              }}
            />
          </div>
        ))}
      </div>
      <Backdrop
        open={bigPicture !== -1}
        className={classes.bigPicture}
        onClick={() => {
          setBigPicture(-1);
        }}
        onScrollCapture={(e) => {
          e.stopPropagation();
        }}
        onWheelCapture={(e) => {
          e.stopPropagation();
        }}
      >
        <Fab
          color="primary"
          onClick={(e) => {
            setBigPicture((prev) => prev - 1);
            e.stopPropagation();
          }}
          className={classes.scrollButton}
          style={{
            bottom: 8,
            visibility: bigPicture > 0 ? "visible" : "hidden",
          }}
        >
          <KeyboardArrowUp style={{ fontSize: 42 }} />
        </Fab>
        {bigPicture !== -1 && (
          <SideBySide>
            <img
              src={pictures[bigPicture].metadata.photo.imgix_url}
              key={pictures[bigPicture].slug}
              alt={pictures[bigPicture].title}
            />
            {pictures[bigPicture].content && (
              <div className={classes.description}>
                <Typography variant="h6">
                  {pictures[bigPicture].title}
                </Typography>
                <div
                  className={classes.paragraph}
                  dangerouslySetInnerHTML={{
                    __html: pictures[bigPicture].content,
                  }}
                />
              </div>
            )}
          </SideBySide>
        )}
        <Fab
          color="primary"
          onClick={(e) => {
            setBigPicture((prev) => prev + 1);
            e.stopPropagation();
          }}
          className={classes.scrollButton}
          style={{
            top: 8,
            visibility: bigPicture < pictures.length - 1 ? "visible" : "hidden",
          }}
        >
          <KeyboardArrowDown style={{ fontSize: 42 }} />
        </Fab>
      </Backdrop>
    </>
  );
};
export default Portfolio;
