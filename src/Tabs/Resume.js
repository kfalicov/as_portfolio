import { Grid, Typography } from "@material-ui/core";
import { AlternateEmail, Home, Instagram } from "@material-ui/icons";

const Resume = () => {
  return (
    <Grid container style={{ paddingTop: 24 }}>
      <Grid item container justify="center" xs={12} sm={4} alignItems="center">
        <AlternateEmail fontSize="large" />
        <Typography>email</Typography>
      </Grid>
      <Grid item container justify="center" xs={12} sm={4} alignItems="center">
        <Instagram fontSize="large" />
        <Typography>instagram</Typography>
      </Grid>
      <Grid item container justify="center" xs={12} sm={4} alignItems="center">
        <Home fontSize="large" />
        <Typography>address</Typography>
      </Grid>
    </Grid>
  );
};
export default Resume;
