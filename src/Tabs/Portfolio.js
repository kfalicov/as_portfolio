import React from "react";
import Cosmic from "cosmicjs";
import { Backdrop, Fab, makeStyles, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  masonry: {
    columnCount: "auto",
    columnWidth: 300,
    columnGap: 0,
    overflow: "visible",
    paddingTop: theme.spacing(3),
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
    padding: theme.spacing(7, 2),

    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  theater: {
    display: "flex",
    overflow: "hidden",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& > img": {
      maxWidth: "100%",
      maxHeight: "75%",
    },
    "& > div": {
      marginTop: theme.spacing(2),
    },
    [`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
      flexDirection: "row",
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
  description: {
    padding: theme.spacing(2),
    color: "white",
    overflow: "auto",
    maxWidth: 400,
    maxHeight: 400,
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
  React.useEffect(() => {
    Cosmic()
      .bucket({
        slug: "as-portfolio",
        read_key: "jQkk2h9nYBEyy9c312tNlHugLdMicd3oxsYdGDRJRo9gujv3E4",
      })
      .getObjects({
        type: "pictures",
        props: "slug,title,metadata,content",
        limit: 20,
      })
      .then((data) => {
        console.log(data.objects);
        setPictures(data.objects);
      });
  }, []);
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
        {bigPicture > 0 && (
          <Fab
            color="primary"
            onClick={(e) => {
              setBigPicture((prev) => prev - 1);
              e.stopPropagation();
            }}
            style={{ position: "absolute", top: 8 }}
          >
            <KeyboardArrowUp style={{ fontSize: 42 }} />
          </Fab>
        )}
        {bigPicture !== -1 && (
          <div className={classes.theater}>
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
          </div>
        )}
        {bigPicture < pictures.length - 1 && (
          <Fab
            color="primary"
            onClick={(e) => {
              setBigPicture((prev) => prev + 1);
              e.stopPropagation();
            }}
            style={{ position: "absolute", bottom: 8 }}
          >
            <KeyboardArrowDown style={{ fontSize: 42 }} />
          </Fab>
        )}
      </Backdrop>
    </>
  );
};
export default Portfolio;
