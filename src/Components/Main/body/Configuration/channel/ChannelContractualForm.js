import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import "./ChannelContractualForm.css";

import FormControl from "@material-ui/core/FormControl";
export default function ChannelContractualCaptionForm() {
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const [values, setValues] = useState({
    acmaCategory: 0,
    captionPercent: 40
  });

  return (
    <div className="CahnnelContractualCaptionForm">
      <AppBar position="static" style={{ background: "#555" }}>
        <Typography variant="h7">Channel Contractual Configuration</Typography>
      </AppBar>
      <form className="Acma-form">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl required fullWidth variant="filled">
              <InputLabel htmlFor="acma-category">Compliance Period</InputLabel>
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
          <Grid item xs={9}>
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
          <Grid item xs={3}>
            <TextField
              required
              fullWidth
              variant="filled"
              id="standard-required"
              label="Required"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
