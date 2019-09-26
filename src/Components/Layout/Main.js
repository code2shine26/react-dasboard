import React, { Component, Fragment } from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import DataTable from "./DataTable/DataTable";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SimpleTabs from "./tabs/MyTabs";
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <SimpleTabs />
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
