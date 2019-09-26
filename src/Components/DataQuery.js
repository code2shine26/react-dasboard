import React, { Fragment, Component } from "react";
import "./DataQuery.css";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DataQuery.css";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DataTable from "./Layout/DataTable/DataTable";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "linear-gradient(45deg, #D2CCC4 90%, #D2CCC6 10%)",
    color: "#fff"
  },
  label: {
    marginTop: "10px"
  }
});
class DataQuery extends Component {
  constructor(props) {
    super(props);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.state = {
      selectedDateFrom: new Date(),
      selectedDateTo: new Date(),
      enableSecondCal: true,
      minDate: new Date(),
      maxDate: new Date(),
      channel: "none"
    };
  }
  handleSubmit(evt) {
    //prevent the default submit event
    evt.preventDefault();
    this.props.populateDataSet({
      channel: this.state.channel,
      minDate: this.state.minDate,
      maxDate: this.state.maxDate
    });
  }

  handleChannelChange(evt) {
    this.setState({
      channel: evt.target.value
    });
  }
  handleChangeFrom = date => {
    let minToDate = new Date(date.getTime());
    let maxTodate = new Date(date.getTime());
    maxTodate.setMonth(maxTodate.getMonth() + 1);

    this.setState({
      selectedDateFrom: date,
      selectedDateTo: date,
      enableSecondCal: false,
      minDate: minToDate,
      maxDate: maxTodate
    });
  };
  handleChangeTo = date => {
    this.setState({
      selectedDateTo: date
    });
  };
  render() {
    console.log("props.....", this.props);
    const { classes } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="channel">Channel</InputLabel>
            <Select
              value={this.state.channel}
              onChange={this.handleChannelChange}
              labelWidth={60}
            >
              <MenuItem value="none">
                <em>Select Channel</em>
              </MenuItem>

              <MenuItem value={"Fox8"}>Fox8</MenuItem>
              <MenuItem value={"COM"}>COM</MenuItem>
              <MenuItem value={"SHOW"}>SHOW</MenuItem>
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk={true}
              disableToolbar
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-dialog"
              label="From Date"
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
              label="To Date"
              value={this.state.selectedDateTo}
              onChange={this.handleChangeTo}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
          <button
            disabled={
              this.state.channel === "none" || this.state.enableSecondCal
            }
            className="Getdata"
          >
            Fetch Data
          </button>
        </form>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DataQuery);
