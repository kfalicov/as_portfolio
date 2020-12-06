import React from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Contact from "./Tabs/Contact";
import theme from "./theme";
import Switch from "./Switch";
import Portfolio from "./Tabs/Portfolio";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index && (
      <Container
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </Container>
    )
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);
  const [darkTheme, setDarkTheme] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme(darkTheme ? "dark" : "light")}>
      <CssBaseline />
      <div style={{ position: "sticky", top: 0 }}>
        <AppBar position="static">
          <Toolbar style={{ color: "white" }}>
            <div
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Typography variant="h6" style={{ textTransform: "uppercase" }}>
                Ashley Sowell
              </Typography>
              <Typography variant="subtitle1" style={{ lineHeight: "initial" }}>
                content designer + illustrator
              </Typography>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDarkTheme((prev) => !prev)}
            >
              <Switch on={!darkTheme} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Portfolio" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Contact" {...a11yProps(2)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <Portfolio />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Contact />
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
