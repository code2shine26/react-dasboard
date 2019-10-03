import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import "./ChannelConfig.css";
class ChannelConfig extends Component {
  constructor(props) {
    super(props);
    this.handleCompliancePeriodChange = this.handleCompliancePeriodChange.bind(
      this
    );
    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.handleTeirChange = this.handleTeirChange.bind(this);
    this.handleChannelGroupChange = this.handleChannelGroupChange.bind(this);
    this.handleAcmaCategoryChange = this.handleAcmaCategoryChange.bind(this);
    this.handleToggleSD = this.handleToggleSD.bind(this);
    this.handleToggleHD = this.handleToggleHD.bind(this);
    this.state = {
      compliancePeriod: 0,
      channel: 0,
      tier: 0,
      channelGroup: 0,
      acmaCategory: 0,
      sdChannel: false,
      hdChannel: false,
      kChannel: false
    };
  }

  handleCompliancePeriodChange(evt) {
    this.setState({
      compliancePeriod: evt.target.value
    });
  }
  handleChannelChange(evt) {
    this.setState({
      channel: evt.target.value
    });
  }
  handleTeirChange(evt) {
    this.setState({
      tier: evt.target.value
    });
  }
  handleChannelGroupChange(evt) {
    this.setState({
      channelGroup: evt.target.value
    });
  }
  handleAcmaCategoryChange(evt) {
    this.setState({
      acmaCategory: evt.target.value
    });
  }

  handleToggleSD(evt) {
    console.log("checkbox:;", evt.target.value);
    this.setState({
      sdChannel: !this.state.sdChannel
    });
  }
  handleToggleHD(evt) {
    console.log("checkbox:;", evt.target.value);
    this.setState({
      hdChannel: !this.state.hdChannel
    });
  }

  render() {
    return (
      <div className="ChannelConfig">
        <AppBar position="static">
          <Typography variant="h7">Channel Configuration</Typography>
        </AppBar>
        <div>
          <form className="ChannelConfig-form">
            <FormControl className="ChannelConfig-financial-year">
              <InputLabel htmlFor="acma-category">Compliance Period</InputLabel>
              <Select
                value={this.state.compliancePeriod}
                onChange={this.handleCompliancePeriodChange}
              >
                <MenuItem value={0}>Select Compliance Period</MenuItem>
                <MenuItem value={1}>2019-2020</MenuItem>
                <MenuItem value={2}>2018-2019</MenuItem>
                <MenuItem value={3}>2017-2018</MenuItem>
                <MenuItem value={4}>2016-1017</MenuItem>
                <MenuItem value={5}>2015-2016</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="ChannelConfig-channel">
              <InputLabel htmlFor="acma-category">Channel</InputLabel>
              <Select
                value={this.state.channel}
                onChange={this.handleChannelChange}
              >
                <MenuItem value={0}>Select Channel</MenuItem>
                <MenuItem value={1}>FOX8</MenuItem>
                <MenuItem value={2}>Showcase</MenuItem>
                <MenuItem value={3}>E!</MenuItem>
                <MenuItem value={4}>ESPN</MenuItem>
                <MenuItem value={5}>CNN</MenuItem>
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

            <FormControl className="ChannelConfig-channel-teir">
              <InputLabel htmlFor="acma-category">Teir</InputLabel>
              <Select value={this.state.tier} onChange={this.handleTeirChange}>
                <MenuItem value={0}>Select Teir</MenuItem>
                <MenuItem value={1}>KidsCo</MenuItem>
                <MenuItem value={2}>Dicovery</MenuItem>
                <MenuItem value={3}>Disney</MenuItem>
                <MenuItem value={4}>SBS</MenuItem>
                <MenuItem value={5}>Sky News</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="ChannelConfig-acma-category">
              <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
              <Select
                value={this.state.acmaCategory}
                onChange={this.handleAcmaCategoryChange}
              >
                <MenuItem value={0}>Select ACMA Category</MenuItem>
                <MenuItem value={1}>Exempt GES</MenuItem>
                <MenuItem value={2}>Exempt Movies</MenuItem>
                <MenuItem value={3}>Exempt Music</MenuItem>
                <MenuItem value={4}>Exempt Sports</MenuItem>
                <MenuItem value={5}>GES Cat A</MenuItem>
                <MenuItem value={6}>GES Cat B</MenuItem>
                <MenuItem value={7}>GES Cat C</MenuItem>
                <MenuItem value={8}>Max</MenuItem>
                <MenuItem value={9}>Movies Cat A</MenuItem>
                <MenuItem value={10}>Movies Cat B</MenuItem>
                <MenuItem value={11}>Movies Cat C</MenuItem>
                <MenuItem value={12}>Music</MenuItem>
                <MenuItem value={13}>News</MenuItem>
                <MenuItem value={14}>Sports</MenuItem>
              </Select>
            </FormControl>
            <div className="ChannelConfig-type">
              <FormGroup row>
                <FormControlLabel
                  onChange={this.handleToggleSD}
                  control={
                    <Checkbox
                      checked={this.state.sdChannel}
                      value={this.state.sdChannel}
                    />
                  }
                  label="SD"
                />
                <FormControlLabel
                  onChange={this.handleToggleHD}
                  control={
                    <Checkbox checked={this.state.hdChannel} value={false} />
                  }
                  label="HD"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.kChannel} value={false} />
                  }
                  label="4k"
                />
              </FormGroup>
            </div>

            <div className="ChannelConfig-launch-dates">
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk={true}
                  disableToolbar
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Launch Date"
                  value={this.state.selectedDateFrom}
                  onChange={this.handleChangeFrom}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  disabled={this.state.enableSecondCal}
                  autoOk={true}
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  value={this.state.selectedDateTo}
                  onChange={this.handleChangeTo}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider> */}
              <p>Launch Dates</p>
              <form noValidate>
                <TextField
                  id="datetime-local"
                  label="Start Date"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  id="datetime-local"
                  label="End Date"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </div>
            <button className="ChannelConfig-button-save">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChannelConfig;
