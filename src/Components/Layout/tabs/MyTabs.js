import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ScheduleData from "../../ScheduleData/ScheduleData";
import Report from "../../Report/Report";
import Configuration from "../../Configuration/Configuration";
import "./Mytabs.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#ccc"
  }
}));

export default function FeatureTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  return (
    <TabPanel className={classes.root}>
      <AppBar style={{ background: "#333" }} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Dorito Features"
        >
          <Tab label="Schedule Data" {...a11yProps(0)} />
          <Tab label="Reporting" {...a11yProps(1)} />
          <Tab label="Admin" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ScheduleData />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Report />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Configuration />
      </TabPanel>
    </TabPanel>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
