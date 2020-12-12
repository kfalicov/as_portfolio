import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { BucketContext } from "../App";
import { SideBySide } from "../Utils/SideBySide";

const useStyles = makeStyles((theme) => ({
  description: {
    padding: theme.spacing(2),
    overflow: "auto",
    maxWidth: 400,
    maxHeight: 400,
  },
}));

const About = () => {
  const [about, setAbout] = useState();
  const { bucket } = useContext(BucketContext);
  React.useEffect(() => {
    bucket &&
      bucket
        .getObject({
          slug: "about-the-artist",
          props: "content,metadata",
        })
        .then((data) => {
          console.log(data.object);
          setAbout(data.object);
        });
  }, [bucket]);

  const classes = useStyles();

  return (
    <div style={{ paddingTop: 16 }}>
      <SideBySide reverse>
        {about && (
          <>
            <img src={about.metadata.profile_photo.imgix_url} alt={"Ashley"} />
            <div className={classes.description}>
              <Typography variant="h6">About the Artist</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: about.content,
                }}
              />
            </div>
          </>
        )}
      </SideBySide>
    </div>
  );
};

export default About;
