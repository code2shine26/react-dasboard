import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MessageDialog from "../../util/Messages/MessageDialog";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./ReportForm.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export default function ReportForm(props) {
  console.log("Report Form props::", props);
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearFields = () => {
    setValues({
      compliancePeriod: "",
      channel: "",
      selection: "ch",
      channelGroup: "",
      reportType: "",
      effectiveDate: new Date()
    });
  };

  const handleDateChange = newDate => {
    setValues({ ...values, effectiveDate: newDate });
  };
  const onSubmitHandler = evt => {
    evt.preventDefault();
    clearFields();
  };
  const shoudEnable = () => {
    let flag = false;
    if (
      values.compliancePeriod == "" ||
      (values.channel == "" && values.selection === "ch") ||
      (values.channelGroup == "" && values.selection === "cg") ||
      values.reportType == "" ||
      values.compliancePeriod == ""
    ) {
      flag = true;
    }
    console.log("Flag:::", flag);
    return flag;
  };
  const classes = useStyles();
  const [values, setValues] = React.useState({
    compliancePeriod: "",
    channel: "",
    selection: "ch",
    channelGroup: "",
    reportType: "",
    effectiveDate: new Date()
  });

  useEffect(() => {
    console.log("Use effect called:::", values.selection);
    if (values.channel !== "" && values.compliancePeriod !== "") {
      props.getChannelState(values.channel, values.compliancePeriod);
    }
  }, [values.channel, values.compliancePeriod]);

  useEffect(() => {
    if (values.selection === "cg") {
      props.hideMetaData(false);
    } else {
      props.hideMetaData(true);
    }
  }, [values.selection]);

  useEffect(() => {
    if (
      values.compliancePeriod === "" &&
      values.channel === "" &&
      values.channelGroup === "" &&
      values.reportType === ""
    ) {
      props.clearFields();
    }
  }, [
    values.compliancePeriod,
    values.channel,
    values.channelGroup,
    values.reportType
  ]);

  return (
    <div className="ReportForm">
      <AppBar position="static" style={{ background: "#484c7f" }}>
        <Typography variant="h7">Report Generation</Typography>
      </AppBar>

      <form className="Rep-form" onSubmit={onSubmitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl required fullWidth variant="standard">
              <InputLabel htmlFor="acma-category">Compliance Period</InputLabel>
              <Select
                onChange={handleChange("compliancePeriod")}
                value={values.compliancePeriod}
              >
                <MenuItem value={0}>Select Compliance Period</MenuItem>
                {props.fyYears &&
                  props.fyYears.map(fyYear => {
                    return <MenuItem value={fyYear}>{`FY${fyYear}`}</MenuItem>;
                  })}
                {/* <MenuItem value={1}>FY2019</MenuItem>
                <MenuItem value={2}>FY2018</MenuItem>
                <MenuItem value={3}>FY2017</MenuItem>
                <MenuItem value={4}>FY2016</MenuItem>
                <MenuItem value={5}>FY2015</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="standard"
              fullWidth
              required
              component="fieldset"
            >
              <RadioGroup
                aria-label="Select Category"
                name="selection"
                value={values.selection}
                onChange={handleChange("selection")}
              >
                <div className="radio-options">
                  <FormControlLabel
                    value="ch"
                    control={<Radio />}
                    label="Channel"
                  />
                  <FormControlLabel
                    value="cg"
                    required
                    control={<Radio />}
                    label="Channel Group"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>
          {values.selection === "ch" ? (
            <Grid item xs={12}>
              <FormControl fullWidth required variant="standard">
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
          ) : null}
          {values.selection === "cg" ? (
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
          ) : null}
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={values.effectiveDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant="standard"
              fullWidth
              className="ReportForm-item"
              required
            >
              <InputLabel htmlFor="acma-category">Report Type</InputLabel>
              <Select
                value={values.reportType}
                onChange={handleChange("reportType")}
              >
                <MenuItem value={0}>Select Report type</MenuItem>
                <MenuItem value={1}>Monthly Report</MenuItem>
                <MenuItem value={2}>Annual Report</MenuItem>
                <MenuItem value={3}>Forecast Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <button disabled={shoudEnable()} className="GenerateReport">
              Generate Report
            </button>
          </Grid>
          {/* <Grid item xs={12}>
            <button className="GenerateReport">Clear</button>
          </Grid> */}
        </Grid>
      </form>
      {/* <MessageDialog message="All good" outcome="success" /> */}
    </div>
  );
}
