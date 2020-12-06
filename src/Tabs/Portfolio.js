import React from "react";
import Cosmic from "cosmicjs";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  masonry: {
    columnCount: 3,
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
        props: "slug,title,metadata",
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
              src={picture.metadata.photo.url}
              key={picture.slug}
              onClick={() => {
                setBigPicture(index);
              }}
            />
          </div>
        ))}
      </div>
      {bigPicture !== -1 && (
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            background: "#000000aa",
          }}
          onClick={() => {
            setBigPicture(-1);
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={pictures[bigPicture].metadata.photo.url}
            key={pictures[bigPicture].slug}
          />
        </div>
      )}
    </>
  );
};
export default Portfolio;
