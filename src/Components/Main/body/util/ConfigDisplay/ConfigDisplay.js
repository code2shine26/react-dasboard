import React, { Component } from "react";
import "./ConfigDisplay.css";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import "./ConfigDisplay.css";

class ConfigDisplay extends Component {
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

export default ConfigDisplay;
