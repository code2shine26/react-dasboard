import React, { Component, Fragment } from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import FeatureTabs from "./tabs/MyTabs";
class Main extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <FeatureTabs />
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
