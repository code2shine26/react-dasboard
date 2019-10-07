import React, { Component, Fragment } from "react";
import Footer from "./footer/Footer";
import Brand from "./header/Brand";
import DataHub from "../Main/datahub/DataHub";
import MyTabs from "../../Components/Main/nav/tabs/MyTabs";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Brand />
        <DataHub />
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
