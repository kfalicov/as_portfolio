import React from "react";
import { Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import Contact from "./Tabs/Contact";
import theme from "./theme";
import Portfolio from "./Tabs/Portfolio";
import About from "./Tabs/About";
import Cosmic from "cosmicjs";
import Header from "./components/Header";
import { CuteTab, CuteTabs } from "./components/CuteTabs";

function TabPanel(props) {
  const { children, value, index, style, ...other } = props;
  return (
    value === index && (
      <Container
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ ...style, overflow: "auto" }}
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

export const BucketContext = React.createContext({ bucket: undefined });

const angle = 4;

function App() {
  const [value, setValue] = React.useState(0);
  const [bucket, setBucket] = React.useState(undefined);
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    setBucket(
      Cosmic().bucket({
        slug: "as-portfolio",
        read_key: "jQkk2h9nYBEyy9c312tNlHugLdMicd3oxsYdGDRJRo9gujv3E4",
      })
    );
  }, []);

  const size = `calc(100vw * ${Math.tan((angle * 3.14159) / 180)})`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme(darkTheme ? "dark" : "light")}>
      <CssBaseline />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Header angle={angle} darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
          <CuteTabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            TabIndicatorProps={{ style: { height: 4 } }}
          >
            <CuteTab label="Portfolio" {...a11yProps(0)} />
            <CuteTab label="About" {...a11yProps(1)} />
            {/* <CuteTab label="Resume" {...a11yProps(1)} /> */}
            {/* <Tab label="Contact" {...a11yProps(2)} /> */}
          </CuteTabs>
        </Header>
        <BucketContext.Provider value={{ bucket }}>
          <TabPanel value={value} index={0} style={{ paddingTop: size }}>
            <Portfolio />
          </TabPanel>
          <TabPanel value={value} index={1} style={{ paddingTop: size }}>
            <About />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ paddingTop: size }}>
            <Contact />
          </TabPanel>
        </BucketContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
