import React, { useContext, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { BucketContext } from "../Utils/BucketContext";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
          setFile(data.object.metadata.pdf.imgix_url);
        });
  }, [bucket]);
  return (
    <Grid container style={{ justifyContent: "center" }}>
      {file && (
        <Document
          file={{
            url: file,
          }}
        >
          <Page pageNumber={1} renderAnnotationLayer={false} />
        </Document>
      )}
    </Grid>
  );
};
export default Resume;
