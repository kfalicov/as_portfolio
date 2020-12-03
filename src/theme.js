const { createMuiTheme } = require("@material-ui/core");

const theme = (type = "light") =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#fe71dd",
      },
    },
  });

export default theme;
