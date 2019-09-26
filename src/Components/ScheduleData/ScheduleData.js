import React, { Component, Fragment } from "react";
import DataQuery from "../DataQuery";
import DataTable from "../../Components/Layout/DataTable/DataTable";
class ScheduleData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        minDate: null,
        maxDate: null,
        channel: "none"
      }
    };
    this.populateDataSet = this.populateDataSet.bind(this);
  }

  populateDataSet(data) {
    console.log("Data from child::", data);
    this.setState(st => {
      return {
        data: data
      };
    });
  }

  render() {
    return (
      <Fragment>
        <DataQuery populateDataSet={this.populateDataSet} />
        {this.state.data["minDate"] !== null &&
        this.state.data["maxDate"] !== null &&
        this.state.data["channel"] !== "none" ? (
          <DataTable dataSet={this.state.data} />
        ) : null}
      </Fragment>
    );
  }
}

export default ScheduleData;
