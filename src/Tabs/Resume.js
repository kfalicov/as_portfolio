import React, { useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import { BucketContext } from "../Utils/BucketContext";
import { Document } from "react-pdf/dist/esm/entry.webpack";

const Resume = () => {
  const { bucket } = useContext(BucketContext);
  const [file, setFile] = useState();
  React.useEffect(() => {
    bucket &&
      bucket
        .getObject({
          slug: "resume",
          props: "metadata",
        })
        .then((data) => {
          setFile(data.object.metadata.pdf.url);
        });
  }, [bucket]);
  return (
    <Grid container style={{ paddingTop: 24 }}>
      {file && (
        <Document
          file={{
            url: file,
          }}
        />
      )}
    </Grid>
  );
};
export default Resume;
