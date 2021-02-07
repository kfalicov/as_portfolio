const { createMuiTheme } = require("@material-ui/core");

const theme = (type = "light") =>
  createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "::-webkit-scrollbar": {
            width: 8,
            borderRadius: 4,
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: 4,
          },
        },
      },
    },
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
