const { createMuiTheme } = require("@material-ui/core");

const theme = (type = "light") =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#fe71dd",
      },
    },
    typography: {
      fontFamily: '"Poppins","Roboto","Helvetica", "Arial", sans-serif',
    },
  });

export default theme;
