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
export default function ChannelConfig() {
  const handleChange = name => event => {
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
      <AppBar position="static" style={{ background: "#555" }}>
        <Typography variant="h7">Channel Configuration</Typography>
      </AppBar>
      <div>
        <form className="ChannelConfig-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="filled">
                <InputLabel htmlFor="acma-category">
                  Compliance Period
                </InputLabel>
                <Select
                  value={values.compliancePeriod}
                  onChange={handleChange("compliancePeriod")}
                >
                  <MenuItem value={0}>Select Compliance Period</MenuItem>
                  <MenuItem value={1}>2019-2020</MenuItem>
                  <MenuItem value={2}>2018-2019</MenuItem>
                  <MenuItem value={3}>2017-2018</MenuItem>
                  <MenuItem value={4}>2016-1017</MenuItem>
                  <MenuItem value={5}>2015-2016</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="filled">
                <InputLabel htmlFor="acma-category">Channel</InputLabel>
                <Select
                  value={values.channel}
                  onChange={handleChange("channel")}
                >
                  <MenuItem value={0}>Select Channel</MenuItem>
                  <MenuItem value={1}>FOX8</MenuItem>
                  <MenuItem value={2}>Showcase</MenuItem>
                  <MenuItem value={3}>E!</MenuItem>
                  <MenuItem value={4}>ESPN</MenuItem>
                  <MenuItem value={5}>CNN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="filled">
                <InputLabel htmlFor="acma-category">Channel Group</InputLabel>
                <Select
                  value={values.channelGroup}
                  onChange={handleChange("channelGroup")}
                >
                  <MenuItem value={0}>Select Channel Group</MenuItem>
                  <MenuItem value={1}>KidsCo</MenuItem>
                  <MenuItem value={2}>Dicovery</MenuItem>
                  <MenuItem value={3}>Disney</MenuItem>
                  <MenuItem value={4}>SBS</MenuItem>
                  <MenuItem value={5}>Sky News</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="filled">
                <InputLabel htmlFor="acma-category">Teir</InputLabel>
                <Select value={values.tier} onChange={handleChange("tier")}>
                  <MenuItem value={0}>Select Teir</MenuItem>
                  <MenuItem value={1}>KidsCo</MenuItem>
                  <MenuItem value={2}>Dicovery</MenuItem>
                  <MenuItem value={3}>Disney</MenuItem>
                  <MenuItem value={4}>SBS</MenuItem>
                  <MenuItem value={5}>Sky News</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="filled">
                <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
                <Select
                  value={values.acmaCategory}
                  onChange={handleChange("acmaCategory")}
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
            </Grid>
            <Grid item xs={12}>
              <div className="ChannelConfig-type">
                <FormGroup row>
                  <FormControlLabel
                    onChange={handleChange("sdChannel")}
                    control={
                      <Checkbox
                        checked={values.sdChannel}
                        value={values.sdChannel}
                      />
                    }
                    label="SD"
                  />
                  <FormControlLabel
                    onChange={handleChange("hdChannel")}
                    control={
                      <Checkbox
                        checked={values.hdChannel}
                        value={values.hdChannel}
                      />
                    }
                    label="HD"
                  />
                  <FormControlLabel
                    onChange={handleChange("fourkChannel")}
                    control={
                      <Checkbox
                        checked={values.fourkChannel}
                        value={values.fourkChannel}
                      />
                    }
                    label="4k"
                  />
                  <FormControlLabel
                    onChange={handleChange("plus2channel")}
                    control={
                      <Checkbox
                        checked={values.plus2channel}
                        value={values.plus2channel}
                      />
                    }
                    label="plus two"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                variant="filled"
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                variant="filled"
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid ullWidth xs={12}>
              <Button variant="contained" color="secondary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
