import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import "./Report.css";
class Report extends Component {
  constructor(props) {
    super(props);
    this.handleComplianceChange = this.handleComplianceChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleChannelGroupChange = this.handleChannelGroupChange.bind(this);
    this.handleReportTypeChange = this.handleReportTypeChange.bind(this);
    this.handleReportSubmit = this.handleReportSubmit.bind(this);
    this.state = {
      compliancePeriod: 0,
      selection: 0,
      channelGroup: 0,
      reportType: 0
    };
  }
  handleReportSubmit(evt) {
    evt.preventDefault();
    console.log("Report submited");
  }
  handleComplianceChange(evt) {
    this.setState({
      compliancePeriod: evt.target.value
    });
  }

  handleReportTypeChange(evt) {
    this.setState({
      reportType: evt.target.value
    });
  }

  handleSelectionChange(evt) {
    this.setState({
      selection: evt.target.value
    });
  }
  handleChannelGroupChange(evt) {
    this.setState({
      channelGroup: evt.target.value
    });
  }

  render() {
    return (
      <div className="Report">
        <AppBar position="static">
          <Typography variant="h7">Report Generation</Typography>
        </AppBar>

        <form className="Report-form" onSubmit={this.handleReportSubmit}>
          <FormControl className="Configuration-financial-year">
            <InputLabel htmlFor="acma-category">Compliance Period</InputLabel>
            <Select
              onChange={this.handleComplianceChange}
              value={this.state.compliancePeriod}
            >
              <MenuItem value={0}>Select Compliance Period</MenuItem>
              <MenuItem value={1}>2019-2020</MenuItem>
              <MenuItem value={2}>2018-2019</MenuItem>
              <MenuItem value={3}>2017-2018</MenuItem>
              <MenuItem value={4}>2016-1017</MenuItem>
              <MenuItem value={5}>2015-2016</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="Configuration-financial-year">
            <InputLabel htmlFor="acma-category">Select One</InputLabel>
            <Select
              onChange={this.handleSelectionChange}
              value={this.state.selection}
            >
              <MenuItem value={0}>Select</MenuItem>
              <MenuItem value={1}>Channel</MenuItem>
              <MenuItem value={2}>Channel Group</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="ChannelConfig-channel-group">
            <InputLabel htmlFor="acma-category">Channel Group</InputLabel>
            <Select
              value={this.state.channelGroup}
              onChange={this.handleChannelGroupChange}
            >
              <MenuItem value={0}>Select Channel Group</MenuItem>
              <MenuItem value={1}>KidsCo</MenuItem>
              <MenuItem value={2}>Dicovery</MenuItem>
              <MenuItem value={3}>Disney</MenuItem>
              <MenuItem value={4}>SBS</MenuItem>
              <MenuItem value={5}>Sky News</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="ChannelConfig-channel-group"
            id="date"
            label="Effective Date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />

          <FormControl className="ChannelConfig-channel-group">
            <InputLabel htmlFor="acma-category">Report Type</InputLabel>
            <Select
              value={this.state.reportType}
              onChange={this.handleReportTypeChange}
            >
              <MenuItem value={0}>Select Report type</MenuItem>
              <MenuItem value={1}>Monthly Report</MenuItem>
              <MenuItem value={2}>Annual Report</MenuItem>
              <MenuItem value={3}>Forecast Report</MenuItem>
              <MenuItem value={4}>Summart Report</MenuItem>
            </Select>
          </FormControl>

          <button className="Report-button-save">Save</button>
        </form>
      </div>
    );
  }
}

export default Report;
