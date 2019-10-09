import React, { Component } from "react";
import "./Metadata.css";
import ProgressCircle from "../ProgressCircle/ProgressCircle";

class Metadata extends Component {
  state = {};
  render() {
    return (
      <div className="ConfigDisplay">
        <p className="ConfigDisplayTitle">{this.props.message}</p>
        <ProgressCircle
          color={this.props.color}
          percentage={this.props.percentage}
        />
      </div>
    );
  }
}

export default Metadata;
