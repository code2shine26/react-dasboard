import React, { Component, useState } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./ChannelConfig.css";
export default function ChannelConfig(props) {
  const handleChangeCheckbox = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };
  const handleChange = name => event => {
    console.log("name::", name);
    console.log("event::", event);
    setValues({ ...values, [name]: event.target.value });
  };
  const [values, setValues] = useState({
    compliancePeriod: 0,
    tier: 0,
    acmaCategory: 0,
    channel: 0,
    channelGroup: 0,
    hdChannel: false,
    sdChannel: false,
    fourkChannel: false,
    plus2channel: false
  });

  return (
    <div className="ChannelConfig">
      <AppBar position="static" style={{ background: "#484c7f" }}>
        <Typography variant="h7">Channel Configuration</Typography>
      </AppBar>
      <div>
        <form className="ChannelConfig-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">
                  Compliance Period
                </InputLabel>
                <Select
                  value={values.compliancePeriod}
                  onChange={handleChange("compliancePeriod")}
                >
                  <MenuItem value={0}>Select Compliance Period</MenuItem>

                  {props.fyYears &&
                    props.fyYears.map(fyYear => {
                      return (
                        <MenuItem value={fyYear}>{`FY${fyYear}`}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Channel</InputLabel>
                <Select
                  value={values.channel}
                  onChange={handleChange("channel")}
                >
                  <MenuItem value={0}>Select Channel</MenuItem>
                  {props.channelList &&
                    props.channelList.map(channel => {
                      return <MenuItem value={channel}>{channel}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
                <Select
                  value={values.acmaCategory}
                  onChange={handleChange("acmaCategory")}
                >
                  <MenuItem value={0}>Select ACMA Category</MenuItem>
                  {props.acmaCategories &&
                    props.acmaCategories.map(category => {
                      return <MenuItem value={category}>{category}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Channel Group</InputLabel>
                <Select
                  value={values.channelGroup}
                  onChange={handleChange("channelGroup")}
                >
                  <MenuItem value={0}>Select Channel Group</MenuItem>
                  {props.channelGroups &&
                    props.channelGroups.map(channelGroup => {
                      return (
                        <MenuItem value={channelGroup}>{channelGroup}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Teir</InputLabel>
                <Select value={values.tier} onChange={handleChange("tier")}>
                  <MenuItem value={0}>Select Teir</MenuItem>
                  {props.tier &&
                    props.tier.map(tier => {
                      return <MenuItem value={tier}>{tier}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <div className="ChannelConfig-type">
                <FormGroup row>
                  <FormControlLabel
                    onChange={handleChangeCheckbox("sdChannel")}
                    control={
                      <Checkbox
                        checked={values.sdChannel}
                        value={values.sdChannel}
                      />
                    }
                    label="SD"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("hdChannel")}
                    control={
                      <Checkbox
                        checked={values.hdChannel}
                        value={values.hdChannel}
                      />
                    }
                    label="HD"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("fourkChannel")}
                    control={
                      <Checkbox
                        checked={values.fourkChannel}
                        value={values.fourkChannel}
                      />
                    }
                    label="4k"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("plus2channel")}
                    control={
                      <Checkbox
                        checked={values.plus2channel}
                        value={values.plus2channel}
                      />
                    }
                    label="+2"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="filled"
                id="datetime-local"
                label="Launch Start Date"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="filled"
                id="datetime-local"
                label="Launch End Date"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid ullWidth xs={12}>
              <button className="GenerateReport">Save</button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
