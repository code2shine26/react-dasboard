import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import ChannelConfig from "../Configuration/channel/ChannelConfig";
import "./Configuration.css";
class Configuration extends Component {
  constructor(props) {
    super(props);
    this.handleComplianceChange = this.handleComplianceChange.bind(this);
    this.handleAcmaCategory = this.handleAcmaCategory.bind(this);
    this.handleAcmaContractualCategory = this.handleAcmaContractualCategory.bind(
      this
    );
    this.handleCaptionPercent = this.handleCaptionPercent.bind(this);
    this.handleContactualPercent = this.handleContactualPercent.bind(this);
    this.state = {
      compliancePeriod: 0,
      acmaCategory: 0,
      acmaContractualCategory: 0,
      captionPercent: 5,
      contactualPercent: 5
    };
  }
  handleComplianceChange(evt) {
    this.setState({
      compliancePeriod: evt.target.value
    });
  }
  handleAcmaCategory(evt) {
    this.setState({
      acmaCategory: evt.target.value
    });
  }
  handleAcmaContractualCategory(evt) {
    this.setState({
      acmaContractualCategory: evt.target.value
    });
  }
  handleCaptionPercent(evt) {
    this.setState({
      captionPercent: evt.target.value
    });
  }
  handleContactualPercent(evt) {
    this.setState({
      contactualPercent: evt.target.value
    });
  }
  render() {
    return (
      <div className="Configuration">
        <AppBar position="static">
          <Typography variant="h7">ACMA Configuration</Typography>
        </AppBar>

        <div>
          <form className="Configuration-form">
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
            <div className="Configuration-acma-container">
              <FormControl>
                <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
                <Select
                  onChange={this.handleAcmaCategory}
                  value={this.state.acmaCategory}
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
              <TextField
                id="standard-name"
                onChange={this.handleCaptionPercent}
                label="Caption %"
                value={this.state.captionPercent}
                margin="normal"
              />
            </div>

            <div className="Configuration-acma-contract-container">
              <FormControl>
                <InputLabel htmlFor="acma-contractual-category">
                  Contractual Category
                </InputLabel>
                <Select
                  onChange={this.handleAcmaContractualCategory}
                  value={this.state.acmaContractualCategory}
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

              <TextField
                id="standard-name"
                onChange={this.handleContactualPercent}
                label="Caption %"
                value={this.state.contactualPercent}
                margin="normal"
              />
            </div>
            <button className="Configuration-button-save">Save</button>
          </form>
        </div>
        <ChannelConfig />
      </div>
    );
  }
}

export default Configuration;
