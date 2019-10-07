import React, { Component } from "react";
import "./ProgressCircle.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
class ProgressCircle extends Component {
  render() {
    const percentage = 0;
    const color = this.props.color;
    console.log("Color", color);
    return (
      <div className="ProgressCircle">
        <CircularProgressbar
          styles={buildStyles({
            textColor: "#333",
            pathColor: color
          })}
          value={this.props.percentage}
          text={`${this.props.percentage}%`}
        />
      </div>
    );
  }
}

export default ProgressCircle;
