import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
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

  const classes = useStyles();
  const [values, setValues] = React.useState({
    compliancePeriod: 0,
    channel: 0,
    selection: "ch",
    channelGroup: 0,
    reportType: 0
  });

  // useEffect(
  //   () => {
  //     async function getChannelStateData() {
  //       const response = await axios.get(
  //         `${endpoint}name=${values.channel}&finYear=${values.compliancePeriod}`
  //       );
  //       console.log("Channel State", response.data);
  //       setChannelState(response.data);
  //     }
  //     if (values.compliancePeriod !== 0 && values.channel !== 0) {
  //       getChannelStateData();
  //     }
  //   },
  //   [values.channel],
  //   [values.compliancePeriod]
  // );

  useEffect(() => {
    if (values.channel !== 0 && values.compliancePeriod !== 0) {
      props.getChannelState(values.channel, values.compliancePeriod);
    }
  }, [values.channel, values.compliancePeriod]);

  return (
    <div className="ReportForm">
      <AppBar position="static" style={{ background: "#555" }}>
        <Typography variant="h7">Report Generation</Typography>
      </AppBar>

      <form className="Rep-form">
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
            <TextField
              variant="standard"
              fullWidth
              required
              id="date"
              label="Effective Date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
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
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
